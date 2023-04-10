import IData from "../interface/Data";

export default function convertToLocaleString(data: any, deviceid: any) {
  let finalData: any = [];
  data.forEach((d: any) => {
    let newData = {
      deviceid: deviceid,
      date: d.date.toLocaleString(),
      temperature: d.temperature,
      humidity: d.humidity,
    };
    finalData.push(newData);
  });
  return finalData;
}
