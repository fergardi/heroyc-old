#!/usr/bin/env node
var debug = require('debug')('nodapi');
var app = require('../app');
var models = require('../models');

app.set('port', process.env.PORT || 3000);

models.sequelize.sync({force: true})
.then(function() {
	const fixtures = require('sequelize-fixtures');
	fixtures.loadFile('./fixtures/*.json', models);
})
.then(function() {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});