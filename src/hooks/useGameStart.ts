import { fetchGameData } from '@/services/game-service';
import { useGameStore } from '@/store/gameStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGameStart = () => {
  // React query hook
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['game'],
    queryFn: () => fetchGameData(),
  });

  // Zustand store
  const initializeGame = useGameStore((s) => s.initializeGame);

  useEffect(() => {
    if (!isFetching && data) {
      initializeGame(data);
      useGameStore.getState().setNextCoordinates();
    }
  }, [isFetching, data, initializeGame]);

  return {
    isFetching,
    isSuccess,
    data,
  };
};
