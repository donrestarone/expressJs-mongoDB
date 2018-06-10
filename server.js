const express = require('express');
const app = express();

// app is listening on port 3000, when deployed use ENV variable here instead
app.listen(3000, function(){
    console.log('listening on port 3000');
});

// root path, will be using newer ES6 syntax after this.
app.get('/', function(req, res) {
    // res.sendFile('root path works');
    res.sendFile(__dirname + '/index.html')
});

