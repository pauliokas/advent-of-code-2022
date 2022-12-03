export type Pair = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

export default (input: string): Pair[] => {
  const lines = input.trim().split('\n');
  return lines.map((line) => line.split(' ') as Pair);
};
