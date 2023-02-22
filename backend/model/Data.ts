import mongoose from "mongoose";
import IData from "../interface/Data";

const dataSchema = new mongoose.Schema<IData>(
  {
    name: String,
    temperature: Number,
    humidity: Number,
    timestamp: Date,
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
