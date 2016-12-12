'use strict';

module.exports = function(sequelize, DataTypes) {
  var Pack = sequelize.define('Pack', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    rarity: DataTypes.STRING,
    platinum: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    euro: DataTypes.FLOAT
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Pack;
};