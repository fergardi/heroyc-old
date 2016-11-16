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

// location factory
var factory = {
  types: ['mine', 'dungeon', 'castle', 'inn', 'forge', 'tower', 'city', 'ruins', 'market'],
  type () {
    return factory.types[Math.floor(Math.random() * factory.types.length)];
  },
  longitude () {
    return parseFloat(-(Math.random() * (5.603843017110297 - 5.546525069080559) + 5.546525069080559).toFixed(10));
  },
  latitude () {
    return parseFloat((Math.random() * (42.55666577380774 - 42.61952832509911) + 42.61952832509911).toFixed(10));
  },
  randomize () {
    var name = factory.type();
    var location = {
      image: name,
      type: 'title.' + name,
      lat: factory.latitude(),
      lng: factory.longitude(),
    };
    return location;
  }
};

// generate new locations
router.get('/add/:quantity', (req, res) => {
  var bulk = [];
  for (var i = 0; i < req.params.quantity; i++) {
    bulk.push(factory.randomize());
  }
  models.Location.bulkCreate(bulk)
  .then((locations) => {
    res.json({status: 'ok', data: locations});
  });
});

module.exports = router;