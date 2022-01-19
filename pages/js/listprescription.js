$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listPrescription",
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

function buildTable(prescriptions){
    prescriptionTable = `<table id="prescription-table">
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Data de registro</th>
                        <th>Operações</th> 
    //Colocar-icone-PDF-nas-operações HeadMistress;
                    </tr>
                </thead>
                <tbody>
            `
        prescriptions.forEach(prescription => {
        prescriptionTable += `
        <tr>
            <td>${prescription["title"]}</td>
            <td>${prescription['prescription_description']}</td>
            <td>${reverseFormatStringDate(prescription['register_date'])}</td>
            <td>
                <i class="bi bi-file-bar-graph" title="Ver Prescrição" style="cursor: pointer" onclick="AccessPrescription(${prescription["prescription_id"]})"></i>
                &nbsp;
                <i class="bi bi-pen" title="Editar Prescrição" style="cursor: pointer" onclick="editPrescription(${prescription["prescription_id"]})"></i>
                &nbsp;
                <!-- <i class="bi bi-trash" title="Deletar Prescrição" style="cursor: pointer" onclick="deletePrescription(${prescription["prescription_id"]})"></i> --> 
                </td>
        </tr>
        `;
    });
    prescriptionTable += `</tbody></table>`;

    $("#prescription-list").empty();
    $("#prescription-table").empty();
    
    $("#prescription-list").append(bioimpedanceTable);
    $("#prescription-table").DataTable();
}

function deleteBioimpedance(prescription_id){
    if (confirm("Deseja realmente deletar a Prescrição?")){
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3333/deletePrescription",
            data: {
                "prescription_id" : prescription_id
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

function AccessPrescription(prescription_id){
    $("#showPrescriptionDialog").dialog({
        width: 900,
        height: 600
    })
    
    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');
    

    $("#show-bioimpedace-summernote").summernote( {
        height: 350
    })

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/listPrescription",
        data: {
            "patient_id" : localStorage.getItem("patient")
        },
        success: function(res){
            $("#show-prescription-title").val(res[0]['title']);
            $("#show-prescription-description").val(res[0]['bioimpedance_description']);
            $('#show-prescription-summernote').summernote('reset');
            $('#show-prescription-summernote').summernote('disable')
            $('#show-prescription-summernote').summernote('pasteHTML', res[0]['body']);

        },
        async: true
    })
}

function editPrescription(prescription_id){
    //localStorage.removeItem("prescription");
    //localStorage.setItem("prescription",prescription_id);
    
    $("#EditPrescriptionDialog").dialog({
        width: 900,
        height: 600
    })

    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');
    
    $("#edit-prescription-summernote").summernote({
        height: 350
    })

    $("#edit-prescription-submit").attr('onclick', `performEditChanges(${prescription_id})`)

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getPrescriptionByID",
        data: {
            "prescription_id" : prescription_id
        },
        success: function(res){
            $("#edit-prescription-title").val(res[0]['title'])
            $("#edit-prescription-description").val(res[0]['prescription_description'])
            $('#edit-prescription-summernote').summernote('reset');
            $('#edit-prescription-summernote').summernote('pasteHTML', res[0]['body']);
        },
        async: true
    })
}

function performEditChanges(Prescription_ID){
    var title = $("#edit-prescription-title").val()
    var description = $("#edit-prescription-description").val()
    var body = $('#edit-prescription-summernote').val()
    var date = formatStringDate(getCurrentDate())

    $.ajax({
        type: "PUT",
        url: "http://localhost:3333/updatePrescription",
        data: {
            "title": title,
            "description": description,
            "prescriptionText": body,
            "registerDate": date,
            "prescription_id": PrescriptionID
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
