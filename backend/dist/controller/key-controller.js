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
const router = express_1.default.Router();
router.get("/:id", isAuthenticated_1.default, isOwner_1.default, (req, res) => {
    AuthKey_1.default.find({ deviceId: req.params.id }, (err, foundKeys) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (!foundKeys)
            return res.status(200).json(new success_response_1.default("No auth keys found"));
        return res
            .status(200)
            .json(new success_response_1.default("ok", { authKeys: foundKeys }));
    });
});
exports.default = router;
