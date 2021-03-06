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

        // Tratando erro quando cpf inicia com digito 0, obs: não consegui 
        // encontrar uma solução específica para com o registro no banco, estudar...
        if (patient['cpf'].split("").length == 10){
            var explodedCpfString = patient['cpf'].split("");
            explodedCpfString.unshift('0');
            patient['cpf'] = explodedCpfString.join("");
        }


        patientTable += `<tr patientId="${patient["patient_id"]}">
                            <td>${patient['patient_name']}</td>
                            <td>${patient['phone_number']}</td>
                            <td>${patient['cpf']}</td>
                            <td>
                            <i class="bi bi-file-bar-graph" title="Ver prontuário" style="cursor: pointer" onclick="accessMedicalReport(${patient["patient_id"]})"></i>
                                &nbsp;
                                <i class="bi bi-pen" title="Editar Paciente" style="cursor: pointer" onclick="editPatient(${patient["patient_id"]})"></i>
                                &nbsp;
                                <!-- <i class="bi bi-power" title="Desativar Paciente" style="cursor: pointer" onclick="deletePatient(${patient["patient_id"]})"></i> -->
                            </td>
                         </tr>
        `;
    });
    patientTable += `</tbody></table>`;

    $("#patient-list").empty();
    $("#patient-table").empty(); 
    
    $("#patient-list").append(patientTable);
    $("#patient-table").DataTable();
}

function accessMedicalReport(patientID){
    localStorage.removeItem("patient");
    localStorage.setItem("patient", patientID);
    window.location.href='../dashboard.html';
}

function editPatient(patientID){
    window.location.href=`../registerPatient.html?patient_id=${patientID}`;
}

function deletePatient(patientID){
    if (confirm("Deseja realmente deletar o paciente? Todos os documentos relacionados a ele também vão ser deletados!")){
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3333/deletePatient",
            data: {
                "patient_id" : patientID
            },
            success: function(res){
                document.location.reload(true);
            },
            dataType: "json",
            async: true
        })
    }
}


function exitDashboard (){
    if (confirm("Deseja realmente sair?")){
        window.location.href="../index.html";
    }
}
