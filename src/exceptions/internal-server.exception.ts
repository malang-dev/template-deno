import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class InternalServerErrorException extends BaseException {
  constructor(message?: string) {
    super(
      "INTERNAL_SERVER_ERROR",
      message ?? "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
