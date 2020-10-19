import { Request, Response } from 'express';
import db from '../database/connection';

export default {
  create: async (request: Request, response:Response) => {
    const { userId } = request.body;

    try {
      await db('connections').insert({
        user_id: userId,
      });
      return response.status(201).send();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return response.status(400).json({
        error: 'There was an error saving the connection.',
      });
    }
  },
  findAll: async (request: Request, response:Response) => {
    const count = await db('connections')
      .count('* as total');

    const { total } = count[0];

    return response.json({ total });
  },
};
