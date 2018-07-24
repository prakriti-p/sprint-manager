var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //to parse the body data in api requests from clients
var path = require('path');
var open = require('open');

var app = express();   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var port = process.env.PORT || 3000;

var db;
if(process.env.ENV === "Test") {
    //db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/teammanager');
}

var Book = require('./models/bookModel'); 
var Team = require('./models/teamModel');
bookRouter = require('./Routes/bookRoutes')(Book);
teamRouter = require('./Routes/teamRoutes')(Team);

app.use('/api', bookRouter);
app.use('/api', teamRouter);

app.get('/', function(request, response) {
    //response.send("Gulp started this website! Welcome to our website!");
    response.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, function(err) {
    if(err)
        console.log("Some Error Occurred:  ", err);
    else {
        console.log("Running on PORT:  ", port);
        open('http://localhost:8000');
    }
    
})  

module.exports = app;