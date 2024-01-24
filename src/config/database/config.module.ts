import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide postgres configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_URL: Joi.string().default(null),
        DATABASE_USE_SSL: Joi.boolean().default(true),
        DATABASE_USERNAME: Joi.string().default('root'),
        DATABASE_PASSWORD: Joi.string().default('password'),
        DATABASE_DB_NAME: Joi.string().default('viking_db'),
        DATABASE_PORT: Joi.number().default(5433),
      }),
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
