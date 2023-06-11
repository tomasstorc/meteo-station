"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_connect_1 = __importDefault(require("./utils/db-connect"));
const morgan_1 = __importDefault(require("./middleware/morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const user_controller_1 = __importDefault(require("./controller/user-controller"));
const data_controller_1 = __importDefault(require("./controller/data-controller"));
const auth_controller_1 = __importDefault(require("./controller/auth-controller"));
const device_controller_1 = __importDefault(require("./controller/device-controller"));
const key_controller_1 = __importDefault(require("./controller/key-controller"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(morgan_1.default);
app.use("/api/user", user_controller_1.default);
app.use("/api/data", data_controller_1.default);
app.use("/api/device", device_controller_1.default);
app.use("/api/auth", auth_controller_1.default);
app.use("/api/key", key_controller_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/public/index.html"));
});
(0, db_connect_1.default)();
// if (process.env.NODE_ENV !== "production") dbSeed();
app.listen(port, () => {
    logger_1.default.info(`server running at port ${port}`);
});
