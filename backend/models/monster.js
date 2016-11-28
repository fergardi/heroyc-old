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
        // m2m2
        var MonsterSpells = sequelize.define('MonsterSpell', {
        }, {
          timestamps: false,
          freezeTableName: true
        });
        models.Spell.belongsToMany(models.Monster, {through: MonsterSpells});
        models.Monster.belongsToMany(models.Spell, {through: MonsterSpells});
        // m2m2
        var MonsterSkills = sequelize.define('MonsterSkill', {
        }, {
          timestamps: false,
          freezeTableName: true
        });
        models.Skill.belongsToMany(models.Monster, {through: MonsterSkills});
        models.Monster.belongsToMany(models.Skill, {through: MonsterSkills});
      }
    },
    timestamps: false,
    freezeTableName: true
  });

  return Monster;
};