import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { CacheProviderConfigService } from './config.service';
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
        CACHE_PROVIDER_HOST: Joi.string().default('localhost'),
        CACHE_PROVIDER_PORT: Joi.number().default(6379),
        CACHE_PROVIDER_USER: Joi.string().default('default'),
        CACHE_PROVIDER_PASSWORD: Joi.string().default('password')
      }),
    }),
  ],
  providers: [ConfigService, CacheProviderConfigService],
  exports: [ConfigService, CacheProviderConfigService],
})
export class CacheProviderConfigModule {}
