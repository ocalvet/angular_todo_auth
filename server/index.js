var express = require('express');
var app = express();
var path = require('path');
var engine = require('ejs-mate');

// Set ejs as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Return the index.html when the home is requested
app.get('/', function(req, res) {
	res.render('index');
	// res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', function(req, res) {
	res.json({
		user: { name: 'Ovidio R. Calvet' },
		access_token: 'adskasdjalksdme.mdemelekmekljfoaiejpdk[aepedlapedealp'
	})
});

app.use(express.static('public'));

app.listen(1982, function() {
	console.log('Todo App runing on port 1982');
});