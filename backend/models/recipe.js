'use strict';

module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
  }, {
    classMethods: {
      associate: function(models) {
        // original item
        models.Item.hasMany(models.Recipe, { as: 'Original', foreignKey: 'OriginalId' });
        models.Recipe.belongsTo(models.Item, { as: 'Original', foreignKey: 'OriginalId' });
        // resource
        models.Resource.hasMany(models.Recipe, { foreignKey: 'ResourceId' });
        models.Recipe.belongsTo(models.Resource, { foreignKey: 'ResourceId' });
        // result item
        models.Item.hasMany(models.Recipe, { as: 'Result', foreignKey: 'ResultId' });
        models.Recipe.belongsTo(models.Item, { as: 'Result', foreignKey: 'ResultId' });
      }
    },
    timestamps: false
  });

  return Recipe;
};