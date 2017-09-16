var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.use(express.static('/public'));

app.listen(port, function(){
    console.log('listening on port', port);
  });

  app.get('/',function(req, res){
      console.log('sending html');
      res.sendFile(path.join(__dirname + '../public/views/index.html'));
    });
