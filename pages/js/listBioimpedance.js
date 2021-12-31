$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listBioimpedance",
        data: {
            "patient_id" : localStorage.getItem("patient")
        },
        success: function(res){
            buildTable(res)
        },
        async: true
    })
});

function reverseFormatStringDate(date){
    let formattedDate = String(date.split("T").splice(0, 1));
    formattedDate = formattedDate.split("-");
    formattedStringDate = `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;
    return formattedStringDate;
}

function buildTable(bioimpedances){
    bioimpedanceTable = `<table id="bioimpedance-table">
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
        bioimpedances.forEach(bioimpedance => {
        bioimpedanceTable += `
        <tr>
            <td>${bioimpedance["title"]}</td>
            <td>${bioimpedance['bioimpedance_description']}</td>
            <td>${reverseFormatStringDate(bioimpedance['register_date'])}</td>
            <td>
                <i class="bi bi-file-bar-graph" title="Ver Bioimpedancia" style="cursor: pointer" onclick="AccessBioimpedance(${bioimpedance["bioimpedance_id"]})"></i>
                &nbsp;
                <i class="bi bi-pen" title="Editar Bioimpedancia" style="cursor: pointer" onclick="editBioimpedance(${bioimpedance["bioimpedance_id"]})"></i>
                &nbsp;
                <i class="bi bi-trash" title="Deletar Bioimpedancia" style="cursor: pointer" onclick="deleteBioimpedance(${bioimpedance["bioimpedance_id"]})"></i>
                </td>
        </tr>
        `;
    });
    bioimpedanceTable += `</tbody></table>`;

    $("#bioimpedance-list").empty();
    $("#bioimpedance-table").empty();
    
    $("#bioimpedance-list").append(bioimpedanceTable);
    $("#bioimpedance-table").DataTable();
}

function deleteBioimpedance(bioimpedance_id){
    if (confirm("Deseja realmente deletar a bioimpedância?")){
        $.ajax({
            type: "POST",
            url: "http://localhost:3333/deleteBioimpedance",
            data: {
                "bioimpedance_id" : bioimpedance_id
            },
            success: function(res){
                alert(res)
                document.location.reload(true);
            },
            async: true
        })
    }else{
        console.log("a")
    }
}

function editBioimpedance(bioimpedance_id){
    localStorage.removeItem("bioimpedance");
    localStorage.setItem("bioimpedance", bioimpedance_id);
    window.location.href='./bioimpedance.html';
    
    
}
