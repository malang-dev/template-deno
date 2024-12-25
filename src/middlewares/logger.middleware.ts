import { RollbarHandler } from "@/utils/logger.ts";
import { ConsoleHandler, getLogger, setup as LoggerSetup } from "@std/log";
import { generate } from "@std/uuid/unstable-v7";
import { type Context, MiddlewareHandler } from "hono";
import { getContext } from "hono/context-storage";
import { getConnInfo } from "hono/deno";

LoggerSetup({
  handlers: {
    rollbar: new RollbarHandler("WARN", {
      enabled: Deno.env.get("ENABLE_ROLLBAR") === "true",
      environment: Deno.env.get("DENO_ENV"),
      accessToken: Deno.env.get("ROLLBAR_ACCESS_TOKEN"),
      formatter: (record) => record.msg,
    }),
    console: new ConsoleHandler("NOTSET", {
      useColors: true,
      formatter: (record) => {
        const ctx = getContext();
        const ips = getConnInfo(ctx).remote.address;
        const req = ctx.get("requestId");

        const date = record.datetime.toISOString();
        const name = record.loggerName;

        const msgs = `${date} [${req}] [${name}] [${ips}] [${record.levelName}] -- ${record.msg}`;
        const args = record.args.map((arg, index) => `arg${index}: ` + JSON.stringify(arg))
          .join(" ");

        return msgs + (name !== "http" ? " " + args : "");
      },
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "rollbar"],
    },
    http: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

export function loggerMiddleware(): MiddlewareHandler {
  const onRequestData = (ctx: Context): any => ({ url: ctx.req.path, method: ctx.req.method });
  const onResponsData = (ctx: Context): any => ({
    status: ctx.res.status,
    headers: ctx.res.headers,
  });
  return async function createMiddleware(ctx, next) {
    const reqId = generate();
    ctx.set("requestId", reqId);
    ctx.header("x-request-id", reqId);

    const log = getLogger("http");
    const req = onRequestData(ctx);
    log.info(`Request starting: ${req.method} ${req.url}`);

    await next();

    const res = onResponsData(ctx);
    log.info(`Request complete: ${req.method} ${req.url} ${res.status}`);
  };
}
