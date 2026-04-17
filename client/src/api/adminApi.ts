import axiosInstance from './axiosInstance';

export const getStats = async () => {
    const { data } = await axiosInstance.get('/admin/stats');
    return data;
}

export const getUsers = async (page: number, search: string) => {
    const { data } = await axiosInstance.get(`/admin/users?page=${page}&limit=10&search=${search}`);
    return data;
}

export const toggleUserSubscription = async (id: string) => {
    const { data } = await axiosInstance.patch(`/admin/users/${id}/subscription/toggle`);
    return data;
}
