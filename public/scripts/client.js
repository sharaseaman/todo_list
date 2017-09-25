console.log('client js is working');

function onReady() {
    console.log('on ready working');
    $('#addButton').on('click', addTasks);
    $('#taskTable').on('click', '.deleteMe', deleteTask);
    $('#taskTable').on('click', '.completeMe', updateList);

    getTasks();
}

function getTasks() {
    $("#taskTable").empty();
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log('getTasks working', response);

            for (var i = 0; i < response.length; i++) {
                var $row = $('<tr type="checkbox"></tr>');
                $row.append('<td>' + response[i].todo + '</td>');

                var $completeButton = $('<td><button class="completeMe" data-id="' + response[i].id + '">Complete</button></td>');
                $row.append($completeButton);

                var $deleteButton = $('<td><button class="deleteMe" data-id="' + response[i].id + '">Delete</button></td>');
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
    $('#inputBox').val(''),

        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: taskAdd,
            success: function (response) {
                console.log("sucess working in addTasks");
                getTasks();
            }
        });
}

function deleteTask() {
    //console.log('deleteTask function');

    var thisId = $(this).data('id');
    //console.log('after var thisID', thisId);

    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + thisId,
        success: function (response) {
            //console.log('server response is', resp);              
            getTasks()
        }
    })
}

function updateList() {
    console.log('in the updateList');
    var thisIdcomp = $(this).data('id');
    var thisIdput = $(this).data('complete');

    var taskSend = {
        id: thisIdcomp,
        complete: thisIdput
    };
    //console.log('did i make it here');

    $.ajax({
        method: 'PUT',
        url: '/tasks/' + thisIdcomp,
        data: taskSend,
        success: function (response) {
            console.log('i made it to update success');
            getTasks();
        }
    })
}

function changeComp() {

}

$(document).ready(onReady);