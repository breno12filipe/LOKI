$(document).ready(function() {
    $('#rich-text-editor').richText();
    $("#anamnesis-step-2").hide();
    $("#anamnesis-step-3").hide();
    $('#anamnesis-summernote').summernote({
        height: 400,
        width: 1000
    });

    $("#anamnesis-summernote").parent().find("button[data-bs-original-title='Full Screen']").hide()
    $("#anamnesis-summernote").parent().find("button[data-bs-original-title='Code View']").hide()
});

function getCurrentDate(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;

    return dataAtual;
}

function formatStringDate(date) {
    var day  = date.split("/")[0];
    var month  = date.split("/")[1];
    var year  = date.split("/")[2];
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
}

function saveAnamnesis(){
    console.log( $("#editor").val() );

    let title = $("#anamnesis-title").val();
    let description = $("#anamnesis-description").val();
    let text = $("#anamnesis-summernote").val();
    let date = formatStringDate(getCurrentDate());
    let patientID = localStorage.getItem("patient");

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/createAnamnesis",
        data: {
            "title": title,
            "description": description,
            "anamnesisText": text,
            "registerDate": date,
            "patient_id": patientID
        },
        success: function(res){
            alert(res["responseText"])
            document.location.reload(true);
        },
        error: function(res){
            console.log(res)
            alert(res["responseText"]);
        },
        dataType: "json",
        async: true
    })
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
    $("#anamnesis-step-3").show(1000);
})


$("#anamnesis-step3-recede").click(function(){
    $("#anamnesis-step-2").show(1000);
    $("#anamnesis-step-btn-2").css('background-color', '#58af9b');
    $("#anamnesis-step-btn-3").css('background-color', '#EFEFEF');
    $("#anamnesis-step-3").hide();
})

$("#anamnesis-step2-recede").click(function(){
    $("#anamnesis-step-1").show(1000);
    $("#anamnesis-step-btn-1").css('background-color', '#58af9b');
    $("#anamnesis-step-btn-2").css('background-color', '#EFEFEF');
    $("#anamnesis-step-2").hide();
})

// desta forma conseguimos pegar o conteúdo de dentro do editor de texto rico
//console.log($("#editor")[0].innerHTML)