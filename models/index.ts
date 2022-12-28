import { DataTypes, ModelCtor, Sequelize } from 'sequelize';
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

const sequelizeConfig = require('../config/sequelizeConfig');

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
  require('./RecordBook'),
  require('./Semester'),
  require('./Credit'),
  require('./CreditStatuses'),
  require('./Exam'),
  require('./Faculty'),
  require('./Group'),
  require('./Speciality'),
  require('./Student'),
  require('./Subject'),
  require('./Teacher'),
].forEach(({ default: mdl }) => {
  const model = mdl(sequelize, DataTypes);
  models[model.name] = model;
});

// @ts-ignore Потому что ради одного раза не буду расширять тайпинги
Object.values(models).forEach((mdl) => mdl?.associate?.(models));

sequelize.sync({ alter: true });

export { models, sequelize, Sequelize };
