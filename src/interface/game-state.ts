import { Coordinates } from './coordinates';

export interface GameState {
  coordinates: Coordinates[];
  currentCoordinates: Coordinates | null;
  currentCoordinateIndex: number;
  isGameOver: boolean;
  score: number;
}
