"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function convertToLocaleString(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.default = convertToLocaleString;
