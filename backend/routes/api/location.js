var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Location.findAll()
  .then(function(locations) {
    res.json({status: 'ok', data: locations});
  });
});

// GET
router.get('/:locationId', function(req, res) {
  models.Location.find({
    where: { id: req.params.locationId },
    include: [
      models.Item,
      models.Spell,
      models.Resource,
      { model: models.Recipe, include: [{model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] },
      { model: models.Monster, include: [models.Spell] }
    ]
  })
  .then(function(location) {
    res.json({status: 'ok', data: location});
  });
});

module.exports = router;