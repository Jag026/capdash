'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {

    toSafeObject() {
      const { id, userId, asset_a, asset_b, asset_a_price, asset_b_price, asset_a_marketcap, asset_b_marketcap } = this; // context will be the User instance
      return { id, userId, asset_a, asset_b, asset_a_price, asset_b_price, asset_a_marketcap, asset_b_marketcap };
    }

    static getCurrentLogById(id) {
      return Log.scope("currentLog").findByPk(id);
    }

    static async addLog({ userId, asset_a, asset_b, asset_a_price, asset_b_price, asset_a_marketcap, asset_b_marketcap, }) {

      const log = await Log.create({
        userId: userId,
        asset_a,
        asset_b,
        asset_a_price,
        asset_b_price,
        asset_a_marketcap,
        asset_b_marketcap,
      });
      return await Log.scope('currentLog').findByPk(log.id);
    }

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
        type: DataTypes.INTEGER
      },
      asset_a: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_b: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_a_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_b_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_a_marketcap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asset_b_marketcap: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Log",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentLog: {
        },
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