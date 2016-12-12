var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all resources
router.get('/', function(req, res) {
  models.Resource.findAll()
  .then(function(resources) {
    res.status(200).json(resources);
  });
});

module.exports = router;