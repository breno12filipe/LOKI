$(".nav .nav-link").on("click", function(){
    console.log("CHEGOU")
    $(".nav").find(".active").removeClass("active");
});