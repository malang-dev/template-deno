import { BaseException } from "@/exceptions/base.exception.ts";
import { StatusCodes } from "@/utils/status.ts";

export class NotFoundException extends BaseException {
  constructor(message?: string, name?: string) {
    super(name ?? "NOT_FOUND", message ?? "Not Found", StatusCodes.NOT_FOUND);
  }
}
