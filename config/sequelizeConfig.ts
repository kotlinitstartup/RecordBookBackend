import { Options } from 'sequelize';

const { env } = process;
export default {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: 5432,
  logging: false,
  dialect: 'postgres',
  dialectOptions: { decimalNumbers: true },
  seederStorage: 'sequelize',
  pool: {
    max: 30,
    acquire: 60000,
  },
} as Options;
