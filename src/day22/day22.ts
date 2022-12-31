import type { Map, Moves } from '@/day22/day22.input';

type Coords = { x: number; y: number };

const rotate = ({ x, y }: Coords, rotation: 'R' | 'L') => {
  const angle = Math.atan2(-y, x) + (rotation === 'R' ? -1 : +1) * (Math.PI / 2);
  return { x: Math.round(Math.cos(angle)), y: Math.round(Math.sin(angle)) * -1 };
};

const move = (map: Map, coords: Coords, { x: dx, y: dy }: Coords): Coords => {
  const width = map[0].length;
  const height = map.length;

  const isInBounds = (newCoords: { x: number; y: number }) =>
    newCoords.x >= 0 && newCoords.x < width && newCoords.y >= 0 && newCoords.y < height;

  const newCoords = { x: coords.x + dx, y: coords.y + dy };

  if (!isInBounds(newCoords) || map[newCoords.y][newCoords.x] === ' ') {
    newCoords.x = dx !== 0 ? width - 1 - ((dx + 1) / 2) * (width - 1) : newCoords.x;
    newCoords.y = dy !== 0 ? height - 1 - ((dy + 1) / 2) * (height - 1) : newCoords.y;
    while (map[newCoords.y][newCoords.x] === ' ') {
      newCoords.x += dx;
      newCoords.y += dy;
    }
  }

  if (map[newCoords.y][newCoords.x] === '#') return coords;

  return newCoords;
};

export const solvePart1 = ({ map, moves }: { map: Map; moves: Moves }): number => {
  let pos = { x: map[0].findIndex((cell) => cell === '.'), y: 0 };
  let dir = { x: +1, y: 0 };

  for (const m of moves) {
    if (typeof m === 'string') {
      dir = rotate(dir, m);
      continue;
    }

    for (let i = 0; i < m; i += 1) {
      const newPos = move(map, pos, dir);
      if (newPos === pos) break;
      pos = newPos;
    }
  }

  return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + dir.y * (dir.y - 1) - (dir.x - 1);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const solvePart2 = ({ map, moves }: { map: Map; moves: Moves }): number => 42;
