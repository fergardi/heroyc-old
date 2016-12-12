var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all spells
router.get('/', function(req, res) {
  models.Spell.findAll()
  .then(function(spells) {
    res.status(200).json(spells);
  });
});

module.exports = router;