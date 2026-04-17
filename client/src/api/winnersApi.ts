import axiosInstance from './axiosInstance';

export const getMyWins = async () => {
    const { data } = await axiosInstance.get('/winners/me');
    return data;
}

export const submitProof = async ({ id, file }: { id: string, file: File }) => {
    const formData = new FormData();
    formData.append('proof', file);
    const { data } = await axiosInstance.post(`/winners/${id}/proof`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}

export const getAllWinners = async () => {
    const { data } = await axiosInstance.get('/winners');
    return data;
}

export const verifyWinner = async (payload: { id: string, action: string }) => {
    const { data } = await axiosInstance.patch(`/winners/${payload.id}/verify`, { action: payload.action });
    return data;
}
