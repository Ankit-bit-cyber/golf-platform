import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as scoresApi from '../api/scoresApi';

export const useScores = () => {
  return useQuery({
    queryKey: ['scores'],
    queryFn: scoresApi.getScores,
  });
};

export const useAddScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scoresApi.createScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { value?: number; date?: string } }) => 
      scoresApi.updateScore(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
  });
};

export const useDeleteScore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scoresApi.deleteScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scores'] });
    },
  });
};
