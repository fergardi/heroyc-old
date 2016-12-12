var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all monsters
router.get('/', function(req, res) {
  models.Monster.findAll({
    include: [models.Spell, models.Skill]
  })
  .then(function(monsters) {
    res.status(200).json(monsters);
  });
});

// get single monster
router.get('/:monsterId', function(req, res) {
  models.Monster.find({
    where: { id: req.params.monsterId },
    include: [models.Spell, models.Skill]
  })
  .then(function(monster) {
    if (monster) {
      res.status(200).json(monster);
    } else {
      res.status(418).end();
    }
  });
});

module.exports = router;