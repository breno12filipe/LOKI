$(document).ready(function() {
    $("#exam-step-2").hide();
    $("#exam-step-3").hide();
    $("#exam-step-4").hide();
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
    $("#exam-step-1").show();
})

$("#exam-step2-advance").click(function(){
    $("#exam-step-2").hide();
    $("#exam-step-btn-2").css('background-color', '#EFEFEF');
    $("#exam-step-btn-3").css('background-color', '#58af9b');
    $("#exam-step-3").show(1000);
})

$("#exam-step3-recede").click(function(){
    $("#exam-step-2").show();
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
    $("#exam-step-3").show();
})


