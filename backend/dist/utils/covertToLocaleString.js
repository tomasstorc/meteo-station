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
    return finalData;
}
exports.default = convertToLocaleString;
