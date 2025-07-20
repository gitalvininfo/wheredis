import { Coordinates } from '@/interface/coordinates';

export interface GameActions {
  initializeGame: (coordinates: Coordinates[]) => void;
  setNextCoordinates: () => void;
  markGameAsOver: (isGameOver: boolean) => void;
  setScore: (score: number) => void;
}
