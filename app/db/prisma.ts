import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Sets up WebSocket connections for Neon
neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

// Creates a connection pool
const pool = new Pool({ connectionString });

// Creates the Neon adapter for Prisma
const adapter = new PrismaNeon(pool);

// Instantiates PrismaClient WITH the adapter
export const prisma = new PrismaClient({ adapter });
