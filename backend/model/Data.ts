import mongoose from "mongoose";
import IData from "../interface/Data";

const dataSchema = new mongoose.Schema<IData>(
  {
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
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    metadata: Object,
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "minutes",
    },
  }
);

const Data = mongoose.model("Data", dataSchema);
export default Data;
