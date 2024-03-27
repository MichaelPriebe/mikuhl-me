import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

export const env = z
  .object({
    TURSO_DATABASE_URL: z.string().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
  })
  .parse(process.env);
