module.exports.configureEndpoints = function (app, passport) {
	function ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}

	// root
	app.get('/', function (req, res) {
		res.render('index', {});
	});

	app.get('/views/home', function (req, res) {
		res.render('home', {
			layout: false
		});
	});

	app.get('/hooks/contentful', function (req, res) {

		var build = require('../buildsite');
		build().build();
		
		// build.run();
		res.type('text/plain');
		res.send('You made it here');
		
	});



	app.get('/*', function (req, res) {
		res.render('index', {});
	});

	app.get('/server.js', function (req, res) {
		res.render('index', {
			title: 'Express'
		});
	});


};