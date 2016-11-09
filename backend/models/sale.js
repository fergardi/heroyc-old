'use strict';

module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define('Sale', {
    gold: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
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