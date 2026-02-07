import { z } from "zod";

const envSchema = z.object({
  STEAM_KEY: z.string().brand("SteamApiKey"),
  STEAM_USER_ID: z.string().brand("SteamUserId"),
});

export type Config = z.infer<typeof envSchema>;

export const config: Config = envSchema.parse(process.env);
export default config;
