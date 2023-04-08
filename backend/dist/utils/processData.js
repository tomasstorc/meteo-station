"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upsample_1 = __importDefault(require("./upsample"));
const downSample_1 = __importDefault(require("./downSample"));
function processData(rawData, granularity) {
    const interval = granularity * 60 * 1000; // Převod na milisekundy
    const timeDifference = rawData[rawData.length - 1].timestamp - rawData[0].timestamp;
    const numberOfIntervals = Math.floor(timeDifference / interval);
    // upsample or downsample
    if (numberOfIntervals > rawData.length) {
        return (0, upsample_1.default)(rawData, numberOfIntervals);
    }
    return (0, downSample_1.default)(rawData, numberOfIntervals);
}
exports.default = processData;
