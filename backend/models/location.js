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
        models.Recipe.belongsToMany(models.Location, { through: 'LocationRecipes' } );
        models.Location.belongsToMany(models.Recipe, { through: 'LocationRecipes' } );
        // m2m association
        models.Spell.belongsToMany(models.Location, { through: 'LocationSpells' });
        models.Location.belongsToMany(models.Spell, { through: 'LocationSpells' });
      }
    },
    timestamps: false
  });

  return Location;
};