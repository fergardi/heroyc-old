'use strict';

module.exports = function(sequelize, DataTypes) {
  var Advice = sequelize.define('Advice', {
    text: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    timestamps: false
  });

  return Advice;
};