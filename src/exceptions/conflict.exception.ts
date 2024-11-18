import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class ConflictException extends BaseException {
  constructor(message: string) {
    super("CONFLICT", message, StatusCodes.CONFLICT);
  }
}
