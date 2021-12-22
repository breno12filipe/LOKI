$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3333/listPatients",
        success: function(res){
            console.log(JSON.stringify(res));

        },
        async: true
    })

    $("#list-patients").DataTable();
});


function exitDashboard (){
    if (confirm("Deseja realmente sair?")){
        window.location.href="../index.html";
    }
}
