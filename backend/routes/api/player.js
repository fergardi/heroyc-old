var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all players
router.get('/', function(req, res) {
  models.Player.findAll()
  .then(function(players) {
    res.json({status: 'OK', data: players});
  });
});

// get a single player
router.get('/:playerId', function(req, res) {
  models.Player.find({
    where: { id: req.params.playerId }, 
    include: [models.Item, models.Spell, models.Resource, models.Skill, models.Quest, { model: models.Recipe, include: [{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}]}], 
    order: [
      [models.Item, 'id', 'ASC'], 
      [models.Spell, 'id', 'ASC'], 
      [models.Resource, 'id', 'ASC'],
      [models.Resource, 'rarity', 'ASC']
    ]
  })
  .then(function(player) {
    models.Item.findAll({
      where: { 
        id: { 
          $in: [
            player.RingId,
            player.HelmId,
            player.NecklaceId,
            player.WeaponId,
            player.ArmorId,
            player.ShieldId,
            player.GlovesId,
            player.BootsId,
            player.PotionId
          ]
        } 
      }
    })
    .then(function(equipments){
      //need to add custom virtual attribute to sequelize object
      player = player.toJSON();
      player.Equipments = equipments;
      res.json({status: 'OK', data: player });
    });
  });
});

// get a single player
router.get('/:playerId/items', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    player.getItems()
    .then(function(items) {
      res.json({status: 'OK', data: items });
    });
  });
});

// get equipments of a player
router.get('/:playerId/equipments', function(req, res) {
  models.Player.find({
    where: { id: req.params.playerId }
  })
  .then(function(player) {
    models.Item.findAll({
      where: { 
        id: { 
          $in: [
            player.RingId,
            player.HelmId,
            player.NecklaceId,
            player.WeaponId,
            player.ArmorId,
            player.ShieldId,
            player.GlovesId,
            player.BootsId,
            player.PotionId
          ]
        } 
      },
      order: [['id', 'ASC']]
    })
    .then(function(equipments){
      res.json({status: 'OK', data: equipments });
    });
  });
});

// change equipment of player
router.put('/:playerId/equipments/:itemId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    player.getItems({
      where: { id: req.params.itemId }
    })
    .then(function(items) {
      if (items.length > 0) {
        item = items[0];
        switch (item.type) {
          case 'ring':
            player.setRing(item);
            break;
          case 'helm':
            player.setHelm(item);
            break;
          case 'necklace':
            player.setNecklace(item);
            break;
          case 'weapon':
            player.setWeapon(item);
            break;
          case 'armor':
            player.setArmor(item);
            break;
          case 'shield':
            player.setShield(item);
            break;
          case 'gloves':
            player.setGloves(item);
            break;
          case 'boots':
            player.setBoots(item);
            break;
          case 'potion':
            player.setPotion(item);
            break;          
        }
        player.save();
        res.json({status: 'OK'});
      } else {
        res.json({status: 'KO'});
      }
    });
  });
});

// add item to player
router.post('/:playerId/items/add/:itemId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Item.findById(req.params.itemId)
    .then(function(item) {
      player.addItem(item)
      .then(function() {
        res.json({status: 'OK', data: item});          
      });
    });
  });
});

// add spell to player
router.post('/:playerId/spells/add/:spellId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Spell.findById(req.params.spellId)
    .then(function(spell){
      player.addSpell(spell)
      .then(function(){
        res.json({status: 'OK', data: spell});          
      });
    });
  });
});

// add skill to player
router.post('/:playerId/skills/add/:skillId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Skill.findById(req.params.skillId)
    .then(function(skill){
      player.addSkill(skill)
      .then(function(){
        res.json({status: 'OK', data: skill});          
      });
    });
  });
});

// add recipe to player
router.post('/:playerId/recipes/add/:recipeId', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    models.Recipe.findById(req.params.recipeId)
    .then(function(recipe){
      player.addRecipe(recipe)
      .then(function(){
        res.json({status: 'OK', data: recipe});          
      });
    });
  });
});

// add resource and quantity to player
router.post('/:playerId/resources/add/:resourceId/:quantity', function(req, res) {
  models.Player.findById(req.params.playerId)
  .then(function(player) {
    player.getResources({ where: { id: req.params.resourceId } })
    .then(function(resources){
      if(resources.length > 0){
        resource = resources[0];
        resource.PlayerResource.quantity += parseInt(req.params.quantity);
        resource.PlayerResource.save();
        res.json({status: 'OK', data: resource});
      }else{
        models.Resource.findById(req.params.resourceId)
        .then(function(resource){
          player.addResource(resource, { quantity: parseInt(req.params.quantity) })
          .then(function(){
            player.getResources({ where: { id: req.params.resourceId } })
            .then(function(resources){
              res.json({status: 'OK', data: resources[0]});
            });
          });
        });
      }
    });
  });
});

module.exports = router;