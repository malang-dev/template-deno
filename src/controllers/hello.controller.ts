import { Context, Handler, StatusCodes } from "../../deps.ts";
import { ResponseFormat } from "../utils/api-response.ts";

const getHello: Handler = (c: Context<Environment>) => {
  const responseFormat = new ResponseFormat(c);
  const { parameter } = c.req.param();

  const ipAddress = c.env.remoteAddr();
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(
      {
        hello: parameter,
        ip: ipAddress,
      },
      StatusCodes.OK
    );
};

export const HelloController = {
  getHello,
};
