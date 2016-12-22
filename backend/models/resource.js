'use strict';

module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    icon: DataTypes.STRING,
    rarity: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Resource;
};