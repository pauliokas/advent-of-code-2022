import type { RucksackContents, RucksackItem } from './day03.input';

const alphabet = Array.from(Array(26)).map((_, idx) => String.fromCharCode(idx + 65));
const priorities = alphabet.reduce(
  (acc, curr, idx, arr) =>
    Object.assign(acc, {
      [curr]: idx + 1 + arr.length,
      [curr.toLowerCase()]: idx + 1,
    }),
  {} as Record<RucksackItem, number>,
);

const intersect = <T>(...sets: Set<T>[]): Set<T> => {
  const [first, ...rest] = sets;
  return rest.reduce((acc, curr) => new Set([...acc].filter((x) => curr.has(x))), first);
};

const batch = <T, N extends number>(array: T[], batchSize: N): T[][] => {
  const batched = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batched.push(array.slice(i, i + batchSize) as T[] & { length: N });
  }
  return batched;
};

export const solvePart1 = (input: RucksackContents[]): number =>
  input
    .map((contents) => [new Set(contents.slice(0, contents.length / 2)), new Set(contents.slice(contents.length / 2))])
    .map(([a, b]) => intersect(a, b))
    .flatMap((intersection) => [...intersection].map((x) => priorities[x]))
    .reduce((acc, curr) => acc + curr, 0);

export const solvePart2 = (input: RucksackContents[]): number =>
  batch(
    input.map((contents) => new Set(contents)),
    3,
  )
    .map((rucksacks) => intersect(...rucksacks))
    .flatMap((intersection) => [...intersection].map((x) => priorities[x]))
    .reduce((acc, curr) => acc + curr, 0);
