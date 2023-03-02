"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const success_response_1 = __importDefault(require("../response/success-response"));
const router = express_1.default.Router();
router.post("/", isAuthenticated_1.default, (req, res) => {
    return res.json(new success_response_1.default("ok", req.body));
});
exports.default = router;
