$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listExams",
        data: {
            "patient_id" : localStorage.getItem("patient")
        },
        success: function(res){
            buildTable(res)
        },
        async: true
    })
});


function buildTable(exams){
    console.log(exams)
    examTable = `<table id="exam-table">
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
    exams.forEach(exam => {
        examTable += `
        <tr>
            <td>${exam["title"]}</td>
            <td>${exam['exam_description']}</td>
            <td>${reverseFormatStringDate(exam['exam_date'])}</td>
            <td>
                <i class="bi bi-file-bar-graph" title="Ver Exame" style="cursor: pointer" onclick=""></i>
                &nbsp;
                <i class="bi bi-pen" title="Editar Bioimpedancia" style="cursor: pointer" onclick=""></i>
                &nbsp;
                <!-- <i class="bi bi-trash" title="Deletar Bioimpedancia" style="cursor: pointer" onclick=""></i> --> 
                </td>
        </tr>
        `;
    });
    examTable += `</tbody></table>`;

    $("#exam-list").empty();
    $("#exam-table").empty();
    
    $("#exam-list").append(examTable);
    $("#exam-table").DataTable();
}