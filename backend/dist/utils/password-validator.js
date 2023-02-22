"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_validator_1 = __importDefault(require("password-validator"));
const validatePassword = (password) => {
    let schema = new password_validator_1.default();
    schema
        .is()
        .min(6, "password must be atleast 6 characters long")
        .has()
        .uppercase(1, "password must contain atleast one upper case letter")
        .has()
        .lowercase(1, "password must contain atleast one lower case letter");
    return schema.validate(password);
};
exports.default = validatePassword;
