"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    constructor(errorMsg) {
        this.status = "error";
        this.errorMsg = errorMsg;
    }
}
exports.default = ErrorResponse;
