import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import connectionService from '../../services/connection';

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: number;
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  async function handleConnection(userId: number) {
    connectionService.create(userId);
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>
        {teacher.bio}
      </p>

      <footer>
        <p>
          Price/hour
          <strong>
            $
            {' '}
            {teacher.cost}
          </strong>
        </p>
        <button type="button" onClick={(e) => handleConnection(teacher.id)}>
          <img src={whatsappIcon} alt="WhatsApp" />
          Get in touch
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
