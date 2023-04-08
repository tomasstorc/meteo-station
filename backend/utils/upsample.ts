import IData from "../interface/Data";

export default function linearInterpolation(
  data: Array<IData>,
  interval: number
) {
  const interpolatedData = [];
  let currentIndex = 0;

  for (let i = 0; i < data.length - 1; i++) {
    interpolatedData.push(data[i]);
    const timeDifference = +data[i + 1].date - +data[i].date;
    const steps = timeDifference / interval;

    for (let j = 1; j < steps; j++) {
      const weight = j / steps;
      const interpolatedTemperature =
        data[i].temperature * (1 - weight) + data[i + 1].temperature * weight;
      const interpolatedHumidity =
        data[i].humidity * (1 - weight) + data[i + 1].humidity * weight;
      const interpolatedTimestamp = +data[i].date + j * interval;

      interpolatedData.push({
        date: new Date(interpolatedTimestamp).toLocaleString(),
        temperature: interpolatedTemperature,
        humidity: interpolatedHumidity,
      });
    }
  }

  interpolatedData.push(data[data.length - 1]);
  return interpolatedData;
}
