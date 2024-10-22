import { Hono } from "@hono/hono";
import { HelloController } from "@src/controllers/hello.controller.ts";

const route = new Hono();

// Add the route
route.get("/hello/:parameter", HelloController.getHello);
export const V1Route = route;
