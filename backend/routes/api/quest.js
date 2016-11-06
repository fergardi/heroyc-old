var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all quests
router.get('/', function(req, res) {
  models.Quest.findAll()
  .then(function(quests) {
    res.json({status: 'ok', data: quests});
  });
});

// get single quest
router.get('/:id', function(req, res) {
  models.Quest.findById(req.params.id)
  .then(function(quest) {
    if (quest !== null) {
      res.json({status: 'ok', data: quest});
    } else {
      res.json({status: 'ko'});
    }
  });
});

module.exports = router;