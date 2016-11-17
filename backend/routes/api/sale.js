var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all sales outside market
router.get('/', function(req, res) {
  models.Sale.findAll({
    where: { market: false },
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
      if (sale.gold <= player.gold) {
        player.gold -= sale.gold;
        player.save();
        if (sale.Item !== null) {
          player.addItem(sale.Item);
        }
        if (sale.Resource !== null) {
          player.addResource(sale.Resource); 
        }
        if (sale.Recipe !== null) {
          player.addRecipe(sale.Recipe);
        }
        sale.destroy();
        models.Sale.findAll({
          where: { market: false },
          include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
          order: [['createdAt', 'DESC']]
        })
        .then(function(sales) {
          res.json({status: 'ok', data: sales});
        });
      }
    });
  })
});

// get all sales inside market
router.get('/market', function(req, res) {
  models.Sale.findAll({
    where: { market: true },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(merchandise) {
    res.json({status: 'ok', data: merchandise});
  });
});

module.exports = router;