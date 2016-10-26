'use strict';

module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    gold: DataTypes.INTEGER,
    silver: DataTypes.INTEGER,
    copper: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // sell items
        models.Item.hasMany(models.Store);
        models.Store.belongsTo(models.Item);
        // sell resources
        models.Resource.hasMany(models.Store);
        models.Store.belongsTo(models.Resource);
        // sell recipes
        models.Recipe.hasMany(models.Store);
        models.Store.belongsTo(models.Recipe);
      }
    }
  });

  return Store;
};