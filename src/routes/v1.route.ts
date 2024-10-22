import { Hono } from "@hono/hono";
import { HelloController } from "../controllers/hello.controller.ts";

const route = new Hono();

// Add the route
route.get("/hello/:parameter", HelloController.getHello);
export const V1Route = route;
