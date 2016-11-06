var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require('./models');

var app = express();

// uncomment after placing your favicon in /public
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', require('./routes/api/user'));
app.use('/api/locations', require('./routes/api/location'));
app.use('/api/monsters', require('./routes/api/monster'));
app.use('/api/spells', require('./routes/api/spell'));
app.use('/api/resources', require('./routes/api/resource'));
app.use('/api/players', require('./routes/api/player'));
app.use('/api/recipes', require('./routes/api/recipe'));
app.use('/api/quests', require('./routes/api/quest'));
app.use('/api/skills', require('./routes/api/skill'));
app.use('/api/sales', require('./routes/api/sale'));
app.use('/api/items', require('./routes/api/item'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.json(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.json(err);
});

module.exports = app;