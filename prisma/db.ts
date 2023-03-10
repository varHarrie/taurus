import { createRequire } from "https://deno.land/std@0.177.0/node/module.ts";
import type { PrismaClient as PrismaClientType } from "./client/index.d.ts";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("./client");

const db = new PrismaClient() as PrismaClientType;

export default db;
