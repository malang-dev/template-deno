import { BaseHandler, type BaseHandlerOptions, type LevelName } from "@std/log";
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
