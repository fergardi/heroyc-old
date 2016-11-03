'use strict';

module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // m2m association
        models.Monster.hasMany(models.Location);
        models.Location.belongsTo(models.Monster);
        // m2m association
        models.Item.hasMany(models.Location);
        models.Location.belongsTo(models.Item);
        // m2m association
        models.Resource.hasMany(models.Location);
        models.Location.belongsTo(models.Resource);
        // m2m association
        models.Spell.hasMany(models.Location);
        models.Location.belongsTo(models.Spell);
        // m2m association
        models.Recipe.hasMany(models.Location);
        models.Location.belongsTo(models.Recipe);
      }
    },
    timestamps: false
  });

  return Location;
};