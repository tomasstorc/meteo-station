import IData from "../interface/Data";

export default function averaging(data: Array<IData>, interval: number) {
  let currentIntervalStart =
    Math.floor(data[0].date.getTime() / interval) * interval;
  let sumTemperature = 0;
  let sumHumidity = 0;
  let count = 0;

  const downsampledData = [];

  for (let i = 0; i < data.length; i++) {
    const currentTimestamp = data[i].date.getTime();

    if (currentTimestamp <= currentIntervalStart + interval) {
      console.log(currentIntervalStart, currentTimestamp, interval);
      sumTemperature += data[i].temperature;
      sumHumidity += data[i].humidity;
      count++;
    } else {
      console.log(currentIntervalStart, currentTimestamp, interval);

      downsampledData.push({
        date: new Date(currentIntervalStart),
        temperature: sumTemperature / count,
        humidity: sumHumidity / count,
      });

      currentIntervalStart += interval;

      // Skip data points that are outside the next interval
      while (currentTimestamp >= currentIntervalStart + interval) {
        console.log(currentIntervalStart, currentTimestamp, interval);

        currentIntervalStart += interval;
      }

      sumTemperature = data[i].temperature;
      sumHumidity = data[i].humidity;
      count = 1;
    }
  }

  // Push the last interval if it has any data points
  if (count > 0) {
    downsampledData.push({
      date: new Date(currentIntervalStart),
      temperature: sumTemperature / count,
      humidity: sumHumidity / count,
    });
  }

  return downsampledData;
}
