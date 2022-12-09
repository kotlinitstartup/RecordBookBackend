import fs from 'fs';
import path from 'path';
import { DataTypes, ModelCtor, Sequelize } from 'sequelize';
import { Options } from 'sequelize/types/sequelize';
import { Faculty } from './Faculty';
import { Group } from './Group';
import { Speciality } from './Speciality';
import { Student } from './Student';
import { Subject } from './Subject';
import { Teacher } from './Teacher';

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
  Student?: ModelCtor<Student>;
  Speciality?: ModelCtor<Speciality>;
  Teacher?: ModelCtor<Teacher>;
  Subject?: ModelCtor<Subject>;
  Faculty?: ModelCtor<Faculty>;
  Group?: ModelCtor<Group>;
};

// @ts-ignore TODO:
const models: Models = {};

if (typeof require.context === 'undefined') {
  // @ts-ignore TODO:
  require.context = (
    base = '.',
    scanSubDirectories = false,
    regularExpression = /\.ts$/,
  ) => {
    const files = {};

    //@ts-ignore TODO:
    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file);
        console.log('fullPath', fullPath);
        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);
          return;
        }
        console.log(
          'regularExpression.test(fullPath)',
          regularExpression.test(fullPath),
        );
        if (!regularExpression.test(fullPath)) return;
        //@ts-ignore TODO:
        files[fullPath] = true;
      });
    }
    readDirectory(path.resolve(__dirname, base));

    //@ts-ignore TODO:
    const Module = (file) => require(file);
    Module.keys = () => Object.keys(files);
    return Module;
  };
}

const importModels = (r: ReturnType<typeof require.context>) => {
  const keys = r.keys();

  const validKeys = keys.filter((filename) => !filename.includes('index.ts'));

  validKeys.forEach((filename) => {
    const modelInit = r(filename).default;
    const model = modelInit(sequelize, DataTypes);

    // @ts-ignore TODO:
    models[model.name] = model;
  });
};

// Import all the models from the require context
importModels(
  require.context('./', true, /^(?!.*(\.spec)\.ts$).*(?:\.(js|ts))$/),
);

Object.keys(models).forEach((modelName) => {
  //@ts-ignore TODO:
  if (models[modelName].associate) {
    //@ts-ignore TODO:
    models[modelName].associate(models);
  }
});

sequelize.sync();
// sequelize.sync({ force: true });

export { models, sequelize, Sequelize };
