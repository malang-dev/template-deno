import { StatusCodes } from "status-code";
import { BaseException } from "@src/exceptions/base.exception.ts";

export class ServiceUnavailableException extends BaseException {
  constructor(message: string, name?: string) {
    super(
      name ?? "SERVICE_UNAVAILABLE",
      message,
      StatusCodes.SERVICE_UNAVAILABLE,
    );
  }
}
