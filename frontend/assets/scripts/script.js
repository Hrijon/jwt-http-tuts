$(document).ready(function(){
    $("#newuser").on("click", function(){
        var user = $("#user").val();
        var password = $("#password").val();
    
        $.ajax({
            url : "/backend/newuser",
            method  : "post",
            data    : {
                "user"    : user,
                "password"    : password
            }
        });

    });


});