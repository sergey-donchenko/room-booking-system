import * as Joi from "@hapi/joi"
import { Module } from "@nestjs/common"
import configuration from "./configuration"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { QueueConfigService } from "./config.service"

/**
 * Import and provide queue configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        QUEUE_PROVIDER_HOST: Joi.string().default('localhost'),
        QUEUE_PROVIDER_PORT: Joi.number().default(6379),
        QUEUE_PROVIDER_USER: Joi.string().default('default'),
        QUEUE_PROVIDER_PASSWORD: Joi.string().default('password')
      }),
    }),
  ],
  providers: [ConfigService, QueueConfigService],
  exports: [ConfigService, QueueConfigService],
})
export class QueueConfigModule {}
