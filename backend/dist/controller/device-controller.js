"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const success_response_1 = __importDefault(require("../response/success-response"));
const AuthKey_1 = __importDefault(require("../model/AuthKey"));
const Device_1 = __importDefault(require("../model/Device"));
const error_response_1 = __importDefault(require("../response/error-response"));
const isOwnerOrUser_1 = __importDefault(require("../middleware/isOwnerOrUser"));
const isOwner_1 = __importDefault(require("../middleware/isOwner"));
const Data_1 = __importDefault(require("../model/Data"));
const router = express_1.default.Router();
router.get("/", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => {
    Device_1.default.find()
        .or([{ owner: req.user.username }, { users: req.user.username }])
        .exec((err, foundDevices) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (foundDevices.length === 0)
            return res.status(200).json(new success_response_1.default("no devices"));
        foundDevices.forEach((device) => {
            console.log(device);
            Data_1.default.find({ deviceId: device._id.toString() })
                .limit(1)
                .exec((err, foundData) => {
                console.log(foundData);
                if (err)
                    return res.status(400).json(new error_response_1.default(err));
                if (foundData.length === 0) {
                    device.temperature = 0;
                }
                else {
                    device.temperature = foundData[0].temperature;
                }
            });
        });
        return res
            .status(200)
            .json(new success_response_1.default("success", foundDevices));
    });
});
router.get("/:id", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => {
    Device_1.default.findById(req.params.id).exec((err, foundDevice) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundDevice)
            res.status(404).json(new error_response_1.default("no device found"));
        AuthKey_1.default.findOne({ deviceId: foundDevice._id }).exec((err, foundKey) => {
            if (err)
                return res.status(400).json(new error_response_1.default(err));
            if (!foundKey)
                return res.status(404).json(new error_response_1.default("no key found"));
            foundDevice = Object.assign(Object.assign({}, foundDevice._doc), { key: foundKey.key });
            return res
                .status(200)
                .json(new success_response_1.default("success", foundDevice));
        });
    });
});
router.post("/", isAuthenticated_1.default, (req, res) => {
    const newDevice = new Device_1.default({
        name: req.body.name,
        owner: req.user.username,
    });
    newDevice.save((err, savedDevice) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        const newKey = new AuthKey_1.default({
            deviceId: savedDevice._id,
            key: crypto_1.default.randomBytes(32).toString("hex"),
        });
        newKey.save((err, savedKey) => {
            if (err)
                return res
                    .status(400)
                    .json(new error_response_1.default(`error saving key: ${err}`));
            return res
                .status(201)
                .json(new success_response_1.default("created", { device: savedDevice, key: savedKey }));
        });
    });
});
router.put("/:id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    Device_1.default.findByIdAndUpdate(req.params.id, req.body, (err, updatedDevice) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        return res.status(200).json(new success_response_1.default("updated"));
    });
});
router.delete("/:id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    Device_1.default.findByIdAndDelete(req.params.id, (err, deletedDoc) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        AuthKey_1.default.findOneAndDelete({ deviceId: req.params.id }, (err, deletedKey) => {
            if (err)
                return res.status(400).json(new error_response_1.default(err));
            return res.status(200).json(new success_response_1.default("deleted"));
        });
    });
});
exports.default = router;
