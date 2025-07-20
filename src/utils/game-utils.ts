const maxDistance = 500_000; // 500 km
const maxScore = 100; // max points to get per guess

export function calculateScore(distance: number): number {
  if (distance >= maxDistance) return 0;
  return Math.round(maxScore * (1 - distance / maxDistance));
}
