import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class ServiceUnavailableException extends BaseException {
  constructor(message: string, name?: string) {
    super(
      name ?? "SERVICE_UNAVAILABLE",
      message,
      StatusCodes.SERVICE_UNAVAILABLE,
    );
  }
}
