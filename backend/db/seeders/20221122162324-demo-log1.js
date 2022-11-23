'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logs', [
      {
        userId: 1,
        asset_a: 'SHTY',
        asset_b: 'XYZ',
        asset_a_price: '100',
        asset_b_price: '500',
        asset_a_marketcap: '10000',
        asset_b_marketcap: '5000000',
      },
      {
        userId: 1,
        asset_a: 'AA',
        asset_b: 'ZZZ',
        asset_a_price: '2312',
        asset_b_price: '1424124',
        asset_a_marketcap: '214124124',
        asset_b_marketcap: '2141241241241414',
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Logs', {
      asset_a: { [Op.in]: ['SHTY', 'AA'] }
    }, {});
  }
};