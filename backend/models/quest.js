'use strict';

module.exports = function(sequelize, DataTypes) {
  var Quest = sequelize.define('Quest', {
    name: DataTypes.STRING,
    rarity: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
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