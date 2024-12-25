import {
  BaseHandler,
  type BaseHandlerOptions,
  ConsoleHandler,
  type LevelName,
  setup as LoggerSetup,
} from "@std/log";
import { getContext } from "hono/context-storage";
import { getConnInfo } from "hono/deno";
import Rollbar from "rollbar";

type RollbarHandlerOptions = BaseHandlerOptions & Rollbar.Configuration;

export class RollbarHandler extends BaseHandler {
  private rollbar: Rollbar;

  // Mapping @std/log level to rollbar level
  private logLevel: Map<LevelName, Rollbar.Level> = new Map([
    ["NOTSET", "info"],
    ["DEBUG", "debug"],
    ["INFO", "info"],
    ["WARN", "warning"],
    ["ERROR", "error"],
    ["CRITICAL", "critical"],
  ]);

  constructor(levelName: LevelName, options: RollbarHandlerOptions = {}) {
    super(levelName, options);
    // init rollbar
    this.rollbar = new Rollbar({
      ...options,
      captureUncaught: true,
      captureUnhandledRejections: true,
    });
  }

  log(msg: string): void {
    this.rollbar[this.logLevel.get(this.levelName)](msg);
  }
}

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
