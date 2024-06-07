import { Handler, StatusCodes } from "../../deps.ts";
import { ResponseFormat } from "../utils/api-response.ts";

const getHello: Handler = (c) => {
  const responseFormat = new ResponseFormat(c);
  const { parameter } = c.req.param();

  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(
      {
        hello: parameter,
      },
      StatusCodes.OK
    );
};

export const HelloController = {
  getHello,
};
