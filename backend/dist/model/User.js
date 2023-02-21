"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const password_validator_1 = __importDefault(require("../utils/password-validator"));
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
        validate: [password_validator_1.default, "password did not meet minimum requirements"],
    },
});
