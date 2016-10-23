'use strict';

module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    experience: DataTypes.INTEGER,
    gold: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Player.belongsToMany(models.Item, {through: 'PlayerItem'});
        models.Item.belongsToMany(models.Player, {through: 'PlayerItem'});
      }
    }
  });

  return Player;
};