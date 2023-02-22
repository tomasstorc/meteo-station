"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = __importDefault(require("./controller/user-controller"));
const data_controller_1 = __importDefault(require("./controller/data-controller"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", user_controller_1.default);
app.use("/api/data", data_controller_1.default);
app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
