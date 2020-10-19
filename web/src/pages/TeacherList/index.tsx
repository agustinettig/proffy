import React, { useEffect, useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import classService, { ClassFilterParams } from '../../services/class';

function TeacherList() {
  const initalFilter : ClassFilterParams = {};
  const [teacherList, setTeacherList] = useState([]);
  const [filters, setFilters] = useState(initalFilter);

  async function fetchTeachers(e?: FormEvent) {
    // eslint-disable-next-line no-unused-expressions
    e?.preventDefault();
    const teachers = await classService.get(filters);
    setTeacherList(teachers);
  }

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the available proffys.">
        <form id="search-teachers" onSubmit={fetchTeachers}>
          <Select
            name="subject"
            label="Teaching Area"
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
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          />
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
            value={filters.weekday}
            onChange={(e) => setFilters({ ...filters, weekday: Number(e.target.value) })}
          />
          <Input
            name="schedule"
            label="Schedule"
            type="time"
            value={filters.time}
            onChange={(e) => setFilters({ ...filters, time: e.target.value })}
          />

          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {teacherList.map((teacher: Teacher) => <TeacherItem key={teacher.id} teacher={teacher} />)}

      </main>
    </div>
  );
}

export default TeacherList;
