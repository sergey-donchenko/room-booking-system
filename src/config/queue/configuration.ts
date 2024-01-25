import { registerAs } from "@nestjs/config"

export default registerAs('queue', () => ({
  host: process.env.QUEUE_PROVIDER_HOST,
  port: process.env.QUEUE_PROVIDER_PORT,
  username: process.env.QUEUE_PROVIDER_USER,
  password: process.env.QUEUE_PROVIDER_PASSWORD
}));
