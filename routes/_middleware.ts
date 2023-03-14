import { MiddlewareHandler } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";

export const handler: MiddlewareHandler = (req, ctx) => {
  if (req.headers.has("Cookie")) {
    const cookies = getCookies(req.headers);
    const token = cookies["token"];

    if (token) {
      try {
        ctx.state.user = JSON.parse(atob(token));
      } catch {
        ctx.state.user = undefined;
      }
    }
  }

  return ctx.next();
};
