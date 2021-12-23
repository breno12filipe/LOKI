$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3333/listPatients",
        success: function(res){
            buildTable(res)
        },
        async: true
    })

});


function buildTable(patientsJson){
    patientTable = `<table id="patient-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Número de celular</th>
                        <th>CPF</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
            `
    patientsJson.forEach(patient => {
        console.log(patient['patient_id']);

        patientTable += `<tr>
                            <td>${patient['patient_name']}</td>
                            <td>${patient['phone_number']}</td>
                            <td>${patient['cpf']}</td>
                            <td>
                            <i class="bi bi-file-bar-graph" title="Ver prontuário" style="cursor: pointer" onclick="window.location.href='../dashboard.html'"></i>
                                &nbsp;
                                <i class="bi bi-pen" title="Editar Paciente"></i>
                                &nbsp;
                                <i class="bi bi-trash" title="Deletar Paciente"></i>
                            </td>
                         </tr>
        `;
        patientTable += `</tbody></table>`;

        $("#patient-list").append(patientTable);
        $("#patient-table").DataTable();
    });
}


function exitDashboard (){
    if (confirm("Deseja realmente sair?")){
        window.location.href="../index.html";
    }
}
