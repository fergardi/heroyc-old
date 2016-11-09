'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // o2o relationship
        models.User.belongsTo(models.Player);
        models.Player.hasOne(models.User);
      }
    }
  });

  return User;
};