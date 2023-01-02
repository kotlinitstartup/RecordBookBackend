import { DataTypes, ModelCtor, Options, Sequelize } from 'sequelize';
import type { Credit } from './Credit';
import type { CreditStatuses } from './CreditStatuses';
import type { Exam } from './Exam';
import type { Faculty } from './Faculty';
import type { Group } from './Group';
import { RecordBook } from './RecordBook';
import { Semester } from './Semester';
import type { Speciality } from './Speciality';
import type { Student } from './Student';
import type { Subject } from './Subject';
import type { Teacher } from './Teacher';

const { env } = process;

const sequelizeConfig = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOST,
  port: 5432,
  logging: false,
  dialect: env.DB_TYPE || 'postgres',
  dialectOptions: { decimalNumbers: true },
  seederStorage: 'sequelize',
  pool: {
    max: 30,
    acquire: 60000,
  },
} as Options;

const sequelize = new Sequelize(sequelizeConfig);

export type Models = {
  Student: ModelCtor<Student>;
  Speciality: ModelCtor<Speciality>;
  Teacher: ModelCtor<Teacher>;
  Subject: ModelCtor<Subject>;
  Faculty: ModelCtor<Faculty>;
  Group: ModelCtor<Group>;
  Credit: ModelCtor<Credit>;
  CreditStatuses: ModelCtor<CreditStatuses>;
  Exam: ModelCtor<Exam>;
  Semester: ModelCtor<Semester>;
  RecordBook: ModelCtor<RecordBook>;
};

// @ts-ignore TODO:
const models: Models = {};

[
  require('./Faculty'),
  require('./Speciality'),
  require('./Group'),
  require('./RecordBook'),
  require('./Semester'),
  require('./CreditStatuses'),
  require('./Student'),
  require('./Subject'),
  require('./Teacher'),
  require('./Exam'),
  require('./Credit'),
].forEach(({ default: mdl }) => {
  const model = mdl(sequelize, DataTypes);
  models[model.name] = model;
});

// @ts-ignore Потому что ради одного раза не буду расширять тайпинги
Object.values(models).forEach((mdl) => mdl?.associate?.(models));

sequelize.sync();

export { models, sequelize, Sequelize };
