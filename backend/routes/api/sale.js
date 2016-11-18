var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all sales outside market
router.get('/', function(req, res) {
  models.Sale.findAll({
    where: { PlayerId: { $ne: null } },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(sales) {
    res.json({status: 'ok', data: sales});
  });
});

// get all sales inside market
router.get('/market', function(req, res) {
  models.Sale.findAll({
    where: { PlayerId: { $eq: null } },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(sales) {
    res.json({status: 'ok', data: sales});
  });
});

// buy a sale
router.delete('/:saleId/buy/:playerId', function(req, res) {
  models.Sale.find({
    where: { id: req.params.saleId },
    include: [models.Item, models.Resource, models.Recipe]
  })
  .then(function(sale) {
    models.Player.findById(req.params.playerId)
    .then(function(player) {
      if (player !== null && sale.gold <= player.gold && sale.platinum <= player.platinum) {
        player.gold -= sale.gold;
        player.platinum -= sale.platinum;
        player.save();
        if (sale.Item !== null) {
          player.addItem(sale.Item);
        }
        if (sale.Resource !== null) {
          player.getResources({ where: { id: sale.Resource.id } })
          .then(function(resources) {
            if (resources.length > 0) {
              resource = resources[0];
              resource.PlayerResource.quantity += parseInt(1);
              resource.PlayerResource.save();
            } else {
              models.Resource.findById(sale.Resource.id)
              .then(function(resource) {
                player.addResource(resource, { quantity: parseInt(1) });
              });
            }
          });
        }
        if (sale.Recipe !== null) {
          player.addRecipe(sale.Recipe);
        }
        sale.destroy();
        if (sale.PlayerId !== null) {
          models.Player.findById(sale.PlayerId)
          .then(function(owner) {
            owner.gold += sale.gold;
            owner.save();
          });
          models.Sale.findAll({
            where: { PlayerId: { $ne: null } },
            include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
            order: [['createdAt', 'DESC']]
          })
          .then(function(sales) {
            res.json({status: 'ok', data: sales});
          });
        } else {
          models.Sale.findAll({
            where: { PlayerId: { $eq: null } },
            include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
            order: [['createdAt', 'DESC']]
          })
          .then(function(sales) {
            res.json({status: 'ok', data: sales});
          });
        }
      } else {
        res.json({status: 'ko'});
      }
    });
  })
});

module.exports = router;