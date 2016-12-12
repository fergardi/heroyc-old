var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all skills
router.get('/', function(req, res) {
  models.Skill.findAll()
  .then(function(skills) {
    res.status(200).json(skills)
  });
});

module.exports = router;