import axiosInstance from './axiosInstance';

export const getScores = async () => {
  const { data } = await axiosInstance.get('/scores');
  return data;
};

export const createScore = async (payload: { value: number; date: string }) => {
  const { data } = await axiosInstance.post('/scores', payload);
  return data;
};

export const updateScore = async (id: string, payload: { value?: number; date?: string }) => {
  const { data } = await axiosInstance.patch(`/scores/${id}`, payload);
  return data;
};

export const deleteScore = async (id: string) => {
  const { data } = await axiosInstance.delete(`/scores/${id}`);
  return data;
};
