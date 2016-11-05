var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all locations
router.get('/', function(req, res) {
  models.Location.findAll()
  .then(function(locations) {
    res.json({status: 'ok', data: locations});
  });
});

// get single location
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

// location factory
var encounter = {
  types: ['Mine', 'Dungeon', 'Castle', 'Inn', 'Forge', 'Tower', 'City', 'Ruins'],
  type: function() {
    return encounter.types[Math.floor(Math.random() * encounter.types.length)];
  },
  titles: ['Despair', 'Sorrow'],
  title: function() {
    return encounter.titles[Math.floor(Math.random() * encounter.titles.length)];
  },
  latitude: function() {
    return -(Math.random() * (5.56 - 5.54) + 5.54).toFixed(4);
  },
  longitude: function() {
    return (Math.random() * (42.65 - 42.45) + 42.45).toFixed(4);
  },
  generate: function() {
    var type = encounter.type();
    var title = encounter.title();
    return { 
      name: type + ' of ' + title,
      lat: encounter.latitude(),
      lng: encounter.longitude(),
      image: type.toLowerCase()
    };
  }
};

// generate new location
router.post('/add', function(req, res) {
  models.Location.create(encounter.generate())
  .then(function(location) {
    res.json({status: 'ok', data: location});
  });
});

module.exports = router;