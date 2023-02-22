"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const router = express_1.default.Router();
router.post("/login", (req, res) => {
    const body = req.body;
    User_1.default.findOne({ email: body.email }, (err, foundUser) => {
        if (!foundUser) {
            res
                .status(401)
                .json(new error_response_1.default("username or password incorrect"));
        }
        else if (err) {
            res.status(400).json(new error_response_1.default(err));
        }
        else {
            bcrypt_1.default.compare(body.password, foundUser.password, (err, result) => {
                if (err) {
                    res.status(400).json(new error_response_1.default(err));
                }
                else if (!result) {
                    res
                        .status(401)
                        .json(new error_response_1.default("Username or password is incorrect"));
                }
                else {
                    const payload = {
                        username: foundUser.username,
                        role: foundUser.role,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                    });
                    res.status(200).json(new success_response_1.default("logged in", token));
                }
            });
        }
    });
});
router.get("/refresh", isAuthenticated_1.default, (req, res) => {
    var _a, _b, _c;
    res.clearCookie("token");
    let payload = {
        name: (_a = req.user) === null || _a === void 0 ? void 0 : _a.name,
        email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email,
        role: (_c = req.user) === null || _c === void 0 ? void 0 : _c.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.status(200).json(new success_response_1.default("refreshed", token));
});
exports.default = router;
