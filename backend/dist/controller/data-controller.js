"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const covertToLocaleString_1 = __importDefault(require("../utils/covertToLocaleString"));
const Device_1 = __importDefault(require("../model/Device"));
const router = express_1.default.Router();
let name = "";
const getName = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const name = yield Device_1.default.findById(id).exec();
    return name === null || name === void 0 ? void 0 : name.name;
});
router.get("/:id", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const finalName = yield getName(req.params.id);
    console.log(finalName);
    Data_1.default.find({
        deviceid: req.params.id,
        date: {
            $lte: req.query.dateTo
                ? new Date(req.query.dateTo)
                : new Date(),
            $gte: req.query.dateFrom
                ? new Date(req.query.dateFrom)
                : new Date(Date.now() - 1000 * (60 * 60)),
        },
    }, (err, foundData) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (foundData.length === 0)
            return res.status(200).json(new success_response_1.default("No data found"));
        let finalData = (0, processData_1.default)(foundData, req.query.granularity ? +req.query.granularity : 5);
        finalData = (0, covertToLocaleString_1.default)(finalData);
        return res.status(200).json(new success_response_1.default("ok", {
            data: finalData,
            lastData: finalData[finalData.length - 1],
            name: finalName,
        }));
    });
}));
router.post("/", isDeviceAuth_1.default, (req, res) => {
    req.body.data.forEach((data) => {
        const newData = new Data_1.default({
            deviceid: req.body.deviceid,
            temperature: data.temperature,
            humidity: data.humidity,
            date: data.date || new Date(),
        });
        newData.save((err, savedData) => {
            if (err)
                return res.status(400).json(new error_response_1.default(err));
            if (!savedData)
                res.status(400).json(new error_response_1.default("data not saved"));
        });
    });
    return res.status(201).json(new success_response_1.default("ok"));
});
//   let newData = new Data<IData>({
//     deviceid: req.body.deviceid,
//     temperature: req.body.temperature,
//     humidity: req.body.humidity,
//     date: new Date(),
//   });
//   newData.save((err: CallbackError | undefined, savedData: IData) => {
//     if (err) return res.status(400).json(new ErrorResponse(err));
//     if (!savedData) res.status(400).json(new ErrorResponse("data not saved"));
//   });
// });
exports.default = router;
