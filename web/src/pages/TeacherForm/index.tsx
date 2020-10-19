/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import classService from '../../services/class';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([{
    weekday: 0,
    from: '',
    to: '',
  }]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await classService.create({
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert('Cadastro realizado!');
      history.push('/');
    } catch (err) {
      console.log(err);
      alert('Erro no cadastro');
    }
  }

  function addScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        weekday: 0,
        from: '',
        to: '',
      },
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value:string | number) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="How amazing that you want to teach."
        description="The first step is to fill in this form."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Your info</legend>

            <Input
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <TextArea
              name="bio"
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>About the class</legend>

            <Select
              name="subject"
              label="Subject"
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Biology', label: 'Biology' },
                { value: 'Chemistry', label: 'Chemistry' },
                { value: 'English', label: 'English' },
                { value: 'Geography', label: 'Geography' },
                { value: 'History', label: 'History' },
                { value: 'Math', label: 'Math' },
                { value: 'Physical Education', label: 'Physical Education' },
                { value: 'Physics', label: 'Physics' },
                { value: 'Science', label: 'Science' },
              ]}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              name="cost"
              label="Cost of your class per hour"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Available times
              <button type="button" onClick={addScheduleItem}>
                + New time
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              const keyValue = `${scheduleItem.weekday}_${index}`;
              return (
                <div key={keyValue} className="schedule-item">
                  <Select
                    name="weekday"
                    label="Weekday"
                    options={[
                      { value: '0', label: 'Sunday' },
                      { value: '1', label: 'Monday' },
                      { value: '2', label: 'Tuesday' },
                      { value: '3', label: 'Wednesday' },
                      { value: '4', label: 'Thursday' },
                      { value: '5', label: 'Friday' },
                      { value: '6', label: 'Saturday' },
                    ]}
                    value={scheduleItem.weekday}
                    onChange={(e) => setScheduleItemValue(index, 'weekday', e.target.value)}
                  />
                  <Input
                    name="from"
                    label="From"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="To"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              );
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Important Warning" />
              Important!
              {' '}
              <br />
              Fill in all the information
            </p>
            <button type="submit">Save</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
