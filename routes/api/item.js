var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
  models.Item.findAll()
  .then(function(items) {
    res.json({status: 'ok', data: items});
  });
});
// GET
router.get('/:id', function(req, res) {
  models.Item.findById(req.params.id)
  .then(function(item) {
    if (item !== null) {
      res.json({status: 'ok', data: item});
    } else {
      res.json({status: 'ko'});
    }
  });
});
// POST
router.post('/', function(req, res) {
  models.Item.create(req.body)
  .then(function(item) {
    res.json({status: 'ok', data: item});
  });
});

module.exports = router;