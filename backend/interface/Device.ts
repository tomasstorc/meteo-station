import mongoose from "mongoose";

export default interface IDevice {
  name: string;
  owner: mongoose.Types.ObjectId;
  users: Array<mongoose.Types.ObjectId>;
}
