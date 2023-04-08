"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    deviceid: {
        type: String,
        required: [true, "device name is required"],
    },
    temperature: {
        type: Number,
        required: [true, "temperature is required"],
    },
    humidity: {
        type: Number,
        required: [true, "humidity is required"],
    },
    date: {
        type: Date,
    },
}, {
    timeseries: {
        timeField: "timestamp",
        granularity: "minutes",
    },
});
const Data = mongoose_1.default.model("Data", dataSchema);
exports.default = Data;
