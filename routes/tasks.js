var router = require('express').Router();
var pool = require('../modules/pool');


router.get('/', function (req, res) {
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
                   // console.log(resultsObj.rows);

                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var newTask = req.body.itemTask;
   // console.log('in tasks post');
    
    pool.connect(function (connectionError, client, done) {
       // console.log('in pool connect post');
        if (connectionError) {
         //  console.log('in connectionError if ');
            
            res.sendStatus(500);
        } else {
           // console.log('pool connect else');
            
            var param1 = 'INSERT INTO tasks (todo) VALUES ($1)';
            var param2 = [newTask];
            client.query(param1, param2, function (queryError, resultsObj) {
                
                    done();
                    if (queryError) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});

router.delete('/:id', function(req,res){
   // console.log('app.delete ');
    
    var dbInfo = req.params.id;
    //console.log('app.delete function');
    
    pool.connect(function(connectionError, client, done){

        if (connectionError){
            res.sendStatus(500);
        }else{
            client.query('DELETE FROM tasks WHERE id=$1;', [dbInfo], function(queryError, resultsObj){
                done();
            if (queryError){
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
            });
        } 
    });
});//end app.delete 

router.put('/:id', function(req, res){
   // console.log('app put function');
    var taskCompletedId = req.params.id;
    var taskState = req.body.state;

    var updated = 'false';
    
        if (taskState == 'false') {
            updated = 'true';
        } else if (taskState == 'true') {
            updated = 'false';
        } else {
           // console.log('where?');
            updated = 'false';
        }
        
    pool.connect(function(connectionError, client, done){
             //  console.log('did i make it to this area');

                if (connectionError){                    
                    res.sendStatus(500);
                    
                }else{
                    client.query('UPDATE tasks SET complete=true WHERE id=$1;', [updated.taskCompletedId], function(queryError, resultsObj){
                        
                        done();
                    if (queryError){
                        res.sendStatus(500);
                        
                    } else {
                        res.sendStatus(200);
                    }
                    });
                } 
            });
});
module.exports = router;
