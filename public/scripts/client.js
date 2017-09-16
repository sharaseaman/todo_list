console.log('client js is working');

function onReady(){
    console.log('on ready working');
    $('#addButton').on('click', addTasks);
  getTasks();
}

function getTasks(){
    $("#taskTable").empty(); 
        $.ajax({
            method: 'GET',
            url: '/tasks',
            success: function(response){
                console.log('getTasks working', response);
            
        for (var i = 0; i < response.length; i++) {
            var $row = $('<tr></tr>');
            $row.append('<td>' + response[i].todo + '</td>');

            var $completeButton =$('<td><button class="completeMe" data-id="' + response[i].id + '">Complete</button></td>');
            $row.append($completeButton);

            var $deleteButton =$('<td><button class="deleteMe" data-id="' + response[i].id + '">Delete</button></td>');
            $row.append($deleteButton);

            $('#taskTable').append($row);
        }
     }
  });
}

function addTasks() {
     var taskAdd = {
     itemTask: $('#inputBox').val()
     };

     $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskAdd,
        success:function(response){
            console.log("sucess working in addTasks");
            getTasks();
        }
     });
}


$(document).ready(onReady);