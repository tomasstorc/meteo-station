"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuccessResponse {
    constructor(status, data) {
        this.status = status;
        this.data = data || [];
        this.errors = [];
    }
}
exports.default = SuccessResponse;
