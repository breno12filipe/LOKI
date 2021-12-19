$(document).ready(function() {
    $("#bioimpedance-step-2").hide();
    $("#bioimpedance-step-3").hide();
    $('#bioimpedace-summernote').summernote({
        height: 400,
        width: 1000
    })
    
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
})

$("#bioimpedance-step3-recede").click(function(){
    $("#bioimpedance-step-2").show(1000);
    $("#bioimpedance-step-btn-2").css('background-color', '#58af9b');
    $("#bioimpedance-step-btn-3").css('background-color', '#EFEFEF');
    $("#bioimpedance-step-3").hide();
})
