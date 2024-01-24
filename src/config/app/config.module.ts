import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_DESCRIPTION: Joi.string().default('MyApp description'),
        APP_VERSION: Joi.string().default('1.0'),
        APP_ADMIN_EMAILS: Joi.string().default('info@vikingdrivingschool.com'),
        APP_RECOVERY_URL: Joi.string().default('/users/confirm'),
        APP_RECOVERY_EXPIRATION: Joi.number().default(30),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost:9000'),
        APP_VIEW_TEMPLATE: Joi.string().default('views'),
        APP_PORT: Joi.number().default(9000),
        APP_JWT_SECRET: Joi.string().default('Application JWT Secret'),
        APP_JWT_EXPIRES_IN: Joi.string().default('10m'),
        npm_package_version: Joi.string().default('1.0'),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
