var express = require('express');
var app = express();
var path = require('path');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });

// Set body parser
app.use(bodyParser.json());

// Set ejs as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Return the index.html when the home is requested
app.get('/', function(req, res) {
	res.render('login');
	// res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/todo', function(req, res) {
	res.render('index');
});

app.get('/user', function(req, res) {
	users.find({}, function(err, users) {
		if (err) {
			res.status(404).json({ message: 'There was a problem loading users'});
		} else {
			res.json(users);
		}
	});
});

app.post('/login', function(req, res) {
	res.json({
		user: req.body,
		access_token: 'adskasdjalksdme.mdemelekmekljfoaiejpdk[aepedlapedealp'
	})
});

app.post('/register', function(req, res) {
	var user = req.body;
	
	var newUser = {
		name: user.name,
		email: user.email,
		password: user.password
	};
	
	users.insert(newUser, function(err, user) {
		if (err) {
			res.status(404).json({ message: 'There was a problem inserting user'});
		} else {
			res.json({
				user: user,
				access_token: "sdadjkasjdksadsa.djasldkladj;alsfkal;dklsdafklasfk"
			});
		}
	});
})

app.use(express.static('public'));

app.listen(1982, function() {
	console.log('Todo App runing on port 1982');
});