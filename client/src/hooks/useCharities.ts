import { useQuery } from '@tanstack/react-query';
import * as charitiesApi from '../api/charitiesApi';

export const useCharities = (featured?: boolean, search?: string) => {
  return useQuery({
    queryKey: ['charities', { featured, search }],
    queryFn: () => charitiesApi.getCharities(featured, search),
  });
};

export const useCharity = (id: string) => {
  return useQuery({
    queryKey: ['charities', id],
    queryFn: () => charitiesApi.getCharityById(id),
    enabled: !!id,
  });
};
