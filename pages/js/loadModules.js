$( document ).ready(function() {
    $('.side-bar').load("../components/sidebar.html").hide().fadeIn('slow');;
    // $('.top-bar').load("../components/topbar.html");

})

// document.addEventListener("DOMContentLoaded", function() {
//     var request = new XMLHttpRequest();

//     request.open('GET', '../components/sidebar.html', true);

//     request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {
//         var resp = request.responseText;

//         document.querySelector('.side-bar').innerHTML = resp;
//     }
//     };

//     request.send();
// });
  
