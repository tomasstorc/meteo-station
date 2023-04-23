import IData from "../interface/Data";

export default function convertToLocaleString(data: any) {
  let finalData: any = [];
  data.forEach((d: any) => {
    let newData = {
      date: d.date.toLocaleString(),
      temperature: d.temperature,
      humidity: d.humidity,
    };
    finalData.push(newData);
  });
  // sort data by date
  finalData.sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return finalData;
}
