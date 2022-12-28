const { models } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.CreditStatuses.bulkCreate([
      {
        alias: 'ok',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
