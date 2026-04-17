import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as drawsApi from '../api/drawsApi';

export const useDraws = () => useQuery({ queryKey: ['draws'], queryFn: drawsApi.getDraws });
export const useMyResults = () => useQuery({ queryKey: ['draws', 'my-results'], queryFn: drawsApi.getMyResults });
export const useDraw = (id: string) => useQuery({ queryKey: ['draws', id], queryFn: () => drawsApi.getDrawById(id), enabled: !!id });

export const useCreateDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: drawsApi.createDraw,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] })
    });
}
export const useSimulateDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: drawsApi.simulateDraw,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draws'] })
    });
}
export const usePublishDraw = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: drawsApi.publishDraw,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['draws'] });
            queryClient.invalidateQueries({ queryKey: ['draws', 'my-results'] });
        }
    });
}
