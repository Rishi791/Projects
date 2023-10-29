var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//Fire controllers
todoController(app);

//listen
const PORT = 3301;
app.listen(PORT);
console.log('Listening on port ' + PORT);
