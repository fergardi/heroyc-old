var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all sales outside store
router.get('/', function(req, res) {
  models.Sale.findAll({
    where: { store: false },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

// get all sales inside store
router.get('/market', function(req, res) {
  models.Sale.findAll({
    where: { store: true },
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

module.exports = router;