import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as winnersApi from '../api/winnersApi';

export const useMyWins = () => useQuery({ queryKey: ['winners', 'me'], queryFn: winnersApi.getMyWins });
export const useAllWinners = () => useQuery({ queryKey: ['winners', 'all'], queryFn: winnersApi.getAllWinners });

export const useSubmitProof = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: winnersApi.submitProof,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winners', 'me'] })
    });
}

export const useVerifyWinner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: winnersApi.verifyWinner,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['winners', 'all'] })
    });
}
