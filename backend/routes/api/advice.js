var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all advices
router.get('/', function(req, res) {
  models.Advice.findAll()
  .then(function(advices) {
    res.json({status: 'ok', data: advices});
  });
});

module.exports = router;