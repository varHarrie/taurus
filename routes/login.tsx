import { Handlers, PageProps } from "$fresh/server.ts";
import { z, ZodError } from "zod/mod.ts";
import { login } from "@/services/user.ts";
import { validateFormData } from "../libs/validate.ts";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

type LoginErrorVo = {
  email?: string;
  password?: string;
  message?: string;
};

export const handler: Handlers = {
  GET: (_req, ctx) => {
    return ctx.render();
  },
  POST: async (req, ctx) => {
    let token = "";

    try {
      const vo = await validateFormData(req, loginFormSchema);
      const user = await login(vo);
      token = btoa(JSON.stringify(user));
    } catch (error) {
      const vo: LoginErrorVo = {};

      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          vo[issue.path[0] as keyof LoginErrorVo] = issue.message;
        });
      } else {
        vo.message = error instanceof Error ? error.message : "Unknown Error";
      }

      return ctx.render(vo);
    }

    const url = new URL(req.url);
    url.pathname = "/";

    const headers = new Headers();
    headers.set("Location", url.toString());
    headers.set("Set-Cookie", `token=${token}; path=/; max-age=86400;`);

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};

export default function Login({ data }: PageProps<LoginErrorVo>) {
  return (
    <form
      method="POST"
      class="mt-20 m-auto p-8 w-[400px] border border-gray-200 rounded-md bg-gray-50"
    >
      <div class="mb-4">
        <label class="mb-2 text-sm">Email</label>
        <input
          class="px-2 block w-full h-8 border border-gray-300 rounded"
          type="text"
          name="email"
        />
        {data?.email && <div class="text-red-500">{data.email}</div>}
      </div>
      <div class="mb-4">
        <label class="mb-2 text-sm">Password</label>
        <input
          class="px-2 block w-full h-8 border border-gray-300 rounded"
          type="password"
          name="password"
        />
        {data?.password && <div class="text-red-500">{data.password}</div>}
      </div>
      {data?.message && <div class="mb-4 text-red-500">{data.message}</div>}
      <button
        class="block w-full h-8 text-white rounded bg-green-400 hover:bg-green-500 active:bg-green-600"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
