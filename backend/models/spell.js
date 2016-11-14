'use strict';

module.exports = function(sequelize, DataTypes) {
  var Spell = sequelize.define('Spell', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    family: DataTypes.STRING,
    damage: DataTypes.INTEGER,
    heal: DataTypes.INTEGER,
    mana: DataTypes.INTEGER,
    burn: DataTypes.BOOLEAN,
    cure: DataTypes.BOOLEAN,
    shock: DataTypes.BOOLEAN,
    stun: DataTypes.BOOLEAN,
    freeze: DataTypes.BOOLEAN,
    icon: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Spell;
};