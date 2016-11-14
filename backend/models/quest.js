'use strict';

module.exports = function(sequelize, DataTypes) {
  var Quest = sequelize.define('Quest', {
    name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    image: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    platinum: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // m2m association
        models.Quest.belongsToMany(models.Resource, {through: 'QuestResource'});
        models.Resource.belongsToMany(models.Quest, {through: 'QuestResource'});
      }
    },
    timestamps: false
  });

  return Quest;
};