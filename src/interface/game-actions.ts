import { Coordinates } from '@/interface/coordinates';

export interface GameActions {
  initializeGame: (coordinates: Coordinates[]) => void;
  setActiveLocation: (coordinate: Coordinates) => void;
  markGameAsOver: (isGameOver: boolean) => void;
  setScore: (score: number) => void;
}
