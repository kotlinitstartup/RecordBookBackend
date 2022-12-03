import { ModelStatic, Sequelize, Op, ModelCtor, DataTypes } from "sequelize";
import fs from "fs";
import path from "path";
import { Student, StudentAttributes } from "./Student";

const { env } = process;
const config = {
  username: "root",
  password: "password",
  database: "records",
  host: "8.210.33.51",
  port: 5432,
  dialect: "postgres",
  logging: false,
  logQueryParameters: true,
  dialectOptions: { decimalNumbers: true },
  seederStorage: "sequelize",
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  //@ts-ignore
  {
    ...config,
  }
);

export type Models = {
  Student?: ModelCtor<Student>;
};

// @ts-ignore TODO:
const models: Models = {};

[require("./Student")].forEach(({ default: mdl }) => {
  const model = mdl(sequelize, DataTypes);
  // @ts-ignore TODO:
  models[model.name] = model;
});

// WARN: В тестах с БД делается sync({force : true }) для очистки бд, два запущенных синка -> падение тестов
// sequelize.sync({ alter: true }).then(() => console.log('finish'));
// @ts-ignore Потому что ради одного раза не буду расширять тайпинги
Object.values(models).forEach((mdl) => mdl?.associate?.(models));

sequelize.sync();

export { models, sequelize, Sequelize };
