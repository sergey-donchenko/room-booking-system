import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  provider: process.env.MAIL_PROVIDER,
  key: process.env.MAIL_KEY,
  secret: process.env.MAIL_SECRET,
  domain: process.env.MAIL_DOMAIN,
  from: process.env.MAIL_SEND_FROM,
  from_email: process.env.MAIL_SEND_FROM_EMAIL,
  from_name: process.env.MAIL_SEND_FROM_NAME,
}));
