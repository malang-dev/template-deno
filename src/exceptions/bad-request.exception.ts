import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class BadRequestException extends BaseException {
  constructor() {
    super("BAD_REQUEST", "Bad Request", StatusCodes.BAD_REQUEST);
  }
}
