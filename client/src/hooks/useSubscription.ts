import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as subApi from '../api/subscriptionApi';

export const useSubscription = () => useQuery({ queryKey: ['subscription', 'me'], queryFn: subApi.getMySubscription });

export const useUpdateSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: subApi.updateMySubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] });
        }
    });
}
