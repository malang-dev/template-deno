import { V1Route } from "@/routes/v1.route.ts";

const defaultRoutes = [
  {
    path: `/api/v1`,
    route: V1Route,
  },
];
export const DefaultRoute = defaultRoutes;
