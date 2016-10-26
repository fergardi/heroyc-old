'use strict';

module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
    name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Resource;
};