$(document).ready(function() {
    $("#exam-step-2").hide();
    $("#exam-step-3").hide();
    $("#exam-step-4").hide();
    $('#exam-summernote').summernote({
        height: 400,
        width: 1000
    })

    $('#biochemical-exam-summernote').summernote({
        height: 400,
        width: 1000
    })
})

$("#exam-step1-advance").click(function(){
    $("#exam-step-1").hide();
    $("#exam-step-btn-1").css('background-color', '#EFEFEF');
    $("#exam-step-btn-2").css('background-color', '#58af9b');
    $("#exam-step-2").show(1000);
})

$("#exam-step2-recede").click(function(){
    $("#exam-step-2").hide();
    $("#exam-step-btn-1").css('background-color', '#58af9b');
    $("#exam-step-btn-2").css('background-color', '#EFEFEF');
    $("#exam-step-1").show(1000);
})

$("#exam-step2-advance").click(function(){
    $("#exam-step-2").hide();
    $("#exam-step-btn-2").css('background-color', '#EFEFEF');
    $("#exam-step-btn-3").css('background-color', '#58af9b');
    $("#exam-step-3").show(1000);
})

$("#exam-step3-recede").click(function(){
    $("#exam-step-2").show(1000);
    $("#exam-step-btn-2").css('background-color', '#58af9b');
    $("#exam-step-btn-3").css('background-color', '#EFEFEF');
    $("#exam-step-3").hide();
})

$("#exam-step3-advance").click(function(){
    $("#exam-step-4").show(1000);
    $("#exam-step-btn-4").css('background-color', '#58af9b');
    $("#exam-step-btn-3").css('background-color', '#EFEFEF');
    $("#exam-step-3").hide();
})

$("#exam-step4-recede").click(function(){
    $("#exam-step-4").hide();
    $("#exam-step-btn-3").css('background-color', '#58af9b');
    $("#exam-step-btn-4").css('background-color', '#EFEFEF');
    $("#exam-step-3").show(1000);
})

function saveAnamnesis(){
    var title = $("#exam-title").val();
    var description = $("#exam-description").val();
    var examSummernote = $("#exam-summernote").val();
    var biochemicalSummernote = $("#biochemical-exam-summernote").val();
    if($("#PhysicalExamRadio").prop("checked")){
        var description = "physical_exam";
    }else{
        var description = "complementary_exam"
    }

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
            console.log(res)
            alert(res["responseText"]);
        },
        dataType: "json",
        async: true
    })
}


