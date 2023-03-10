import { Handlers } from "$fresh/server.ts";
import { z } from "zod/mod.ts";
import { validateBody } from "@/libs/validate.ts";
import { login } from "@/services/user.ts";

const LoginFormVO = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const handler: Handlers = {
  async POST(req: Request) {
    const vo = await validateBody(req, LoginFormVO);
    const user = await login(vo);
    return new Response(JSON.stringify(user));
  },
};
