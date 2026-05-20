import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),

  DB_HOST: z.string(),

  DB_NAME: z.string(),

  DB_USER: z.string(),

  DB_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
