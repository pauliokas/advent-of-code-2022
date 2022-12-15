export type Range = [number, number];
export type CellRange = {
  type: 'rock' | 'sand';
  range: Range;
};

const squashIntervals = (rocks: Map<number, Range[]>) => {
  for (const [x, intervals] of rocks) {
    intervals.sort(([a], [b]) => a - b);

    const newIntervals: Range[] = [];
    newIntervals.push(intervals[0]);

    for (let i = 1; i < intervals.length; i += 1) {
      const [, prevEnd] = newIntervals[newIntervals.length - 1];
      const [curStart, curEnd] = intervals[i];

      if (prevEnd >= curStart) {
        newIntervals[newIntervals.length - 1][1] = curEnd;
      } else {
        newIntervals.push(intervals[i]);
      }
    }

    rocks.set(x, newIntervals);
  }
};

const parseIntervals = (input: string) => {
  const rocks = new Map<number, Range[]>();

  const rockFormations = input
    .trim()
    .split('\n')
    .map((line) => line.split(' -> ').map((coords) => coords.split(',').map((num) => parseInt(num, 10)) as Range));

  for (const rockFormation of rockFormations) {
    for (let verticeIdx = 0; verticeIdx < rockFormation.length - 1; verticeIdx += 1) {
      const [curX, curY] = rockFormation[verticeIdx];
      const [nextX, nextY] = rockFormation[verticeIdx + 1];

      for (let x = Math.min(curX, nextX); x <= Math.max(curX, nextX); x += 1) {
        if (!rocks.has(x)) rocks.set(x, []);
        rocks.get(x)!.push([curY, nextY]);
      }
    }
  }
  return rocks;
};

export default (input: string): Map<number, CellRange[]> => {
  const rocks = parseIntervals(input);
  squashIntervals(rocks);

  const cave = new Map<number, CellRange[]>();
  for (const [x, intervals] of rocks) {
    cave.set(
      x,
      intervals.map((range) => ({ type: 'rock', range } as CellRange)),
    );
  }

  return cave;
};
