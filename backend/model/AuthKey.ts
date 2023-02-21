import mongoose from "mongoose";
import IAuthKey from "../interface/AuthKey";

const authKeySchema = new mongoose.Schema<IAuthKey>({
  key: {
    type: String,
    required: [true, "key is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const AuthKey = mongoose.model<IAuthKey>("AuthKey", authKeySchema);
export default AuthKey;
