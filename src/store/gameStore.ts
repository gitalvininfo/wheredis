import { GameActions } from '@/interface/game-actions';
import { GameState } from '@/interface/game-state';
import { create } from 'zustand';

export const useGameStore = create<GameState & GameActions>((set) => ({
  // properties
  coordinates: [],
  currentCoordinate: null,
  isGameOver: false,
  score: 0,

  // actions
  initializeGame: (coordinates) => set({ coordinates }),
  setActiveLocation: (coordinate) => set({ currentCoordinate: coordinate }),
  markGameAsOver: (isGameOver) => set({ isGameOver }),
  setScore: (score) => set({ score }),
}));
