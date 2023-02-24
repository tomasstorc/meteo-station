"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const morgan_1 = __importDefault(require("morgan"));
const stream = {
    // Use the http severity
    write: (message) => logger_1.default.http(message),
};
const morganMiddleware = (0, morgan_1.default)(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream });
exports.default = morganMiddleware;
