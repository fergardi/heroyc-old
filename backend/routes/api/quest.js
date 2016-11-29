var models  = require('../../models');
var express = require('express');
var router  = express.Router();
var env = process.env.NODE_ENV || 'dev';

var constants = require('../../config/constants');
var moment = require('moment');
var factory = require('../../factories/quest');
var cron = require('../../services/cron');
var socketio = require('../../services/socketio').io();

// crontab a new quest
cron.schedule(constants[env].quest.cron, function(){
  var created = factory.build();
  models.Quest.create(created)
  .then(function(quest) {
    quest.setResources(created.Resources);
    quest.reload()
    .then(function(quest) {
      models.Quest.findAll({
        where: {createdAt: {
          $lt: moment(),
          $gt: moment().subtract(constants[env].quest.deadline, 'seconds')
        }},
        include: [models.Resource]
      })
      .then(function(quests) {
        socketio.emit('updateQuests', quests);
      });
    });
  });
});

// get all quests
router.get('/', function(req, res) {
  models.Quest.findAll({
    where: {createdAt: {
      $lt: moment(),
      $gt: moment().subtract(constants[env].quest.deadline, 'seconds')
    }},
    include: [models.Resource]
  })
  .then(function(quests) {
    res.json({status: 'ok', data: quests});
  });
});

// get single quest
router.get('/:id', function(req, res) {
  models.Quest.find({
    where: { id: req.params.id },
    include: [models.Resource]
  })
  .then(function(quest) {
    if (quest !== null) {
      res.json({status: 'ok', data: quest});
    } else {
      res.json({status: 'ko'});
    }
  });
});

module.exports = router;