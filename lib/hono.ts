import { Hono } from "hono";

import { auth } from "./auth";
import { sessionMiddleware } from "./session-middleware";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({
    message: "Hono running",
  });
});

app.all("/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/me", sessionMiddleware, async (c) => {
  const user = c.get("user");

  return c.json({
    user,
  });
});

export default app;

export type AppType = typeof app;