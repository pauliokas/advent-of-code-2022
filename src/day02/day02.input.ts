export type Pair = ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'];

export default (input: string): Pair[] => {
  const lines = input.split('\n');
  return lines.filter((line) => line !== '').map((line) => line.split(' ') as Pair);
};
