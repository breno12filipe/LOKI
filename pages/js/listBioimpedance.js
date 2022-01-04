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

function getCurrentDate(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;

    return dataAtual;
}

function formatStringDate(date) {
    var day  = date.split("/")[0];
    var month  = date.split("/")[1];
    var year  = date.split("/")[2];
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
}


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
    //localStorage.removeItem("bioimpedance");
    //localStorage.setItem("bioimpedance", bioimpedance_id);
    
    $("#EditBioimpedanceDialog").dialog({
        width: 900,
        height: 600
    })
    
    $("#edit-bioimpedace-summernote").summernote({
        height: 350
    })

    $("#edit-bioimpedance-submit").attr('onclick', `performEditChanges(${bioimpedance_id})`)

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getBioimpedanceByID",
        data: {
            "bioimpedance_id" : bioimpedance_id
        },
        success: function(res){
            $("#edit-bioimpedance-title").val(res[0]['title'])
            $("#edit-bioimpedance-description").val(res[0]['bioimpedance_description'])
            $('#edit-bioimpedace-summernote').summernote('pasteHTML', res[0]['body']);
        },
        async: true
    })
}

function performEditChanges(bioimpedanceID){
    console.log(bioimpedanceID)
    var title = $("#edit-bioimpedance-title").val()
    var description = $("#edit-bioimpedance-description").val()
    var body = $('#edit-bioimpedace-summernote').val()
    var date = formatStringDate(getCurrentDate())

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/updateBioimpedance",
        data: {
            "title": title,
            "description": description,
            "anamnesisText": body,
            "registerDate": date,
            "bioimpedance_id": bioimpedanceID
        },
        success: function(res){
            alert(res["responseText"])
            document.location.reload(true);
        },
        error: function(res){
            console.log(res)
            alert(res["responseText"]);
        },
        dataType: "json",
        async: true
    })


}
