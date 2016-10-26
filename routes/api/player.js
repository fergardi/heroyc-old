var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/:id', function(req, res) {
  models.Player.find({
    where: {
      id: req.params.id
    }, 
    include: [models.Item, models.Spell, models.Resource], 
    order: [
      [models.Item, 'id', 'ASC'], 
      [models.Spell, 'id', 'ASC'], 
      [models.Resource, 'id', 'ASC'],
      [models.Resource, 'rarity', 'ASC']
    ]
  })
  .then(function(player) {
    res.json({status: 'ok', data: player});
  });
});

module.exports = router;