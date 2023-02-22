import mongoose from "mongoose";

export default interface IAuthKey {
  key: string;
  userId: mongoose.Types.ObjectId;
}
