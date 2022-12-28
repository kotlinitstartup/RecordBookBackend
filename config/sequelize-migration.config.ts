import config from './sequelizeConfig';

const { env } = process;
const seqConfig = {
  [env.NODE_ENV || 'development']: config,
};
console.log(seqConfig);

export default seqConfig;

// sequelize не нравится дефолтный экспорт
module.exports = seqConfig;
