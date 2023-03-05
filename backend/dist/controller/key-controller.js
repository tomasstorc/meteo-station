"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const isOwner_1 = __importDefault(require("../middleware/isOwner"));
const AuthKey_1 = __importDefault(require("../model/AuthKey"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
router.get("/:id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    AuthKey_1.default.find({ deviceId: req.params.id }, (err, foundKey) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundKey)
            return res.status(200).json(new success_response_1.default("No auth key found"));
        return res
            .status(200)
            .json(new success_response_1.default("ok", { authKeys: foundKey }));
    });
});
router.put("/:id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    AuthKey_1.default.findOneAndUpdate({ deviceId: req.params.id }, { key: crypto_1.default.randomBytes(32).toString("hex") }, { upsert: true, returnDocument: "after" }, (err, updatedKey) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        return res
            .status(200)
            .json(new success_response_1.default("updated", { key: updatedKey }));
    });
});
exports.default = router;
