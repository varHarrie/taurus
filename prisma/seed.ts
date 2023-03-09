import { createRequire } from "https://deno.land/std@0.177.0/node/module.ts";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("./client");

const prisma = new PrismaClient();

const logsData = [
  {
    level: "Info",
    message: "Hello World",
    meta: { foo: "bar" },
  },
];

for (const data of logsData) {
  const log = await prisma.log.create({ data });
  console.log(`Created log with id: ${log.id}`);
}

console.log(`Seeding finished.`);

await prisma.$disconnect();
