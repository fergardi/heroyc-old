'use strict';

module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    family: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    vitality: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Skill;
};