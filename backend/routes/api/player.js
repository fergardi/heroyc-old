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

// GET
router.get('/:playerId/equipment', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Item.findAll({
      where: { 
        id: { 
          $in: [
            player.DistanceId,
            player.HelmId,
            player.NecklaceId,
            player.WeaponId,
            player.ArmorId,
            player.ShieldId,
            player.RingId,
            player.BootsId,
            player.PotionId
          ]
        } 
      }
    })
    .then(function(items){
      res.json({status: 'ok', data: items});
    })
  });
});

// POST
router.put('/:playerId/item/equip/:itemId', function(req, res) {
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

router.post('/:playerId/items/add/:itemId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Item.findById(req.params.itemId)
    .then(function(item){
      player.addItem(item, { equiped: false })
      .then(function(){
        res.json({status: 'ok', data: item});          
      });
    });
  });
});

router.post('/:playerId/resources/add/:resourceId/:quantity', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    player.getResources({ where: { id: req.params.resourceId } })
    .then(function(resources){
      if(resources.length > 0){
        resource = resources[0];
        resource.PlayerResource.quantity += parseInt(req.params.quantity);
        resource.PlayerResource.save();
        res.json({status: 'ok', data: resource});
      }else{
        models.Resource.findById(req.params.resourceId)
        .then(function(resource){
          player.addResource(resource, { quantity: parseInt(req.params.quantity) })
          .then(function(){
            player.getResources({ where: { id: req.params.resourceId } })
            .then(function(resources){
              res.json({status: 'ok', data: resources[0]});
            });
          });
        });
      }
    });
  });
});

module.exports = router;