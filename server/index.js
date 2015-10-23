var express = require('express');
var app = express();
var path = require('path');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var users = new Datastore({ filename: 'db/users.db', autoload: true });
var todos = new Datastore({ filename: 'db/todos.db', autoload: true });

// Set body parser to parse application/json body
app.use(bodyParser.json());

// Set ejs as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Return the index.html when the home is requested
app.get('/', function(req, res) {
	res.render('login');
	// res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Serve the dashboard page
app.get('/dashboard', function(req, res) {
	res.render('index');
});

// Get a list of todos
app.get('/todo', function(req, res) {
	todos.find({}, function(err, todos) {
		if (err) {
			res.status(404).json({ message: 'There was a problem loading todos'});
		} else {
			res.json(todos);
		}
	});
});

// Create a todo
app.post('/todo', function(req, res) {
	var todo = req.body;
	
	var newTodo = {
		title: todo.name,
		date: new Date(),
		completed: false
	};
	
	todos.insert(newTodo, function(err, todo) {
		if (err) {
			res.status(404).json({ message: 'There was a problem inserting todo'});
		} else {
			res.json({
				todo: todo,
				access_token: "sdadjkasjdksadsa.djasldkladj;alsfkal;dklsdafklasfk"
			});
		}
	});
});

// Get list of users
app.get('/user', function(req, res) {
	users.find({}, function(err, users) {
		if (err) {
			res.status(404).json({ message: 'There was a problem loading users'});
		} else {
			res.json(users);
		}
	});
});

// Login user
app.post('/login', function(req, res) {
	res.json({
		user: req.body,
		access_token: 'adskasdjalksdme.mdemelekmekljfoaiejpdk[aepedlapedealp'
	})
});

// Register a user
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
});

// Serve static files from the public folder
app.use(express.static('public'));

// Setart the server on port 1982
app.listen(1982, function() {
	console.log('Todo App runing on port 1982');
});