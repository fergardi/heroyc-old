'use strict';

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    icon: DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    vitality: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    freeze: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    burn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    poison: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    stun: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Item;
};