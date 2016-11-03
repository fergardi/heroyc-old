var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Battle.findAll({
    include: [
      { model: models.Monster, include: [models.Spell] },
      models.Item, 
      models.Resource
    ]
  })
  .then(function(battles) {
    res.json({status: 'ok', data: battles});
  });
});

// GET
router.get('/:battleId', function(req, res) {
  models.Battle.find({
    where: { id: req.params.battleId },
    include: [
      { model: models.Monster, include: [{ model: models.Spell }] },
      models.Item, 
      models.Resource,
    ]
  })
  .then(function(battle) {
    res.json({status: 'ok', data: battle});
  });
});

module.exports = router;