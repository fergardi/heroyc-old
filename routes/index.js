var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/api', function(req, res) {
  res.render('api');
});

router.get('/users', function(req, res) {
  res.render('users');
});

router.get('/items', function(req, res) {
  res.render('items');
});

module.exports = router;