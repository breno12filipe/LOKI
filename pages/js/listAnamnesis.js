$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listAnamnesis",
        data: {
            "patient_id" : localStorage.getItem("patient")
        },
        success: function(res){
            
            buildTable(res)
        },
        async: true
    })
    
} );

function reverseFormatStringDate(date){
    let formattedDate = String(date.split("T").splice(0, 1));
    formattedDate = formattedDate.split("-");
    formattedStringDate = `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;
    return formattedStringDate;
}


function buildTable(anamnesis){
    anamnesisTable = `<table id="anamnesis-table">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Data de registro</th>
                        <th>Operações</th>
                    </tr>
                </thead>
                <tbody>
            `
        anamnesis.forEach(anamnesisItem => {
            anamnesisTable += `
            <tr>
                <td>${anamnesisItem["title"]}</td>
                <td>${anamnesisItem['anamnesis_description']}</td>
                <td>${reverseFormatStringDate(anamnesisItem['register_date'])}</td>
                <td>
                    <i class="bi bi-file-bar-graph" title="Ver Anamnese" style="cursor: pointer" onclick="AccessAnamnesis(${anamnesisItem["anamnesis_id"]})"></i>
                    &nbsp;
                    <i class="bi bi-pen" title="Editar Anamnese" style="cursor: pointer" onclick="editAnamnesis(${anamnesisItem["anamnesis_id"]})"></i>
                    &nbsp;
                    <i class="bi bi-trash" title="Deletar Anamnese" style="cursor: pointer" onclick="deleteAnamnesis(${anamnesisItem["anamnesis_id"]})"></i>
                    </td>
            </tr>
            `;
    });

    anamnesisTable += `</tbody></table>`;

    $("#anamnesis-list").empty();
    $("#anamnesis-table").empty();
    
    $("#anamnesis-list").append(anamnesisTable);
    $("#anamnesis-table").DataTable();


}