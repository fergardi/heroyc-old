'use strict';

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    vitality: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    freeze: DataTypes.BOOLEAN,
    burn: DataTypes.BOOLEAN,
    poison: DataTypes.BOOLEAN,
    shock: DataTypes.BOOLEAN,
    stun: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Item;
};