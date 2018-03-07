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

    $("#login").on("click", function(){
        var user = $("#user").val();
        var password = $("#password").val();

        $.ajax({
            url : "/login",
            method  : "post",
            data    : {
                user    : user,
                password    : password
            },
            success :function(data){
                console.log(data);
            },
            error : function(error){
                console.log(error);
            }
            
        })


    });

    $("#logout").on("click", function(){
        $.ajax({
            url : "/logout",
            method  : "get",
            success     : function(data){
                console.log(data);
            },
            error   : function(error){
                console.log (error);
            }

        })

    });

});

