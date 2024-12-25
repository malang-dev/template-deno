import { ResponseFormat } from "@/utils/response.ts";
import { StatusCodes } from "@/utils/status.ts";
import { getLogger } from "@std/log";
import { type Context, Handler } from "hono";
import { getConnInfo } from "hono/deno";

const getHello: Handler = (ctx: Context<Environment>) => {
  const log = getLogger();
  log.debug("HelloController.getHello");

  const responseFormat = new ResponseFormat(ctx);
  const { parameter } = ctx.req.param();
  const sampleData = { hello: parameter, timestamp: new Date(), ip: getConnInfo(ctx) };
  return responseFormat.json(sampleData, StatusCodes.OK);
};

export const HelloController = {
  getHello,
};
