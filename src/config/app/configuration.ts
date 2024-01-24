import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
  url: process.env.APP_URL,
  port: process.env.PORT || process.env.APP_PORT,
  jwt_secret: process.env.APP_JWT_SECRET,
  viewTemplate: process.env.APP_VIEW_TEMPLATE,
  jwt_expires_in: process.env.APP_JWT_EXPIRES_IN,
  admin_emails: process.env.APP_ADMIN_EMAILS,
  recovery_url: process.env.APP_RECOVERY_URL,
  recovery_expiration: process.env.APP_RECOVERY_EXPIRATION,
  system_version: process.env.npm_package_version,
}));
