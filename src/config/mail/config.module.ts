import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MailConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide mail configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_PROVIDER: Joi.string().allow(null, '').default('mailgun'),
        MAIL_KEY: Joi.string().allow(null, '').default('key'),
        MAIL_SECRET: Joi.string().allow(null, '').optional(),
        MAIL_DOMAIN: Joi.string().allow(null, '').default('localhost'),
        MAIL_SEND_FROM: Joi.string().allow(null, '').default('Excited User <me@example.org>'),
        MAIL_SEND_FROM_EMAIL: Joi.string().allow(null, '').default('me@example.org'),
        MAIL_SEND_FROM_NAME: Joi.string().allow(null, '').default('Excited User'),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [ConfigService, MailConfigService],
})
export class MailConfigModule {}
