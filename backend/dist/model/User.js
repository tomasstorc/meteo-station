"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
