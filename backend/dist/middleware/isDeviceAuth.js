"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthKey_1 = __importDefault(require("../model/AuthKey"));
const error_response_1 = __importDefault(require("../response/error-response"));
const isDeviceAuthenticated = (req, res, next) => {
    const deviceKey = req.headers["authorization"];
    if (!deviceKey)
        return res.status(401).json(new error_response_1.default("unauthorized"));
    AuthKey_1.default.findOne({ key: deviceKey, deviceId: req.body.id }, (err, foundKey) => {
        if (err)
            return res.status(401).json(new error_response_1.default(err));
        if (!foundKey)
            return res.status(401).json(new error_response_1.default("invalid key"));
        if (foundKey)
            next();
    });
};
exports.default = isDeviceAuthenticated;
