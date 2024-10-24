import { StatusCodes } from "status-code";
import { BaseException } from "@src/exceptions/base.exception.ts";

export class UnprocessableEntityException extends BaseException {
  constructor(message: string) {
    super("UNPROCESSABLE_ENTITY", message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
