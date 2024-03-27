import { env } from "./src/env";

/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./src/schema.ts",
  out: "./drizzle/",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
};
