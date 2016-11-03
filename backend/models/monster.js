'use strict';

module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define('Monster', {
    name: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    vitality: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    agility: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    experience: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Spell.belongsToMany(models.Monster, {through: 'MonsterSpells'});
        models.Monster.belongsToMany(models.Spell, {through: 'MonsterSpells'});
      }
    },
    timestamps: false
  });

  return Monster;
};