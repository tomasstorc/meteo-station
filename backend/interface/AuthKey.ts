import mongoose from "mongoose";

export default interface IAuthKey {
  key: string;
  deviceId: mongoose.Types.ObjectId;
}
