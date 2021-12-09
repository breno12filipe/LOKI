$(document).ready(function() {
    $("#list-patients").DataTable();
});


function exitDashboard (){
    if (confirm("Deseja realmente sair?")){
        window.location.href="../index.html";
    }
}
