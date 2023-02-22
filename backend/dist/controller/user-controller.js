"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../model/User"));
const password_validator_1 = __importDefault(require("../utils/password-validator"));
const error_response_1 = __importDefault(require("../response/error-response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post("/", (req, res) => {
    if (!(0, password_validator_1.default)(req.body.password)) {
        return res
            .status(400)
            .json(new error_response_1.default("password did not meet minimum criteria"));
    }
    User_1.default.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err)
            return res.status(400).json(new error_response_1.default(err));
        if (foundUser)
            return res
                .status(400)
                .json(new error_response_1.default("user with given username already exist"));
        bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
            if (err)
                return res.status(400).json(new error_response_1.default(err));
            const user = new User_1.default({
                username: req.body.username,
                password: hash,
                role: req.body.role,
            });
        });
    });
});
exports.default = router;
