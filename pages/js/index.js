
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





