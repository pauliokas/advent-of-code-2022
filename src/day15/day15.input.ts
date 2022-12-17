export type Coords = { x: number; y: number };

const coordsRegex =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

export default (input: string): { sensor: Coords; beacon: Coords }[] =>
  input
    .trim()
    .split('\n')
    .map((line) => coordsRegex.exec(line)!)
    .map(({ groups }) => ({
      sensor: { x: Number(groups!.sensorX), y: Number(groups!.sensorY) },
      beacon: { x: Number(groups!.beaconX), y: Number(groups!.beaconY) },
    }));
