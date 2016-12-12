var models  = require('../../models');
var express = require('express');
var router  = express.Router();

var factory = require('../../factories/player');

// get all users
router.get('/', function(req, res) {
	models.User.findAll()
	.then(function(users) {
		res.status(200).json(users);
	});
});

// get single user
router.get('/:userId', function(req, res) {
	models.User.findById(req.params.userId)
	.then(function(user) {
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(418).end();
		}
	});
});

// create new user
router.post('/register', function(req, res) {
	models.User.find({
		where: { username: req.body.username }
	})
	.then(function(user) {
		if (!user)  {
			var created = factory.build(req.body.name);
			models.User.create(req.body)
			.then(function(user) {
				models.Player.create(created)
				.then(function(player) {
					player.addItems(created.Items);
					user.setPlayer(player);
					res.status(200).json(user);
				})
			});	
		} else {
			res.status(418).end();
		}
	})
});

// check user credentials
router.post('/login', function(req, res) {
	models.User.find({
		where: { username: req.body.username, password: req.body.password }
	})
	.then(function(user) {
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(418).end();
		}
	});
});

module.exports = router;