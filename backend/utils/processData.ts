import IData from "../interface/Data";
import linearInterpolation from "./upsample";
import averaging from "./downSample";

export default function processData(rawData: Array<any>, granularity: number) {
  const interval = granularity * 60 * 1000; // Převod na milisekundy

  const timeDifference =
    rawData[rawData.length - 1].timestamp - rawData[0].timestamp;

  const numberOfIntervals = Math.floor(timeDifference / interval);
  // upsample or downsample
  if (numberOfIntervals > rawData.length) {
    return linearInterpolation(rawData, numberOfIntervals);
  }
  return averaging(rawData, numberOfIntervals);
}
