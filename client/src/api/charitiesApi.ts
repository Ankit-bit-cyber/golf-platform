import axiosInstance from './axiosInstance';

export const getCharities = async (featured?: boolean, search?: string) => {
  const params = new URLSearchParams();
  if (featured) params.append('featured', 'true');
  if (search) params.append('search', search);

  const { data } = await axiosInstance.get(`/charities?${params.toString()}`);
  return data;
};

export const getCharityById = async (id: string) => {
  const { data } = await axiosInstance.get(`/charities/${id}`);
  return data;
};
