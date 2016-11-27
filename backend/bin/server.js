#!/usr/bin/env node
var debug = require('debug')('nodapi');
var app = require('../app').app;
var models = require('../models');

models.sequelize.sync({force: true})
.then(function() {
	const fixtures = require('sequelize-fixtures');
  console.log('Loading fixtures...');
	fixtures.loadFile('./fixtures/*.*', models);
});

var server = require('../app').server;

server.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + server.address().port);
});