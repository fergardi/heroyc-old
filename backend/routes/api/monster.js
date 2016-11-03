var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all monsters
router.get('/', function(req, res) {
  models.Monster.findAll({
    include: [models.Spell]
  })
  .then(function(monsters) {
    res.json({status: 'ok', data: monsters});
  });
});

// get single monster
router.get('/:monsterId', function(req, res) {
  models.Monster.find({
    where: { id: req.params.monsterId },
    include: [models.Spell]
  })
  .then(function(monsters) {
    res.json({status: 'ok', data: monsters});
  });
});

module.exports = router;