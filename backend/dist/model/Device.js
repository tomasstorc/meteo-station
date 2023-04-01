"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deviceSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "device name is required"],
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    users: [
        {
            type: String,
            ref: "User",
        },
    ],
});
const Device = mongoose_1.default.model("Device", deviceSchema);
exports.default = Device;
