'use strict';

module.exports = function(sequelize, DataTypes) {
  var Advice = sequelize.define('Advice', {
    text: DataTypes.STRING,
    class: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Advice;
};