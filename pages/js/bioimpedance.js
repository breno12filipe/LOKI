$(document).ready(function() {
    $("#bioimpedance-step-2").hide();
    $("#bioimpedance-step-3").hide();
    $('#bioimpedace-summernote').summernote({
        height: 400,
        width: 1000
    })

    $('#parentEditor').find("button[data-bs-original-title='Full Screen']").hide();
    $('#parentEditor').find("button[data-bs-original-title='Code View']").hide();
})

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

    $("#bioimpedance-title-conf").append(($("#bioimpedance-title").val()));
    $("#bioimpedance-desc-conf").append(($("#bioimpedance-description").val()));
    $("#bioimpedance-title-date").append(getCurrentDate());
})

$("#bioimpedance-step3-recede").click(function(){
    $("#bioimpedance-step-2").show(1000);
    $("#bioimpedance-step-btn-2").css('background-color', '#58af9b');
    $("#bioimpedance-step-btn-3").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-3").hide();
})


function saveBioimpedance(){
    let title = $("#bioimpedance-title").val();
    let description = $("#bioimpedance-description").val();
    let text = $("#bioimpedace-summernote").val();
    let date = formatStringDate(getCurrentDate());
    let patientID = localStorage.getItem("patient");

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/createBioimpedance",
        data: {
            "title": title,
            "description": description,
            "bioimpedanceText": text,
            "registerDate": date,
            "patient_id": patientID
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
