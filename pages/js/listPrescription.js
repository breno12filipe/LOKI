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

//Colocar-icone-PDF-nas-operações HeadMistress;
function buildTable(prescriptions){
    prescriptionTable = `<table id="prescription-table">
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
        prescriptions.forEach(prescription => {
        prescriptionTable += `
        <tr>
            <td>${prescription["title"]}</td>
            <td>${prescription['prescription_description']}</td>
            <td>${reverseFormatStringDate(prescription['register_date'])}</td>
            <td>
                <i class="bi bi-file-pdf" title="Baixar Documento" style="cursor: pointer" onclick="downloadPrescription(${prescription["prescription_id"]})"></i>
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
    
    $("#prescription-list").append(prescriptionTable);
    $("#prescription-table").DataTable();
}

function downloadPrescription(prescription_id){
    console.log(prescription_id)
    /*
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
    */
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

function performEditChanges(PrescriptionID){
    var title = $("#edit-prescription-title").val()
    var description = $("#edit-prescription-description").val()
    var body = $('#edit-prescription-summernote').val()
    var date = formatStringDate(getCurrentDate())

    if ($("#nutritional-prescription-radio:checked").val()){
        docPath = './docTemplates/nutritionalPrescription.html'
        type="nutritional"

    }else if ($("#medical-prescription-radio:checked").val()){
        docPath = './docTemplates/medicalPrescription.html'
        type="medical"
    }

    // não está conseguindo atualizar
    $.ajax({
        type: "PUT",
        url: "http://localhost:3333/updatePrescription",
        data: {
            "title": title,
            "description": description,
            "prescriptionText": body,
            "registerDate": date,
            "prescription_id": PrescriptionID,
            "patientId" : localStorage.getItem("patient"),
            "type": type,
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
