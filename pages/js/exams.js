$(document).ready(function() {
    $("#exam-step-2").hide();
    $("#exam-step-3").hide();
    $("#exam-step-4").hide();
})

$("#exam-step1-advance").click(function(){
    $("#exam-step-1").hide();
    $("#exam-step-2").show();
})

$("#exam-step2-recede").click(function(){
    $("#exam-step-2").hide();
    $("#exam-step-1").show();
})

$("#exam-step2-advance").click(function(){
    $("#exam-step-2").hide();
    $("#exam-step-3").show();
})

$("#exam-step3-recede").click(function(){
    $("#exam-step-2").show();
    $("#exam-step-3").hide();
})

$("#exam-step3-advance").click(function(){
    $("#exam-step-4").show();
    $("#exam-step-3").hide();
})

$("#exam-step4-recede").click(function(){
    $("#exam-step-4").hide();
    $("#exam-step-3").show();
})


