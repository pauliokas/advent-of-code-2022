import { solvePart1, solvePart2 } from './day14';
import parseInput from './day14.input';
import input from './input.txt';

const exampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('Day 14', () => {
  describe('part 1', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart1(parsedInput)).toBe(24);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart1(parsedInput)).not.toBe(87);
    });
  });

  describe('part 2', () => {
    it('example', () => {
      const parsedInput = parseInput(exampleInput);

      expect(solvePart2(parsedInput)).toBe(-1);
    });

    it('exercise', () => {
      const parsedInput = parseInput(input);

      expect(solvePart2(parsedInput)).toBe(-1);
    });
  });
});
