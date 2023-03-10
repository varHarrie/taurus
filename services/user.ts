import db from "@/prisma/db.ts";

type LoginDTO = {
  email: string;
  password: string;
};

type RegisterDTO = {
  email: string;
  password: string;
};

export async function register(dto: RegisterDTO) {
  const existed = await db.user.findUnique({
    where: { email: dto.email },
  });

  if (existed) {
    throw new Error("Email already exists");
  }

  const user = await db.user.create({
    data: {
      email: dto.email,
      password: dto.password,
      username: "",
    },
    select: {
      email: true,
    },
  });

  return user;
}

export async function login(dto: LoginDTO) {
  const user = await db.user.findFirst({
    where: { email: dto.email, password: dto.password },
  });

  return user;
}
