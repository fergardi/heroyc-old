var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var models = require("./models");

var routes = require('./routes/index');
var users = require('./routes/api/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);

var colors = [
  'panel-primary',
  'panel-warning',
  'panel-info',
  'panel-success',
  'panel-primary'
];

var randomize = function() {
	return user = {
		firstname: Math.random().toString(36).substr(2, 20),
		lastname: Math.random().toString(36).substr(2, 20),
		email: Math.random().toString(36).substr(2, 5) + '@' + Math.random().toString(36).substr(2, 5) + '.com',
		class: colors[Math.floor(Math.random() * colors.length)],
	}
}

for (i=0; i<100; i++) {
  models.User.create(randomize());
}

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