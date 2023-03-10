import { z, ZodRawShape } from "zod/mod.ts";

export async function validateBody<T extends ZodRawShape>(
  req: Request,
  schema: z.ZodObject<T>
) {
  const body = await req.json();
  return schema.parse(body);
}
