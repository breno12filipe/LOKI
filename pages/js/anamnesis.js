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

    $("#anamnesis-title-conf").empty();
    $("#anamnesis-desc-conf").empty();
    $("#anamnesis-title-date").empty();
    
    $("#anamnesis-title-conf").append(($("#anamnesis-title").val()));
    $("#anamnesis-desc-conf").append(($("#anamnesis-description").val()));
    $("#anamnesis-title-date").append(getCurrentDate());
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

function saveAnamnesis(){
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
            alert(res["responseText"]);
            document.location.reload(true);
        },
        error: function(res){
            alert(res["responseText"]);
        },
        dataType: "json",
        async: true
    })
}