$(".nav .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
});


function exitDashboard(){
    exit = confirm("Deseja realmente sair?");
    exit ? window.location="index.html" : ""
}