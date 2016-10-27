var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
	res.render('map');
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

router.get('/forge', function(req, res) {
  res.render('forge');
});

router.get('/store', function(req, res) {
  res.render('store');
});

router.get('/battle', function(req, res) {
  res.render('battle');
});

router.get('/items', function(req, res) {
  res.render('items');
});

module.exports = router;