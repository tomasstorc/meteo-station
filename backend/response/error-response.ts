import { CallbackError } from "mongoose";

export default class ErrorResponse {
  private status;
  private errorMsg;

  constructor(errorMsg: string | Error | CallbackError) {
    this.status = "error";
    this.errorMsg = errorMsg;
  }
}
