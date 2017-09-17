var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
var pool = require('./modules/pool');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var tasks = require('./routes/tasks');


//app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public/'));

//routes
app.use('/', index);
app.use('/tasks', tasks);


app.listen(port, function () {
    console.log('listening on port', port);
});