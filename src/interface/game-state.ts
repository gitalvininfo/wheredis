import { Coordinates } from './coordinates';

export interface GameState {
  coordinates: Coordinates[];
  currentCoordinate: Coordinates | null;
  isGameOver: boolean;
  score: number;
}
