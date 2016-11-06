'use strict';

module.exports = function(sequelize, DataTypes) {
  var Quest = sequelize.define('Quest', {
    name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Quest;
};