import { ResponseFormat } from "@/utils/response.ts";
import { StatusCodes } from "@/utils/status.ts";
import { type Context, Handler } from "@hono/hono";

const getHello: Handler = (ctx: Context<Environment>) => {
  const responseFormat = new ResponseFormat(ctx);
  const { parameter } = ctx.req.param();
  const sampleData = { hello: parameter, timestamp: new Date() };
  return responseFormat.json(sampleData, StatusCodes.OK);
};

export const HelloController = {
  getHello,
};
