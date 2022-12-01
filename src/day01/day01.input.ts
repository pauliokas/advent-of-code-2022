export default (input: string): number[][] => {
  const lines = input.split('\n');

  const result: number[][] = [];
  let currentArray: number[] = [];
  for (let idx = 0; idx < lines.length; idx += 1) {
    if (lines[idx] === '') {
      result.push(currentArray);
      currentArray = [];
      continue;
    }

    currentArray.push(parseInt(lines[idx], 10));
  }

  return result;
};
