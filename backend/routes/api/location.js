var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all locations
router.get('/', (req, res) => {
  models.Location.findAll()
  .then((locations) => {
    res.json({status: 'ok', data: locations});
  });
});

// get single location
router.get('/:locationId', (req, res) => {
  models.Location.find({
    where: { id: req.params.locationId },
    include: [
      models.Item,
      models.Spell,
      models.Skill,
      models.Resource,
      { model: models.Recipe, include: [{model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'}] },
      { model: models.Monster, include: [models.Spell, models.Skill] }
    ]
  })
  .then((location) => {
    res.json({status: 'ok', data: location});
  });
});

// generate new locations
router.get('/add/:quantity', (req, res) => {
  var bulk = [];
  for (var i = 0; i < req.params.quantity; i++) {
    bulk.push(locationFactory.build());
  }
  models.Location.bulkCreate(bulk)
  .then((locations) => {
    res.json({status: 'ok', data: locations});
  });
});

module.exports = router;