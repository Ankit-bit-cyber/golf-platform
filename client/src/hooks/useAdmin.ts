import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminApi from '../api/adminApi';

export const useAdminStats = () => useQuery({ queryKey: ['admin', 'stats'], queryFn: adminApi.getStats });

export const useAdminUsers = (page: number, search: string) => useQuery({ 
    queryKey: ['admin', 'users', page, search], 
    queryFn: () => adminApi.getUsers(page, search) 
});

export const useToggleSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: adminApi.toggleUserSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
        }
    });
}
