$( document ).ready(function() {
    //$('.side-bar').load("../components/sidebar.html").hide().fadeIn('slow');;

    $(".side-bar").hide()
    hideAllModules();
    setTimeout(function(){ $('.side-bar').load("./components/sidebar.html").fadeIn('slow')}, 500);
    $('.side-bar').fadeOut('slow', function(){
        $('.side-bar').load("../components/sidebar.html", function(){
            $('.side-bar').fadeIn('slow');
            $('#transition').hide()
            showModules()
        })
    })
    // $('.top-bar').load("../components/topbar.html");
})

function hideAllModules(){
    $("#bioimpedance-reg-content").hide();
    $("#anamnesis-reg-content").hide();
    $("#list-anamnesis-module").hide();
    $("#exam-module").hide();
}

function showModules(){
    $("#bioimpedance-reg-content").show(100);
    $("#anamnesis-reg-content").show(100);
    $("#list-anamnesis-module").show(100);
    $("#exam-module").show(100);
}
