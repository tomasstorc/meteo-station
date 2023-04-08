import IData from "../interface/Data";
import linearInterpolation from "./upsample";
import averaging from "./downSample";

export default function processData(rawData: Array<any>, granularity: number) {
  const interval = granularity * 60 * 1000; // Převod na milisekundy

  const timeDifference =
    rawData[rawData.length - 1].timestamp - rawData[0].timestamp;

  if (interval > timeDifference / rawData.length) {
    // Upsampling
    return linearInterpolation(rawData, interval);
  } else if (interval > timeDifference / rawData.length) {
    // Downsampling
    return averaging(rawData, interval);
  } else {
    return rawData;
  }
}
