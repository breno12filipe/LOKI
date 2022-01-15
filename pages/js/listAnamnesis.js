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
                    <!-- <i class="bi bi-trash" title="Deletar Anamnese" style="cursor: pointer" onclick="deleteAnamnesis(${anamnesisItem["anamnesis_id"]})"></i> -->
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

function deleteAnamnesis(anamnesis_id){
    if (confirm("Deseja realmente deletar a anamnese?")){
        $.ajax({
            type: "POST",
            url: "http://localhost:3333/deleteAnamnesis",
            data: {
                "anamnesis_id" : anamnesis_id
            },
            success: function(res){
                alert(res)
                document.location.reload(true);
            },
            async: true
        })
    }
}

function editAnamnesis(anamnesis_id){
    $("#EditAnamnesisDialog").dialog({
        width: 900,
        height: 600
    })

    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');

    $("#edit-anamnesis-summernote").summernote({
        height: 350
    })

    $("#edit-anamnesis-submit").attr('onclick', `performEditChanges(${anamnesis_id})`)

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getAnamnesisByID",
        data: {
            "anamnesis_id" : anamnesis_id
        },
        success: function(res){
            $("#edit-anamnesis-title").val(res[0]['title'])
            $("#edit-anamnesis-description").val(res[0]['anamnesis_id_description'])
            $('#edit-anamnesis-summernote').summernote('reset');
            $('#edit-anamnesis-summernote').summernote('pasteHTML', res[0]['body']);
        },
        async: true
    })
}

function performEditChanges(anamnesis_id){
    var title = $("#edit-anamnesis-title").val()
    var description = $("#edit-anamnesis-description").val()
    var body = $('#edit-anamnesis-summernote').val()
    var date = formatStringDate(getCurrentDate())

    $.ajax({
        type: "PUT",
        url: "http://localhost:3333/updateAnamnesis",
        data: {
            "title": title,
            "description": description,
            "anamnesisText": body,
            "registerDate": date,
            "anamnesis_id": anamnesis_id,
            "patient_id": localStorage.getItem("patient")
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

function AccessAnamnesis(anamnesis_id){
    $("#showAnamnesisDialog").dialog({
        width: 900,
        height: 600
    })

    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');

    $("#show-anamnesis-summernote").summernote( {
        height: 350
    })

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listAnamnesis",
        data: {
            "patient_id" : localStorage.getItem("patient")
        },
        success: function(res){
            $("#show-anamnesis-title").val(res[0]['title']);
            $("#show-anamnesis-description").val(res[0]['anamnesis_description']);
            $('#show-anamnesis-summernote').summernote('reset');
            $('#show-anamnesis-summernote').summernote('disable');
            $('#show-anamnesis-summernote').summernote('pasteHTML', res[0]['body'])
            ;
        },
        async: true
    })
}