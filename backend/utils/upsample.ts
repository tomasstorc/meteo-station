import IData from "../interface/Data";

export default function upsample(data: Array<IData>) {
  const upsampledData = [];
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];
    const prevTime = new Date(prev.timestamp).getTime();
    const currTime = new Date(curr.timestamp).getTime();
    const diff = currTime - prevTime;
    upsampledData.push(prev);
    if (diff > 60000) {
      const numIntervals = Math.floor(diff / 60000);
      const tempDiff = +curr.temperature - +prev.temperature;
      const tempStep = tempDiff / (numIntervals + 1);
      const humDiff = +curr.humidity - +prev.humidity;
      const humStep = tempDiff / (numIntervals + 1);
      const timeStep = 60000;

      for (let j = 1; j <= numIntervals; j++) {
        const temperature = +prev.temperature + tempStep * j;
        const humidity = +prev.humidity + humStep * j;
        const timestamp = new Date(prevTime + j * timeStep).toISOString();
        upsampledData.push({
          timestamp,
          temperature,
          humidity,
          deviceId: data[i].deviceid,
        });
      }
    }
  }
  upsampledData.push(data[data.length - 1]);
  return upsampledData;
}
