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

router.get('/resources', function(req, res) {
  res.render('resources');
});

router.get('/player', function(req, res) {
  res.render('player');
});

router.get('/spells', function(req, res) {
  res.render('spells');
});

router.get('/recipes', function(req, res) {
  res.render('recipes');
});

router.get('/store', function(req, res) {
  res.render('store');
});

router.get('/items', function(req, res) {
  res.render('items');
});

module.exports = router;