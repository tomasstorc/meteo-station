import IData from "../interface/Data";

export default async function convertToLocaleString(data: any) {
  let finalData: any = [];
  data.forEach((d: any) => {
    let newData = {
      date: d.date.toLocaleString(),
      temperature: d.temperature,
      humidity: d.humidity,
    };
    finalData.push(newData);
  });
  return finalData;
}
