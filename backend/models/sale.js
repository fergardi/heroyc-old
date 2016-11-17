'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define('Sale', {
    gold: DataTypes.INTEGER,
    platinum: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // belongs to player
        models.Sale.belongsTo(models.Player);
        // sell items
        models.Item.hasMany(models.Sale);
        models.Sale.belongsTo(models.Item);
        // sell resources
        models.Resource.hasMany(models.Sale);
        models.Sale.belongsTo(models.Resource);
        // sell recipes
        models.Recipe.hasMany(models.Sale);
        models.Sale.belongsTo(models.Recipe);
      }
    }
  });

  return Sale;
};