import mongoose from "mongoose";

import IUser from "../interface/User";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    min: [3, "username must be at least 3 characters long"],
    max: [15, "maximum number of characters exceeeded"],
    required: [true, "username is required"],
    type: String,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;
