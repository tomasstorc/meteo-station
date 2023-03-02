"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const dbConnect = () => {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then(() => {
        logger_1.default.info("connected to db");
    })
        .catch((e) => {
        logger_1.default.error(`there was an error connecting to db, reason ${e}`);
    });
};
exports.default = dbConnect;
