// env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ASAAS_API_KEY: z.string().min(1),
    ASAAS_API_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_ASAAS_ENV: z.enum(["production", "sandbox"]),
  },
  runtimeEnv: {
    ASAAS_API_KEY: process.env.ASAAS_API_KEY,
    ASAAS_API_URL: process.env.ASAAS_API_URL,
    NEXT_PUBLIC_ASAAS_ENV: process.env.NEXT_PUBLIC_ASAAS_ENV,
  },
});