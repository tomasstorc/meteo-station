import mongoose from "mongoose";
import validatePassword from "../utils/password-validator";
import IUser from "../interface/User";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    min: [3, "password must be atleast 3 characters long"],
    max: [15, "maximum number of characters exceeeded"],
    required: [true, "username is required"],
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["admin", "user"],
      message: `{VALUE} is not valid, must be admin or user`,
    },
  },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
