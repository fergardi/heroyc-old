var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Resource.findAll()
  .then(function(resources) {
    res.json({status: 'ok', data: resources});
  });
});

module.exports = router;