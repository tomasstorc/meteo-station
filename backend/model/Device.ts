import mongoose, { mongo } from "mongoose";
import IDevice from "../interface/Device";

const deviceSchema = new mongoose.Schema<IDevice>({
  name: {
    type: String,
    required: [true, "device name is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;
