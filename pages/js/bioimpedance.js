$(document).ready(function() {
    $("#bioimpedance-step-2").hide();
    $("#bioimpedance-step-3").hide();
    $('#bioimpedace-summernote').summernote({
        height: 400,
        width: 1000
    })
    
})

function getCurrentDate(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;

    return dataAtual;
}

$("#bioimpedance-step1-advance").click(function(){
    $("#bioimpedance-step-1").hide();
    $("#bioimpedance-step-btn-1").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-btn-2").css('background-color', '#58af9b');
    $("#bioimpedance-step-2").show(1000);
})

$("#bioimpedance-step2-recede").click(function(){
    $("#bioimpedance-step-1").show(1000);
    $("#bioimpedance-step-btn-2").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-btn-1").css('background-color', '#58af9b');
    $("#bioimpedance-step-2").hide();
    $("#bioimpedance-step-3").hide();
})

$("#bioimpedance-step2-advance").click(function(){
    $("#bioimpedance-step-2").hide();
    $("#bioimpedance-step-btn-2").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-btn-3").css('background-color', '#58af9b');
    $("#bioimpedance-step-3").show(1000);

    $("#bioimpedance-title-conf").empty();
    $("#bioimpedance-desc-conf").empty();
    $("#bioimpedance-title-date").empty();

    $("#bioimpedance-title-conf").append(($("#bioimpedance-title").val()))
    $("#bioimpedance-desc-conf").append(($("#bioimpedance-description").val()))
    $("#bioimpedance-title-date").append( getCurrentDate() )
})

$("#bioimpedance-step3-recede").click(function(){
    $("#bioimpedance-step-2").show(1000);
    $("#bioimpedance-step-btn-2").css('background-color', '#58af9b');
    $("#bioimpedance-step-btn-3").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-3").hide();
})


function saveBioimpedance(form){
    console.log(form)
    // console.log($("#bioimpedance-title").val())
    // console.log($("#bioimpedance-description").val())
    // console.log($("#bioimpedace-summernote").val())
}
