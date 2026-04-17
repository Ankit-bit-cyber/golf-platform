import axiosInstance from './axiosInstance';

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get('/users/me');
  return data;
};

export const updateUserCharity = async (payload: { charity_id: string; charity_pct: number }) => {
  const { data } = await axiosInstance.patch('/users/me/charity', payload);
  return data;
};
