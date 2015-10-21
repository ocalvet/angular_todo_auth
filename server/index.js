var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/index.html'));
})
.use(express.static('public'));

app.listen(1982, function() {
	console.log('Todo App runing on port 1982');
});