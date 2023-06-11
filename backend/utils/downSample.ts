import IData from "../interface/Data";

export default function averaging(data: Array<IData>, interval: number) {
  const downsampledData = [];
  let currentTimestamp = data[0].date.getTime();
  let sumTemperature = 0;
  let sumHumidity = 0;
  let count = 0;

  for (let i = 0; i < data.length; i++) {
    if (+data[i].date < currentTimestamp + interval) {
      sumTemperature += data[i].temperature;
      sumHumidity += data[i].humidity;
      count++;
    } else {
      downsampledData.push({
        // convert timestamp to normal date

        date: new Date(currentTimestamp).toLocaleString(),
        temperature: sumTemperature / count,
        humidity: sumHumidity / count,
      });

      currentTimestamp += interval;
      sumTemperature = data[i].temperature;
      sumHumidity = data[i].humidity;
      count = 1;
    }
  }

  downsampledData.push({
    date: new Date(currentTimestamp).toLocaleString(),
    temperature: sumTemperature / count,
    humidity: sumHumidity / count,
  });
  console.log(downsampledData);

  return downsampledData;
}
