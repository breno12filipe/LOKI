$(document).ready(function() {
    $("#login-loader").hide();
})


$("#signin").click(function(){
    $('body').attr('class', "sign-in-js" )
})

$("#signup").click(function(){
    $('body').attr('class', "sign-up-js" )
})

$("#login-eye").click(function(){
    if ($("#login-eye").attr("state") == "closed"){
        $("#login-eye").attr("state", "open")
        $("#login-eye").removeClass("fa-eye-slash")
        $("#login-eye").addClass("fa-eye")
        $("#login-password").attr("type", "text")
    }else if ($("#login-eye").attr("state") == "open"){
        $("#login-eye").attr("state", "closed")
        $("#login-eye").removeClass("fa-eye")
        $("#login-eye").addClass("fa-eye-slash")
        $("#login-password").attr("type", "password")
    }
})

function registerUser(form){
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/createUser",
        data: {
            "email": form[0].value,
            "password": form[1].value,
            "role": "root"
        },
        beforeSend: function () {
            $("#login-loader").show();
        },
        success: function(res){
            $("#login-loader").hide();
            alert(JSON.stringify(res['responseText']));
        },
        error: function(res){
            $("#login-loader").hide();
            alert(JSON.stringify(res['responseText']));
        },
        dataType: "json",
        async: true
    })
}

function authenticateUser(form){
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/authenticateUser",
        data: {
            "email": form[0].value,
            "password": form[1].value
        },
        beforeSend: function () {
            $("#login-loader").show()
            
        },
        success: function(res){
            if(typeof res['responseText'] == "undefined"){
                $("#login-loader").hide()
                alert("Usuário ou senha incorretos!")
            }else{
                $("#login-loader").hide()
                window.location.href="./dashboard/patientDashboard.html"
            }
        },
        error: function(res){
            $("#login-loader").hide()
            console.log(JSON.stringify(res['responseText']));
            
        },
        dataType: "json",
        async: true
    })
}





