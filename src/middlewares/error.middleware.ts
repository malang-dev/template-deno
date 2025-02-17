import { BadRequestException } from "@/exceptions/bad-request.exception.ts";
import { BaseException } from "@/exceptions/base.exception.ts";
import { InternalServerErrorException } from "@/exceptions/internal-server.exception.ts";
import { NotFoundException } from "@/exceptions/not-found.exception.ts";
import { IExceptionMessage, ResponseFormat } from "@/utils/response.ts";
import { StatusCodes } from "@/utils/status.ts";
import { type Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export function errorHandler(err: any, ctx: Context<Environment>) {
  let exception: BaseException;
  const responseFormat = new ResponseFormat<object>(ctx);
  const errors: IExceptionMessage[] = [];

  if (err instanceof ZodError) {
    exception = new BadRequestException();
    err.errors.forEach((x) =>
      errors.push(
        new IExceptionMessage(
          "VALIDATION_ERROR",
          `Value of ${x.path} ~ ${x.message}`,
          exception.stack,
        ),
      )
    );
  } else {
    if (err instanceof BaseException) {
      exception = err;
    } else if (err instanceof HTTPException) {
      const code: string = StatusCodes[err.status];
      exception = new BaseException(code, err.message, err.status);
    } else {
      exception = new InternalServerErrorException(err.message);
    }
    errors.push(
      new IExceptionMessage(exception.codes, exception.message, exception.stack),
    );
  }
  return responseFormat.withErrors(errors).json(null, exception.status);
}

export function notFoundHandler(ctx: Context<Environment>) {
  const responseFormat = new ResponseFormat<object>(ctx);
  const exception: BaseException = new NotFoundException();

  return responseFormat
    .withErrors([
      new IExceptionMessage(
        exception.codes,
        exception.message,
        exception.stack,
      ),
    ])
    .json(null, exception.status);
}
