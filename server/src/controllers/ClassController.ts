/* eslint-disable no-console */
import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinute from '../utils/convertHourToMinute';

interface ScheduleItem {
    weekday: number,
    from: string,
    to: string
}

export default {
  create: async (request: Request, response:Response) => {
    const {
      name, avatar, whatsapp, bio, subject, cost, schedule,
    } = request.body;
    const tsx = await db.transaction();

    try {
      const insertedUserIds = await tsx('users').insert({
        name,
        avatar,
        bio,
        whatsapp,
      });

      const insertedClassIds = await tsx('classes').insert({
        subject,
        cost,
        user_id: insertedUserIds[0],
      });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        weekday: scheduleItem.weekday,
        from: convertHourToMinute(scheduleItem.from),
        to: convertHourToMinute(scheduleItem.to),
        class_id: insertedClassIds[0],
      }));

      await tsx('class_schedule').insert(classSchedule);

      await tsx.commit();
      return response.status(201).send();
    } catch (err) {
      console.log(err);
      await tsx.rollback();
      return response.status(400).json({
        error: 'There was an error saving the class.',
      });
    }
  },
  findAll: async (request: Request, response:Response) => {
    try {
      const weekday = request.query.weekday as string;
      const subject = request.query.subject as string;
      const time = request.query.time as string;

      const classes = await db('classes')
        .where((qb) => {
          if (subject) {
            qb.where('classes.subject', '=', subject);
          }
          if (weekday || time) {
            qb.whereExists((query) => {
              query.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`');

              if (weekday) {
                query.whereRaw('`class_schedule`.`weekday` = ??', Number(weekday));
              }
              if (time) {
                const timeInMinutes = convertHourToMinute(time);
                query.whereRaw('`class_schedule`.`from` <= ??', timeInMinutes)
                  .whereRaw('`class_schedule`.`to` > ??', timeInMinutes);
              }
            });
          }
        })
        .join('users', 'classes.user_id', '=', 'users.id')
        .select('classes.*', 'users.*');

      return response.json(classes);
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        error: 'There was an error searching for the class.',
      });
    }
  },
};
