console.log('client js is working');

function onReady(){
    console.log('on ready working');
    
}

function getTasks(){
    $("#mainTable").empty(); 
        $.ajax()({
            type: 'GET',
            url: '/tasks',
            success: function(response){
                console.log('getTasks working');
            }
        });
}








$(document).ready(onReady);