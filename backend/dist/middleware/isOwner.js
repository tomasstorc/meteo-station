"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = __importDefault(require("../model/Device"));
const error_response_1 = __importDefault(require("../response/error-response"));
const isOwner = (req, res, next) => {
    Device_1.default.find({
        $and: [{ _id: req.params.id }, { owner: req.user. }],
    }, (err, foundDevice) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundDevice)
            return res.status(401).json(new error_response_1.default("unauthorized"));
        next();
    });
};
exports.default = isOwner;
