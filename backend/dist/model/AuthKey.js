"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authKeySchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: [true, "key is required"],
    },
    deviceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Device",
    },
});
const AuthKey = mongoose_1.default.model("AuthKey", authKeySchema);
exports.default = AuthKey;
