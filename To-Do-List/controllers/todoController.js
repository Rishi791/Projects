var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
var credentials = require(__dirname + '/../private/mongo_credentials');
mongoose.connect(credentials.url);

//Create schema
var todoSchema = new mongoose.Schema({
    item: String
});

//Create todo model
var Todo = mongoose.model('Todo', todoSchema);

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    //Get data from mongodb and pass to view
    app.get('/todo', function(request, response) {
        var allItems = Todo.find({}, function(err, allItems){
            if(err) throw err;
            response.render('todo', {data: allItems});
        });
    });

    app.post('/todo', urlEncodedParser, function(request, response) {
        //handle request
        var item = Todo(request.body).save(function(err, data){
            if(err) throw err;
            console.log('Item saved');
            response.json(data);
        });

    });

    app.delete('/todo/:item', function(request, response) {
        //delete todo list item
        var itemToDelete = request.params.item.replace(/\-/g, ' ');
        Todo.find({item: itemToDelete}).remove(function(err, data){
            if(err) throw err;
            console.log('Item deleted');
            response.json(data);
        });
    });
};
