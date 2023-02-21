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
    validate: [validatePassword, "password did not meet minimum requirements"],
  },
});
