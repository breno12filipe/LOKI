$(document).ready(function() {
    $('#rich-text-editor').richText();
    $("#anamnesis-step-2").hide();
    $("#anamnesis-step-3").hide();
});

function saveAnamnesis(){
    console.log( $("#editor").val() );
}

$("#anamnesis-step1-advance").click(function(){
    $("#anamnesis-step-1").hide();
    $("#anamnesis-step-btn-1").css('background-color', '#EFEFEF');
    $("#anamnesis-step-btn-2").css('background-color', '#58af9b');
    $("#anamnesis-step-2").show(1000);
})


$("#anamnesis-step2-advance").click(function(){
    $("#anamnesis-step-2").hide();
    $("#anamnesis-step-btn-2").css('background-color', '#EFEFEF');
    $("#anamnesis-step-btn-3").css('background-color', '#58af9b');
    $("#anamnesis-step-3").show();
})


$("#anamnesis-step3-recede").click(function(){
    $("#anamnesis-step-2").show();
    $("#anamnesis-step-btn-2").css('background-color', '#58af9b');
    $("#anamnesis-step-btn-3").css('background-color', '#EFEFEF');
    $("#anamnesis-step-3").hide();
})

$("#anamnesis-step2-recede").click(function(){
    $("#anamnesis-step-1").show();
    $("#anamnesis-step-btn-1").css('background-color', '#58af9b');
    $("#anamnesis-step-btn-2").css('background-color', '#EFEFEF');
    $("#anamnesis-step-2").hide();
})

// desta forma conseguimos pegar o conteúdo de dentro do editor de texto rico
//console.log($("#editor")[0].innerHTML)