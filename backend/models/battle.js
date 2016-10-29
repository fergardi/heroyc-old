'use strict';

module.exports = function(sequelize, DataTypes) {
  var Battle = sequelize.define('Battle', {
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // m2m association
        models.Monster.hasMany(models.Battle);
        models.Battle.belongsTo(models.Monster);
        // m2m association
        models.Item.hasMany(models.Battle);
        models.Battle.belongsTo(models.Item);
      }
    }
  });

  return Battle;
};