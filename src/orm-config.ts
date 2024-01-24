import { ConfigModule } from "@nestjs/config"
import { strToBool } from "./utils/transformation.util"
import dbConfiguration from "./config/database/configuration"

import {
  DatabaseType,
  DataSource,
  DataSourceOptions
} from "typeorm"

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

// Generate the configuration output
const config = dbConfiguration();
const params: any = {
  logging: config.logging,
  entities: config.entities,
  migrations: config.migrations,
  seeds: config.seeds,
  factories: config.factories,
  cli: config.cli,
  type: config.type as DatabaseType,
  autoLoadEntities: config.autoLoadEntities,
  synchronize: config.synchronize,
  migrationsRun: false,
  extra: {}
};

if (strToBool(config?.use_ssl)) {
  params.extra.ssl = {
    require: true,
    rejectUnauthorized: false
  }
}

if (config.url) {
  params.url = config.url
} else {
  params.host = config.host
  params.port = config.port
  params.database = config.database
  params.password = config.password
  params.username = config.username
}

export const connectionSource = new DataSource(params as DataSourceOptions);

export default params;
