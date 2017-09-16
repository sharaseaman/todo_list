var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
var pool = require('./modules/pool');

//app.use(express.static('/public'));
app.use(express.static('public/'));

app.listen(port, function () {
    console.log('listening on port', port);
});

app.get('/', function (req, res) {
    console.log('sending html');
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/tasks', function (req, res){ 
   // console.log('in /tasks');
    
    pool.connect(function (connectionError, client, done) {
      //  console.log('in pool connect');
        if (connectionError) {
          //  console.log('connection error if statement');    
            res.sendStatus(500);
        } else {
            //console.log('i made it to the else');
            
            client.query('SELECT * FROM tasks;', function (queryError, resultsObj) {
                done();
                if (queryError) {
                    res.sendStatus(500);
                } else {
                    res.send(resultsObj.rows);
                    console.log(resultsObj.rows);
                    
                }
            });
        }
    });
});