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
const router = express_1.default.Router();
router.get("/", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => {
    Device_1.default.find()
        .or([{ owner: req.user.id }, { users: req.user.id }])
        .exec((err, foundDevices) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (foundDevices.length === 0)
            return res.status(200).json(new success_response_1.default("no devices"));
        return res
            .status(200)
            .json(new success_response_1.default("success", foundDevices));
    });
});
router.get("/:id", isAuthenticated_1.default, isOwnerOrUser_1.default, (req, res) => {
    Device_1.default.findById(req.params.id, (err, foundDevice) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        return res
            .status(200)
            .json(new success_response_1.default("success", foundDevice));
    });
});
router.post("/", isAuthenticated_1.default, (req, res) => {
    const newDevice = new Device_1.default({
        name: req.body.name,
        owner: req.user.id,
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
router.delete("/id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    Device_1.default.findByIdAndDelete(req.params.id, (err, deletedDoc) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        return res.status(200).json(new success_response_1.default("deleted"));
    });
});
exports.default = router;
