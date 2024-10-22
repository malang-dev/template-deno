import { notFoundHandler } from "./middlewares/error.middleware.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";
import { DefaultRoute } from "./routes/base.route.ts";
import { demo } from "./middlewares/demo.middleware.ts";
import { parseClientIp } from "./utils/parse-client-ip.ts";
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { prettyJSON } from "@hono/hono/pretty-json";
import { serveStatic } from "@hono/hono/serve-static";
import { existsSync } from "@std/fs";
import { loadSync } from "@std/dotenv";
import { swaggerUI } from "@hono/swagger-ui";

const app = new Hono<Environment>();
const cwd = Deno.cwd();

// environment variables
const env = loadSync({
  export: true,
});

// middleware
app.use("*", cors());
app.use("*", prettyJSON());
app.use("/api/*", demo({ enable: env.DENO_ENV == "demo" }));
app.use(
  "/static/*",
  serveStatic({
    root: "./",
    getContent: async (path) => {
      path = !existsSync(path) ? "static/index.html" : path;
      return await Deno.readFile(path);
    },
  })
);
app.get(
  "/",
  swaggerUI({
    url: "/static/openapi.yaml",
  })
);

// errors handler
app.onError(errorHandler);
app.notFound(notFoundHandler);

DefaultRoute.forEach((route) => {
  app.route(`${route.path}`, route.route);
});

// run server
Deno.serve({ port: 3000 }, (request, handler) => {
  const remoteAddr = () => parseClientIp(request, handler);
  return app.fetch(request, { ...env, remoteAddr });
});
console.log(`Running on directory ${cwd}`);
