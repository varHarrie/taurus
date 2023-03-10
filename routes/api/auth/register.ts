import { Handlers } from "$fresh/server.ts";
import { z } from "zod/mod.ts";
import { register } from "@/services/user.ts";
import { validateBody } from "@/libs/validate.ts";

const RegisterFormVO = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const handler: Handlers = {
  async POST(req: Request) {
    const vo = await validateBody(req, RegisterFormVO);
    const user = await register(vo);
    return new Response(JSON.stringify(user));
  },
};
