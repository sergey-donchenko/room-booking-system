import { registerAs } from "@nestjs/config"

export default registerAs('cache', () => ({
  host: process.env.CACHE_PROVIDER_HOST,
  port: process.env.CACHE_PROVIDER_PORT,
  username: process.env.CACHE_PROVIDER_USER,
  password: process.env.CACHE_PROVIDER_PASSWORD
}));
