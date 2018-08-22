var async = require('async');
var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
	db.tag.findAll().then(function(tags) {
		res.render('tags/index', { tags: tags });
	}).catch(function(err) {
		console.log(err);
		res.render('error');
	})
});

router.get('/edit/:id', function(req, res) {
	res.send('Edit tag form goes here');
});

router.get('/:id', function(req, res) {
	db.tag.findOne({
		where: { id: req.params.id },
		include: [db.article]
	}).then(function(tag) {
		res.render('tags/show', { tag: tag });
	})
});

router.delete('/:id', function(req, res) {
	db.tag.findOne({
		where: { id: req.params.id },
		include: [db.article]
	}).then(function(foundTag) {
		async.forEach(foundTag.articles, function(a, done) {
			// Runs for each article
			// Remove the association from the join table
			foundTag.removeArticle(a).then(function() {
				done();
			});
		}, function() {
			// Runs when everything is done
			// Now that the references in the join table are gone, I can delete the tag
			db.tag.destroy( {
				where: { id: req.params.id }
			}).then(function() {
				res.send('zuccessful delete')
			}).catch(function(err) {
				res.status(500).send('OH NOOOOOOO');
			});
		});
	}).catch(function(err) {
		res.status(500).send('OH NOOOOOOO');
	});
	//res.send('IS MR WALLACE A BITCH?');
});


module.exports = router;