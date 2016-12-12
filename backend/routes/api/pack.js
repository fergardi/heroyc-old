var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all packs
router.get('/', function(req, res) {
  models.Pack.findAll({
    order: [['euro', 'ASC']]
  })
  .then(function(packs) {
    res.status(200).json(packs);
  });
});

module.exports = router;