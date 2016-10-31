var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Player.findAll({ 
    include: [models.Item, models.Spell, models.Resource], 
    order: [
      [models.Item, 'id', 'ASC'], 
      [models.Spell, 'id', 'ASC'], 
      [models.Resource, 'id', 'ASC'],
      [models.Resource, 'rarity', 'ASC']
    ]
  })
  .then(function(players) {
    res.json({status: 'ok', data: players});
  });
});

// GET
router.get('/:id', function(req, res) {
  models.Player.find({
    where: { id: req.params.id }, 
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

// POST
router.post('/:playerId/equip/:itemId', function(req, res) {
  models.Player.find({
    include: [models.Item],
    where: { id: req.params.playerId }
  })
  .then(function(player) {
    models.Item.find({
      where: { id: req.params.itemId }
    })
    .then(function(equip) {
      models.Item.find({
        include: [{ model: models.Player, through: { where: { PlayerId: player.id, equiped: true } }, required: true }],
        where: { type: equip.type }
      })
      .then(function(unequip) {
        player.addItem(unequip, { equiped: false })
        .then(function(result) {
          player.addItem(equip, { equiped: true })
          .then(function(result) {
            models.Player.find({
              include: [models.Item],
              where: { id: req.params.playerId }
            })
            .then(function(player) {
              res.json({status: 'ok', data: player});  
            });
          })  
        });
      });
    });
  });
});

module.exports = router;