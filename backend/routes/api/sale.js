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
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

// get all sales inside market
router.get('/market', function(req, res) {
  models.Sale.findAll({
    where: { market: true },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

module.exports = router;