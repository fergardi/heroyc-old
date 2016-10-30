var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Sale.findAll({
    include: [models.Item, models.Resource, { model: models.Recipe, include:[{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] }],
    order: [['createdAt', 'DESC']]
  })
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});

module.exports = router;