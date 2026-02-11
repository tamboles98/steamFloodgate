export type Config = {
  backendUrl: string;
};

export const config: Config = { backendUrl: import.meta.env.VITE_BACKEND_URL };
export default config;
