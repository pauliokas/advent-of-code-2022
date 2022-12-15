import type { CellRange } from './day14.input';

const print = (cave: Map<number, CellRange[]>): void => {
  const minX = Math.min(...cave.keys());
  const maxX = Math.max(...cave.keys());
  const minY = 0;
  const maxY = Math.max(...[...cave.values()].flatMap((x) => x.map((y) => y.range[1])));

  const lines = [];

  for (let y = minY; y <= maxY; y += 1) {
    let line = '';
    for (let x = minX; x <= maxX; x += 1) {
      if (y === 0 && x === 500) {
        line += '+';
        continue;
      }

      const range = (cave.get(x) || []).find((rock) => rock.range[0] <= y && rock.range[1] >= y);
      if (!range) {
        line += '.';
        continue;
      }
      line += range.type === 'rock' ? '#' : 'o';
    }

    lines.push(line);
  }

  // eslint-disable-next-line no-console
  console.log(lines.join('\n'));
};

const isFree = (cave: Map<number, CellRange[]>, x: number, y: number): boolean =>
  !(cave.get(x) || []).some((rock) => rock.range[0] <= y && rock.range[1] >= y);

// export const solvePart1 = (cave: Map<number, Xxx[]>): number => {
//   print(cave);
//
//   let sandUnits = 0;
//   while (true) {
//     let x = 500;
//     let y = 0;
//     while (true) {
//       const ranges = cave.get(x) || [];
//       const ledge = Math.min(
//         ...ranges
//           // eslint-disable-next-line @typescript-eslint/no-loop-func
//           .filter(({ range: [, rangeEnd] }) => y + 1 <= rangeEnd)
//           .map(({ range: [rangeStart] }) => rangeStart),
//       );
//
//       if (ledge === Infinity) {
//         return sandUnits;
//       }
//
//       y = ledge - 1;
//       if (isFree(cave, x - 1, y + 1)) {
//         x -= 1;
//         continue;
//       } else if (isFree(cave, x + 1, y + 1)) {
//         x += 1;
//         continue;
//       }
//
//       if (!cave.has(x)) cave.set(x, []);
//       cave.get(x)!.push({ type: 'sand', range: [y, y] });
//       break;
//     }
//
//     sandUnits += 1;
//     print(cave);
//   }
//
//   return -1;
// };

export const solvePart1 = (cave: Map<number, CellRange[]>): number => {
  print(cave);

  const maxY = Math.max(...[...cave.values()].flatMap((x) => x.map(({ range: [, y] }) => y)));

  const dxs = [0, -1, +1] as const;

  let sandUnits = 0;
  let fellThrough = false;
  while (!fellThrough) {
    fellThrough = true;
    let x = 500;
    for (let y = 0; y <= maxY; y += 1) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const xChange = dxs.find((dx) => isFree(cave, x + dx, y + 1));
      if (xChange !== undefined) {
        x += xChange;
        continue;
      }

      cave.get(x)!.unshift({ type: 'sand', range: [y, y] });
      sandUnits += 1;
      fellThrough = false;
      break;
    }

    print(cave);
  }

  return sandUnits;
};

export const solvePart2 = (): number => {
  return 42;
};
