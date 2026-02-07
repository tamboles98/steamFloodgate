import { z } from "zod";

const envSchema = z.object({
  STEAM_KEY: z.string().brand("SteamApiKey"),
});

export type Config = z.infer<typeof envSchema>;

export const config: Config = envSchema.parse(process.env);
export default config;
