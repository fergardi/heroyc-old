var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// get all users
router.get('/', function(req, res) {
	models.User.findAll()
	.then(function(users) {
		res.json({status: 'ok', data: users});
	});
});

// get single user
router.get('/:id', function(req, res) {
	models.User.findById(req.params.id)
	.then(function(user) {
		if (user !== null) {
			res.json({status: 'ok', data: user});
		} else {
			res.json({status: 'ko'});
		}
	});
});

// create new user
router.post('/', function(req, res) {
	models.User.create(req.body)
	.then(function(user) {
		res.json({status: 'ok', data: user});
	});
});

// check user credentials
router.post('/login', function(req, res) {
	models.User.find({
		where: { username: req.body.username, password: req.body.password }
	})
	.then(function(user) {
		if (user !== null) {
			res.json({status: 'ok', data: user});
		} else {
			res.json({status: 'ko'});
		}
	});
});

module.exports = router;