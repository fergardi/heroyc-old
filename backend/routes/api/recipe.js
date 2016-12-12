var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all recipes
router.get('/', function(req, res) {
  models.Recipe.findAll({
    include: [{ model: models.Item, as: 'Original'}, { model: models.Resource }, { model: models.Item, as: 'Result'} ]
  })
  .then(function(recipes) {
    res.status(200).json(recipes);
  });
});

module.exports = router;