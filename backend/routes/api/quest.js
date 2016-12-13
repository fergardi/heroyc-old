var models  = require('../../models');
var express = require('express');
var router  = express.Router();

var constants = require('../../config/constants');
var moment = require('moment');
var factory = require('../../factories/quest');
var cron = require('../../services/cron');
var socketio = require('../../services/socketio').io();

// crontab a new quest
cron.schedule(constants.quest.cron, function(){
  var created = factory.build();
  models.Quest.create(created)
  .then(function(quest) {
    if (quest) {
      quest.setResources(created.Resources);
      quest.reload()
      .then(function(quest) {
        models.Quest.findAll({
          where: {createdAt: {
            $lt: moment(),
            $gt: moment().subtract(constants.quest.deadline, 'seconds')
          }},
          include: [models.Resource]
        })
        .then(function(quests) {
          socketio.emit('updateQuests', quests);
        });
      });
    } else {
      res.status(418).end();
    }
  });
});

// get all quests
router.get('/', function(req, res) {
  models.Quest.findAll({
    where: {createdAt: {
      $lt: moment(),
      $gt: moment().subtract(constants.quest.deadline, 'seconds')
    }},
    include: [models.Resource]
  })
  .then(function(quests) {
    res.status(200).json(quests);
  });
});

// get single quest
router.get('/:questId', function(req, res) {
  models.Quest.find({
    where: { id: req.params.questId },
    include: [models.Resource]
  })
  .then(function(quest) {
    if (quest) {
      res.status(200).json(quest);
    } else {
      res.status(418).end();
    }
  });
});

module.exports = router;