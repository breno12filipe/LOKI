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

    $("#exam-title-conf").text($("#exam-title").val())
    $("#exam-desc-conf").text($("#exam-description").val())
    $("#exam-type-conf").text($("#exam-header").text())
    $("#exam-title-date").text(getCurrentDate())
})

$("#exam-step3-recede").click(function(){
    $("#exam-step-2").show(1000);
    $("#exam-step-btn-2").css('background-color', '#58af9b');
    $("#exam-step-btn-3").css('background-color', '#EFEFEF');
    $("#exam-step-3").hide();
})



$("#physical-exam-radio").on("click", function() {
    $("#exam-header").text("Exame Físico");
});

$("#biochemical-exam-radio").on("click", function() {
    $("#exam-header").text("Exame Bioquímico");
});


function saveExam(){
    var title = $("#exam-title").val();
    var description = $("#exam-description").val();
    var examSummernote = $("#exam-summernote").val();
    if($("#physical-exam-radio").prop("checked")){
        var type = "physical";
    }else if ($("#biochemical-exam-radio").prop("checked")){
        var type = "biochemical";
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/createExam",
        data: {
            "examText": examSummernote,
            "examDate": formatStringDate(getCurrentDate()),
            "title": title,
            "type": type,
            "description": description,
            "patientId" : localStorage.getItem("patient")
        },
        success: function(res){
            alert(res["responseText"])
            document.location.reload(true);
        },
        error: function(res){
            alert(res["responseText"])
            document.location.reload(true);
        },

        dataType: "json",
        async: true
    })
    
}


