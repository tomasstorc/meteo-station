"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = __importDefault(require("../model/Data"));
const logger_1 = __importDefault(require("./logger"));
function dbSeed() {
    for (let i = 0; i < 10; i++) {
        let data = new Data_1.default({
            deviceid: "63f8a7e595e3bfcac43e1bc6",
            date: new Date(Date.now() - 300000 * i),
            temperature: 25 - i,
            humidity: 24 - i,
        });
        data.save();
    }
    logger_1.default.info("db seeded");
}
exports.default = dbSeed;
