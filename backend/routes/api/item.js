var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all items
router.get('/', function(req, res) {
  models.Item.findAll()
  .then(function(items) {
    res.status(200).json(items);
  });
});

// get single item
router.get('/:itemId', function(req, res) {
  models.Item.findById(req.params.itemId)
  .then(function(item) {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(418).end();
    }
  });
});

module.exports = router;