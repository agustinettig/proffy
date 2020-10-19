import api from './api';

const connectionService = {
  get: async () => {
    const resp = await api.get('/connections');
    return resp.data;
  },
  create: async (userId: number) => api.post('/connections', {
    userId,
  }),
};

export default connectionService;
