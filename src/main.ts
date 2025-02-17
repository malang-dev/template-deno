import { demo } from "@/middlewares/demo.middleware.ts";
import { errorHandler, notFoundHandler } from "@/middlewares/error.middleware.ts";
import { loggerMiddleware } from "@/middlewares/logger.middleware.ts";
import { DefaultRoute } from "@/routes/base.route.ts";
import { swaggerUI } from "@hono/swagger-ui";
import "@std/dotenv/load";
import { existsSync } from "@std/fs";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "hono/serve-static";

const app = new Hono<Environment>();
const isDemo = Deno.env.get("DENO_ENV") == "demo";

// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use("*", contextStorage(), loggerMiddleware());

// is demo ?
app.use("/api/*", demo({ enable: isDemo }));

// serve static files and swagger ui
app.use(
  "/static/*",
  serveStatic({
    root: "./",
    getContent: async (path) => {
      path = !existsSync(path) ? "static/index.html" : path;
      return await Deno.readFile(path);
    },
  }),
);
app.get(
  "/",
  swaggerUI({
    url: "/static/openapi.yaml",
  }),
);

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});

export default app;
