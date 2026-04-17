import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userApi from '../api/userApi';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: userApi.getCurrentUser,
  });
};

export const useUpdateUserCharity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateUserCharity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
};
