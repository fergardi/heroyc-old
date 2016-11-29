#!/usr/bin/env node
var debug = require('debug')('nodapi');
var app = require('../app').app;
var models = require('../models');
var env = process.env.NODE_ENV || 'dev';

var constants = require('../config/constants');

models.sequelize.sync({force: constants[env].sync})
.then(function() {
  if (constants[env].fixtures) {
  	const fixtures = require('sequelize-fixtures');
    console.log('Loading fixtures...');
  	fixtures.loadFile('./fixtures/*.*', models);
  }
});

var server = require('../app').server;

server.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + server.address().port);
});