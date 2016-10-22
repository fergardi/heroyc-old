var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Spell.findAll()
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

module.exports = router;