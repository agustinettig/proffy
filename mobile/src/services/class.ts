import api from './api';

export interface UserClass {
    name: string;
    avatar: string;
    whatsapp: string;
    bio:string;
    subject:string;
    cost:number;
    schedule: Array<{
        weekday: number;
        from: string;
        to: string;
    }>;
}

export interface ClassFilterParams {
    subject?: string;
    weekday?: number;
    time?: string;
}

const classService = {
  get: async (params: ClassFilterParams) => {
    const resp = await api.get('/classes', {
      params,
    });
    return resp.data;
  },
  create: async (userClass: UserClass) => {
    await api.post('/classes', {
      ...userClass,
    });
  },
};

export default classService;
