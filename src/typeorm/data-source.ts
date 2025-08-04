require('dotenv').config()

import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { ENTITIES } from './entities'
// IMPORTA TUS ENTIDADES AQUÍ cuando las tengas
// import { Event } from './entities/Event'

// *** Recuerda crea la db en la bbdd sino en la conexión te dará error ***
const {
  SQL_SERVER_HOST,
  SQL_SERVER_USER,
  SQL_SERVER_PASSWORD,
  SQL_SERVER_DATABASE,
  TYPEORM_SYNCHRONIZE,
  TYPEORM_DROPSCHEMA,
} = process.env

const common: Partial<DataSourceOptions> = {
  logging: true,
  entities: ENTITIES,
  subscribers: [],
  migrations: [__dirname + '/migrations/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: TYPEORM_SYNCHRONIZE === 'yes',
  dropSchema: TYPEORM_DROPSCHEMA === 'yes',
  migrationsRun: TYPEORM_SYNCHRONIZE === 'yes' ? false : true,
}

/** MySQL */
const MySQLSource: DataSourceOptions = {
  ...common,
  type: 'mysql',
  host: SQL_SERVER_HOST,
  port: 3306,
  username: SQL_SERVER_USER,
  password: SQL_SERVER_PASSWORD,
  database: SQL_SERVER_DATABASE,
} as DataSourceOptions

/** MS SQL Server */
const MSSQLSource: DataSourceOptions = {
  ...common,
  type: 'mssql',
  host: SQL_SERVER_HOST,
  port: 1433,
  username: SQL_SERVER_USER,
  password: SQL_SERVER_PASSWORD,
  database: SQL_SERVER_DATABASE,
  options: { trustServerCertificate: true },
} as DataSourceOptions

/** PostgreSQL */
const PostgreSQLSource: DataSourceOptions = {
  ...common,
  type: 'postgres',
  host: SQL_SERVER_HOST,
  port: 5432,
  username: SQL_SERVER_USER,
  password: SQL_SERVER_PASSWORD,
  database: SQL_SERVER_DATABASE,
} as DataSourceOptions

// ⬇️ Exportas las 3 instancias y eliges la que quieras en index.ts
export const MySQLDataSource = new DataSource(MySQLSource)
export const MSSQLDataSource = new DataSource(MSSQLSource)
export const PostgresDataSource = new DataSource(PostgreSQLSource)

// Opcional: mapa por si te interesa resolver por nombre
export const DataSources = {
  mysql: MySQLDataSource,
  mssql: MSSQLDataSource,
  postgres: PostgresDataSource,
}
