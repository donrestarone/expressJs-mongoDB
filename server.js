// get express + bodyparser
const express = require('express');
const bodyParser = require('body-parser');
// production/test environment port setup
const port = process.env.PORT || 3000;

// connect to mongoDB, authenticate, and create a db object
var db
var MongoUsr = process.env.TODO_MONGO_USR;
var MongoPass = process.env.TODO_MONGO_PASS;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://${MongoUsr}:${MongoPass}@ds153980.mlab.com:53980/to-dos`, (err, database) => {
    if (err) return console.log(err);
    db = database.db('to-dos');
    app.listen(port, function(){
        console.log('listening on port 3000');
    });
});
// create instance of express
const app = express();
// invoke body parser for the app. here urlencoded method will enable you to access body parser date in the body property of the request object
app.use(bodyParser.urlencoded({extended: true}));
// invoke ejs/nunjucks as the view engine for templates
app.set('view engine', 'ejs');

// root path, will be using newer ES6 syntax after this.
app.get('/', function(req, res) {
    // get the collection of 'todos' from mongolab, disregard the irrelevant stuff and return the todos in an array
    var cursor = db.collection('todos').find().toArray(function(err, result){
        // render the template in the views folder, pass result from the array function to the view to be rendered as todos
        res.render('index.ejs', {todos: result});
    });

    
    // res.sendFile('root path works')
    // res.sendFile(__dirname + '/index.html')
});

app.post('/todos', (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        // when done redirect to root path
        res.redirect('/');
    });
});

