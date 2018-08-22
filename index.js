// Require stuff
var bodyParser = require('body-parser');
var express = require('express')
var ejsLayouts = require('express-ejs-layouts');

// Declare Global Var
var app = express();


// Set and use statements
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

//Include controllers/routes
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments', require('./controllers/comments'));
app.use('/tags', require('./controllers/tags'));

// Define Routes
app.get('/', function(req, res) {
	res.render('home');
});

app.get('*', function(req, res) {
	console.log('wildcard route');
	res.render('error');
});

// Hey! Listen! - Navi
app.listen(3000, function() {
	console.log('Hey! Listen! - Navi')
});