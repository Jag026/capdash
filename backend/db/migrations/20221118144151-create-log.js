"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asset_a: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      asset_b: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      asset_a_price: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      asset_b_price: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      asset_a_marketcap: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      asset_b_marketcap: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Logs");
  }
};