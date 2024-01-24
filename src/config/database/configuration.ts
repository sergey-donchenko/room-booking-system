import { join } from "path"
import { registerAs } from "@nestjs/config"

// Path to the migration directory
const entitiesDir = `${__dirname}/../../modules/`
const seedsDir = `${__dirname}/../../database/seeds`
const factoriesDir = `${__dirname}/../../database/factories`
const migrationsDir = `${__dirname}/../../database/migrations`

export default registerAs('database', () => ({
  loading: true,
  type: 'postgres',
  synchronize: false,
  logging: 'all',
  autoLoadEntities: false,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  url: process.env.DATABASE_URL,
  use_ssl: process.env.DATABASE_USE_SSL,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  entities: [join(entitiesDir, '**', '*.entity.{ts,js}')],
  migrations: [`${migrationsDir}/*{.ts,.js}`],
  seeds: [`${seedsDir}/**/*{.ts,.js}`],
  factories: [`${factoriesDir}/**/*{.ts,.js}`],
  cli: {
    migrationsDir,
  },
}));
