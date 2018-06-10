// get express + bodyparser
const express = require('express');
const bodyParser = require('body-parser');
// connect to mongoDB, authenticate, and create a db object
var db
var MongoUsr = process.env.TODO_MONGO_USR;
var MongoPass = process.env.TODO_MONGO_PASS;
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(`mongodb://${MongoUsr}:${MongoPass}@ds153980.mlab.com:53980/to-dos`, (err, database) => {
    if (err) return console.log(err);
    db = database.db('to-dos');
    app.listen(3000, function(){
        console.log('listening on port 3000');
    });
});
// create instance of express
const app = express();
// invoke body parser for the app. here urlencoded method will enable you to access body parser date in the body property of the request object
app.use(bodyParser.urlencoded({extended: true}));
// app is listening on port 3000, when deployed use ENV variable here instead


// root path, will be using newer ES6 syntax after this.
app.get('/', function(req, res) {
    // res.sendFile('root path works');
    res.sendFile(__dirname + '/index.html')
});

app.post('/todos', (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        // when done redirect to root path
        res.redirect('/');
    });
});

