var models  = require('../../models');
var express = require('express');
var router  = express.Router();

var constants = require('../../config/constants');
var moment = require('moment');
var factory = require('../../factories/location');
var cron = require('../../services/cron');
var socketio = require('../../services/socketio').io();

// crontab a new location
cron.schedule(constants.location.cron, function(){
  models.Location.create(factory.build())
  .then(function(location) {
    socketio.emit('updateLocations', location);
  });
});

// get all locations
router.get('/', (req, res) => {
  models.Location.findAll({
    where: {createdAt: {
      $gt: moment().subtract(constants.location.deadline, 'seconds'),
      $lt: moment()
    }},
  })
  .then((locations) => {
    res.status(200).json(locations);
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
    if (location){
      res.status(200).json(location);
    } else {
      res.status(418).end();
    }
  });
});

module.exports = router;