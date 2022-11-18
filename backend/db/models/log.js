'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      // define association here
    }
  };
  
  Log.init(
    {
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
      }
    }
  );
  Log.associate = function (models) {
    Log.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  };
  return Log;
};