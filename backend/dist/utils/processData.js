"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upsample_1 = __importDefault(require("./upsample"));
const downSample_1 = __importDefault(require("./downSample"));
function processData(rawData, granularity) {
    const interval = granularity * 60 * 1000; // Převod na milisekundy
    const timeDifference = rawData[rawData.length - 1].date - rawData[0].date;
    if (interval > timeDifference / rawData.length) {
        // Upsampling
        return (0, upsample_1.default)(rawData, interval);
    }
    else if (interval > timeDifference / rawData.length) {
        // Downsampling
        return (0, downSample_1.default)(rawData, interval);
    }
    else {
        return rawData;
    }
}
exports.default = processData;
