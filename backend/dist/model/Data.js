"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    name: String,
    temperature: Number,
    humidity: Number,
    timestamp: Date,
    metadata: Object,
}, {
    timeseries: {
        timeField: "timestamp",
        metaField: "metadata",
        granularity: "hours",
    },
});
const Data = mongoose_1.default.model("Data", dataSchema);
exports.default = Data;
