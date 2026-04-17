import axiosInstance from './axiosInstance';

export const getMySubscription = async () => {
    const { data } = await axiosInstance.get('/subscriptions/me');
    return data;
}

export const updateMySubscription = async (payload: { plan: string }) => {
    const { data } = await axiosInstance.patch('/subscriptions/me', payload);
    return data;
}
