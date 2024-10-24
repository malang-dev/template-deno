import { HelloController } from "@/controllers/hello.controller.ts";
import { Hono } from "@hono/hono";

const route = new Hono();

// Add the route
route.get("/hello/:parameter", HelloController.getHello);
export const V1Route = route;
