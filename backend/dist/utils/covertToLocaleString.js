"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToLocaleString(data) {
    let finalData = [];
    data.forEach((d) => {
        let newData = {
            date: d.date.toLocaleString(),
            temperature: d.temperature,
            humidity: d.humidity,
        };
        finalData.push(newData);
    });
    // sort data by date
    finalData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return finalData;
}
exports.default = convertToLocaleString;
