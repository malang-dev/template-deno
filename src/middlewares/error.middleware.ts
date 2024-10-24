import { ZodError } from "zod";
import { StatusCodes } from "status-code";
import type { ErrorHandler, NotFoundHandler } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { BaseException } from "@src/exceptions/base.exception.ts";
import { IExceptionMessage, ResponseFormat } from "@src/utils/api-response.ts";
import { utils } from "@src/utils/utils.ts";
import { BadRequestException } from "@src/exceptions/bad-request.exception.ts";
import { InternalServerErrorException } from "@src/exceptions/internal-server.exception.ts";
import { NotFoundException } from "@src/exceptions/not-found.exception.ts";

export const errorHandler: ErrorHandler = async (err: any, c) => {
  let exception: BaseException;
  const responseFormat = new ResponseFormat<object>(c);
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (c.req.raw.bodyUsed) {
    bodyParse = await c.req.json();
    bodyParse = !utils.isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = c.req.param();
  paramParse = !utils.isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = c.req.query();
  queryParse = !utils.isEmpty(queryParse) ? queryParse : undefined;

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
      const code: string = StatusCodes[err.status as -1];
      exception = new BaseException(code, err.message, err.status);
    } else {
      exception = new InternalServerErrorException(err.message);
    }
    errors.push(
      new IExceptionMessage(exception.codes, exception.message, exception.stack),
    );
  }
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};

export const notFoundHandler: NotFoundHandler = async (c) => {
  const responseFormat = new ResponseFormat<object>(c);
  const exception: BaseException = new NotFoundException();
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (c.req.raw.bodyUsed) {
    bodyParse = await c.req.json();
    bodyParse = !utils.isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = c.req.param();
  paramParse = !utils.isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = c.req.query();
  queryParse = !utils.isEmpty(queryParse) ? queryParse : undefined;

  errors.push(
    new IExceptionMessage(exception.codes, exception.message, exception.stack),
  );
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};
