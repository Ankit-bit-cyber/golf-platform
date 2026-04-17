import axiosInstance from './axiosInstance';

export const getDraws = async () => {
    const { data } = await axiosInstance.get('/draws');
    return data;
}

export const getMyResults = async () => {
    const { data } = await axiosInstance.get('/draws/my-results');
    return data;
}

export const getDrawById = async (id: string) => {
    const { data } = await axiosInstance.get(`/draws/${id}`);
    return data;
}

export const createDraw = async (payload: { month: number, year: number, draw_type: string }) => {
    const { data } = await axiosInstance.post('/draws', payload);
    return data;
}

export const simulateDraw = async (id: string) => {
    const { data } = await axiosInstance.post(`/draws/${id}/simulate`);
    return data;
}

export const publishDraw = async (id: string) => {
    const { data } = await axiosInstance.post(`/draws/${id}/publish`);
    return data;
}
