$(document).ready(function() {
    var socket = io();
    

socket.on('pergjigje',function(stock_status){
console.log(stock_status);
});



    socket.on('stocks',function(text1){
        $("#project").append("<div id='"+text1+"'>\
            <p> "+text1+"</p>\
            <button class='btn btn-danger'>X </button>\
            </div>")
    });

    socket.on("delete",function(parent_id){
    $("#"+parent_id).remove();
    $("input[name='"+parent_id+"']").remove();

    });



    $(document).on("click" ,".btn-danger",function(){
    var parent_id=$(this).parent().attr("id");

    socket.emit("message",parent_id);

    });


    $("#text").on("keydown",function(event){// selektojme id e inputit ne front end 
        if(event.keyCode==13){// nqs ky kodi eshte enter 
        event.preventDefault();
        var text1=$("#text").val();//merr vleren e inputit nga front endi
        socket.emit("text", text1);// dergoj me .emit 

        }
        


    });



        

});