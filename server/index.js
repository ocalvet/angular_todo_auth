var express = require('express');
var app = express();
var path = require('path');
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var jwt = require('jsonwebtoken');
var users = new Datastore({ filename: 'db/users.db', autoload: true });
var todos = new Datastore({ filename: 'db/todos.db', autoload: true });
var secret = "sjakjaskfjaksljk";

var morgan      = require('morgan');

// Set body parser to parse application/json body
app.use(bodyParser.json());
app.use(morgan('dev'));

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

function checkToken(token, callback) {
	jwt.verify(token, secret, function(err, decoded) {
		if(err) {
			callback("Token could not be verified");
		} else {
			callback(null, decoded);
		}
	});
};

// Get a list of todos
app.get('/todo', function(req, res) {
	var token = req.get('Authorization').split(" ")[1];
	checkToken(token, function(err, decoded) {
		if (err) {
			res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    	});
		} else {
			todos.find({}, function(err, todos) {
				if (err) {
					res.status(404).json({ message: 'There was a problem loading todos'});
				} else {
					res.json(todos);
				}
			});
		}
	});
	
});

// Create a todo
app.post('/todo', function(req, res) {
	var todo = req.body;
	var token = req.get('Authorization').split(" ")[1];
	checkToken(token, function(err, decoded) {
		if (err) {
			res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    	});
		} else {
			var newTodo = {
				title: todo.title,
				date: new Date(),
				completed: false
			};
			
			todos.insert(newTodo, function(err, todo) {
				if (err) {
					res.status(404).json({ message: 'There was a problem inserting todo'});
				} else {
					res.json({
						todo: todo
					});
				}
			});
		}
	});
});

// update a todo
app.put('/todo/:todoId', function(req, res) {
	var updatedTodo = req.body;
	var todoId = req.params.todoId
	
	var token = req.get('Authorization').split(" ")[1];
	checkToken(token, function(err, decoded) {
		if (err) {
			res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    	});
		} else {
			todos.update({ _id: todoId }, { $set: { completed: updatedTodo.completed } }, {}, function(err, todo) {
				if(err || !todo) {
					res.status(400).json({ message: "Todo was not updated" });
				} else {
					res.json({
						todo: todo
					});
				}
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
	var userCredentials = req.body;
	
	if (!userCredentials.email) {
		res.status(422).json("Error sigin in");
	} else {
		users.findOne({ email: userCredentials.email, password: userCredentials.password }, function (err, user) {
			if (err || !user) {
				res.status(422).json("Error sigin in");
			} else {
				res.json({
					user: user,
					access_token: jwt.sign(user, secret, {
						expiresInMinutes: 1440 // expires in 24 hours
					})
				});
			}
		});
	}
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