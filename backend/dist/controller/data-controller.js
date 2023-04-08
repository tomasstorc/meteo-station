"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const success_response_1 = __importDefault(require("../response/success-response"));
const Data_1 = __importDefault(require("../model/Data"));
const isDeviceAuth_1 = __importDefault(require("../middleware/isDeviceAuth"));
const error_response_1 = __importDefault(require("../response/error-response"));
const isOwnerOrUser_1 = __importDefault(require("../middleware/isOwnerOrUser"));
const processData_1 = __importDefault(require("../utils/processData"));
const router = express_1.default.Router();
router.get("/:id", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => {
    Data_1.default.find({
        deviceid: req.params.id,
        date: {
            $lte: req.query.dateTo ? req.query.dateFrom : new Date(),
            $gte: req.query.dateFrom
                ? req.query.dateFrom
                : new Date(Date.now() - 1000 * (60 * 60)),
        },
    }, (err, foundData) => {
        var _a;
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundData)
            return res.status(200).json(new success_response_1.default("No data found"));
        console.log(req.query.granularity);

        const finalData = (0, processData_1.default)(foundData, req.query.granularity ? +req.query.granularity : 5);

        return res.status(200).json(new success_response_1.default("ok", {
            data: finalData,
        }));

    });
});
router.post("/", isDeviceAuth_1.default, (req, res) => {
    let newData = new Data_1.default({
        deviceid: req.body.deviceid,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        date: new Date(),
    });
    newData.save((err, savedData) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!savedData)
            res.status(400).json(new error_response_1.default("data not saved"));
        return res.sendStatus(201);
    });
});
exports.default = router;
