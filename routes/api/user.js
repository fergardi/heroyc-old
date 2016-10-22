var models  = require('../../models');
var express = require('express');
var router  = express.Router();

// GET
router.get('/', function(req, res) {
	models.User.findAll()
	.then(function(users) {
		res.json({status: 'ok', data: users});
	});
});
// GET
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
// POST
router.post('/', function(req, res) {
	models.User.create(req.body)
	.then(function(user) {
		res.json({status: 'ok', data: user});
	});
});
// PUT
router.put('/:id', function(req, res) {
	models.User.findById(req.params.id)
	.then(function(user) {
		user.updateAttributes(req.body)
		.then(function(user) {
			res.json({status: 'ok', data: user});
		});
	})
	.catch(function(){
		res.json({status: 'ko'});
	});
});
// DELETE
router.delete('/:id', function(req, res) {
	models.User.findById(req.params.id)
	.then(function(user) {
		if (user !== null) {
			models.User.destroy({where: {id: req.params.id}})
			.then(function() {
				res.json({status: 'ok'});
			});
		} else {
			res.json({status: 'ko'});
		}
	});
});
// DELETE
router.delete('/', function(req, res) {
	models.User.destroy({where: {}})
	.then(function() {
		res.json({status: 'ok'});
	});	
});

module.exports = router;