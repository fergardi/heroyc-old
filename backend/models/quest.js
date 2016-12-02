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
        var QuestResource = sequelize.define('QuestResource', {
        }, {
          timestamps: false,
          freezeTableName: true
        });
        models.Quest.belongsToMany(models.Resource, {through: QuestResource});
        models.Resource.belongsToMany(models.Quest, {through: QuestResource});
      }
    },
    freezeTableName: true
  });

  return Quest;
};