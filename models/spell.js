'use strict';

module.exports = function(sequelize, DataTypes) {
  var Spell = sequelize.define('Spell', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    family: DataTypes.STRING,
    damage: DataTypes.INTEGER,
    multiple: DataTypes.BOOLEAN,
    icon: DataTypes.STRING,
    image: DataTypes.STRING
  });

  return Spell;
};