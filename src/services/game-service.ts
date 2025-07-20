import { Coordinates } from '@/interface/coordinates';
import { apiRequest } from '@/utils/axios-client';

export const fetchGameData = async (): Promise<Coordinates[]> => {
  const response = await apiRequest({ url: '/coordinates' });
  return response.data;
};
