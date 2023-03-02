"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const success_response_1 = __importDefault(require("../response/success-response"));
const Data_1 = __importDefault(require("../model/Data"));
const isDeviceAuth_1 = __importDefault(require("../middleware/isDeviceAuth"));
const error_response_1 = __importDefault(require("../response/error-response"));
const isOwnerOrUser_1 = __importDefault(require("../middleware/isOwnerOrUser"));
const router = express_1.default.Router();
router.get("/:id", isOwnerOrUser_1.default, (req, res) => {
    Data_1.default.find({
        deviceid: req.params.id,
        timestamp: {
            $lte: Date.now(),
            $gte: new Date(Date.now() - 1000 * (60 * 5)),
        },
    }, (err, foundData) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundData)
            return res.status(200).json(new success_response_1.default("No data found"));
        return res
            .status(200)
            .json(new success_response_1.default("ok", { data: foundData }));
    });
});
router.post("/", isDeviceAuth_1.default, (req, res) => {
    let newData = new Data_1.default({
        deviceid: req.body.deviceid,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        timestamp: Date.now(),
    });
    newData.save((err, savedData) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!savedData)
            res.status(400).json(new error_response_1.default("data not saved"));
        return res.status(201);
    });
    return res.json(new success_response_1.default("ok", req.body));
});
exports.default = router;
