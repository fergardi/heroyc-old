'use strict';

module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // custom m2m association with "equiped" to distinguish between regular item and equiped one
        var PlayerItem = sequelize.define('PlayerItem', {
          equiped: DataTypes.BOOLEAN
        });
        models.Item.belongsToMany(models.Player, {through: 'PlayerItem'});
        models.Player.belongsToMany(models.Item, {through: 'PlayerItem'});
        // m2m association
        models.Spell.belongsToMany(models.Player, {through: 'PlayerSpell'});
        models.Player.belongsToMany(models.Spell, {through: 'PlayerSpell'});
        // custom m2m association with "quantity" to count ammount of resources of the same type
        var PlayerResource = sequelize.define('PlayerResource', {
          quantity: DataTypes.INTEGER
        });
        models.Resource.belongsToMany(models.Player, {through: PlayerResource});
        models.Player.belongsToMany(models.Resource, {through: PlayerResource});
      }
    }
  });

  return Player;
};