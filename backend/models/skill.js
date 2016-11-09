'use strict';

module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    family: DataTypes.STRING,
    vitality: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Skill;
};