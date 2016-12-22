'use strict';

module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    image: DataTypes.STRING,
    class: DataTypes.STRING,
    vitality: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    rarity: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Skill;
};