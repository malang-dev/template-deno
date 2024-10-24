import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class UnprocessableEntityException extends BaseException {
  constructor(message: string) {
    super("UNPROCESSABLE_ENTITY", message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
