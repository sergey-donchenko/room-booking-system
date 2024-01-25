import { DatabaseType } from "typeorm"
import { Module } from "@nestjs/common"
import { DatabaseConfigModule } from "../../../config/database/config.module"
import { DatabaseConfigService } from "../../../config/database/config.service"

import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions
} from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfigService: DatabaseConfigService) => {
        const params: any = {
          logging: databaseConfigService.logging,
          entities: databaseConfigService.entities,
          migrations: databaseConfigService.migrations,
          type: databaseConfigService.type as DatabaseType,
          autoLoadEntities: databaseConfigService.autoLoadEntities,
          synchronize: databaseConfigService.synchronize,
          migrationsRun: false,
          extra: {}
        };

        if (databaseConfigService.useSSLMode === true) {
          params.extra.ssl = {
            require: true,
            rejectUnauthorized: false
          }
        }

        if (databaseConfigService.url) {
          return {
            ...params,
            url: databaseConfigService.url,
          };
        }

        return {
          ...params,
          host: databaseConfigService.host,
          port: databaseConfigService.port,
          database: databaseConfigService.name,
          entities: databaseConfigService.entities,
          password: databaseConfigService.password,
          username: databaseConfigService.username
        };
      },
      inject: [DatabaseConfigService],
    } as TypeOrmModuleAsyncOptions),
  ]
})
export class PostgresDatabaseProviderModule {}
