$(document).ready(function() {
    $("#login-loader").hide();
})


$("#signin").click(function(){
    $('body').attr('class', "sign-in-js" )
})

$("#signup").click(function(){
    $('body').attr('class', "sign-up-js" )
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
            $("#login-loader").show()
        },
        complete: function () {
            $("#login-loader").hide()
        },
        success: function(res){
            alert(JSON.stringify(res['responseText']));
        },
        error: function(res){
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
        success: function(res){
            if(typeof res['responseText'] == "undefined"){
                alert("Usuário ou senha incorretos!")
            }else{
                window.location.href="./dashboard/patientDashboard.html"
            }
        },
        error: function(res){
            console.log(JSON.stringify(res['responseText']));
            
        },
        dataType: "json",
        async: true
    })
}





