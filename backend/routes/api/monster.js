var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Monster.findAll({
    include: [models.Spell], 
    order: [[models.Spell, 'id', 'ASC']]
  })
  .then(function(monsters) {
    res.json({status: 'ok', data: monsters});
  });
});

module.exports = router;