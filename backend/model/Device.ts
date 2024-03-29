import mongoose from "mongoose";
import IDevice from "../interface/Device";

const deviceSchema = new mongoose.Schema<IDevice>({
  name: {
    type: String,
    required: [true, "device name is required"],
  },
  owner: {
    type: String,
    ref: "User",
  },
  users: [
    {
      type: String,
      ref: "User",
    },
  ],
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
