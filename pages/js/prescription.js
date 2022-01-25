$(document).ready(function() {
    $("#prescription-step-2").hide();
    $("#prescription-step-3").hide();
    $('#prescription-summernote').summernote({
        height: 400,
        width: 900,
    })

    $('#parentEditor').find("button[data-bs-original-title='Full Screen']").hide();
    $('#parentEditor').find("button[data-bs-original-title='Code View']").hide();
})

$("#prescription-step1-advance").click(function(){    
    $("#prescription-step-1").hide();
    $("#prescription-step-btn-1").css('background-color', '#EFEFEF');
    $("#prescription-step-btn-2").css('background-color', '#58af9b');
    $("#prescription-step-2").show(1000);
})

$("#prescription-step2-recede").click(function(){
    $("#prescription-step-1").show(1000);
    $("#prescription-step-btn-2").css('background-color', '#EFEFEF');
    $("#prescription-step-btn-1").css('background-color', '#58af9b');
    $("#prescription-step-2").hide();
    $("#prescription-step-3").hide();
})

$("#prescription-step2-advance").click(function(){
    $("#prescription-step-2").hide();
    $("#prescription-step-btn-2").css('background-color', '#EFEFEF');
    $("#prescription-step-btn-3").css('background-color', '#58af9b');
    $("#prescription-step-3").show(1000);

    $("#prescription-title-conf").empty();
    $("#prescription-desc-conf").empty();
    $("#prescription-title-date").empty();

    $("#prescription-title-conf").append(($("#prescription-title").val()));
    $("#prescription-desc-conf").append(($("#prescription-description").val()));
    $("#prescription-title-date").append(getCurrentDate());
})

$("#prescription-step3-recede").click(function(){
    $("#prescription-step-2").show(1000);
    $("#prescription-step-btn-2").css('background-color', '#58af9b');
    $("#prescription-step-btn-3").css('background-color', '#EFEFEF');
    $("#prescription-step-3").hide();
})


function savePrescription(){
    let title = $("#prescription-title").val();
    let description = $("#prescription-description").val();
    let text = $("#prescription-summernote").val();
    let date = formatStringDate(getCurrentDate());
    let patientID = localStorage.getItem("patient");

    if ($("#nutritional-prescription-radio:checked").val()){
        docPath = './docTemplates/nutritionalPrescription.html'
        type="nutritional"

    }else if ($("#medical-prescription-radio:checked").val()){
        docPath = './docTemplates/medicalPrescription.html'
        type="medical"
    }

    $.ajax({

        type: "POST",
        url: "http://localhost:3333/createPrescription",
        data: {
            "prescriptionText": text,
            "title": title,
            "description": description,
            "type": type,
            "PrescriptionText": text,
            "prescriptionDate": date,
            "patientId": patientID
        },
        success: function(res){
            alert(res["responseText"])
            document.location.reload(true);
        },
        error: function(res){
            alert(res["responseText"]);
        },
        dataType: "json",
        async: true
    })
}
