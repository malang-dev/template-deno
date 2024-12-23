import { RollbarHandler } from "@/utils/rollbar.ts";
import { ConsoleHandler, getLogger, setup as LoggerSetup } from "@std/log";
import { generate } from "@std/uuid/unstable-v7";
import { type Context, MiddlewareHandler } from "hono";

LoggerSetup({
  handlers: {
    rollbar: new RollbarHandler("NOTSET", {
      enabled: Deno.env.get("ENABLE_ROLLBAR") === "true",
      environment: Deno.env.get("DENO_ENV"),
      accessToken: Deno.env.get("ROLLBAR_ACCESS_TOKEN"),
      formatter: (record) => record.msg,
    }),
    console: new ConsoleHandler("NOTSET", {
      useColors: true,
      formatter: (record) => {
        const [reqId] = record.args as any[];
        const date = record.datetime.toISOString();
        const name = record.loggerName;

        let message = `${date} [${name}] [${reqId}] [${record.levelName}] -- ${record.msg}`;
        if (record.loggerName !== "http") {
          record.args.forEach((arg, index) => {
            message += ` arg${index}: ` + JSON.stringify(arg);
          });
        }
        return message;
      },
    }),
  },
  loggers: {
    default: {
      level: "WARN",
      handlers: ["console", "rollbar"],
    },
    http: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

export const logger = (): MiddlewareHandler => {
  const onRequestData = (ctx: Context): any => {
    return {
      url: ctx.req.path,
      method: ctx.req.method,
    };
  };

  const onResponseData = (ctx: Context): any => {
    return {
      status: ctx.res.status,
      headers: ctx.res.headers,
    };
  };

  return async function createMiddleware(ctx, next) {
    const reqId = generate();
    ctx.set("requestId", reqId);
    ctx.header("x-request-id", reqId);

    const log = getLogger("http");
    const req = onRequestData(ctx);
    log.info(`Request starting: ${req.method} ${req.url}`, reqId, req);

    await next();

    const res = onResponseData(ctx);
    log.info(`Request complete: ${req.method} ${req.url} ${res.status}`, reqId, req, res);
  };
};
