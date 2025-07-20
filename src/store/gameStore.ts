import { GameActions } from '@/interface/game-actions';
import { GameState } from '@/interface/game-state';
import { create } from 'zustand';

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  // properties
  coordinates: [],
  currentCoordinates: null,
  currentCoordinateIndex: 0,
  isGameOver: false,
  score: 0,

  // actions
  initializeGame: (coordinates) => set({ coordinates }),
  setNextCoordinates: () => {
    const coordinates = get().coordinates;
    const index = get().currentCoordinateIndex;
    const coordinate = coordinates[index];

    set({
      currentCoordinateIndex: get().currentCoordinateIndex + 1,
      currentCoordinates: coordinate,
    });
  },

  markGameAsOver: (isGameOver) => set({ isGameOver }),
  setScore: (score) => {
    const { score: currentScore } = get();
    const newScore = currentScore + score;

    set({ score: newScore });
  },
}));
