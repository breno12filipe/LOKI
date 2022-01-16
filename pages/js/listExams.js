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
                <i class="bi bi-file-bar-graph" title="Ver Exame" style="cursor: pointer" onclick="AccessExams(${exam["exam_id"]})"></i>
                &nbsp;
                <i class="bi bi-pen" title="Editar Bioimpedancia" style="cursor: pointer" onclick="editExam(${exam["exam_id"]})"></i>
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

function AccessExams(examId){
    $("#showExamDialog").dialog({
        width: 900,
        height: 600
    })
    
    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');
    

    $("#show-exam-summernote").summernote( {
        height: 350
    })

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getExamByID",
        data: {
            "exam_id" : examId
        },
        success: function(res){
            $("#show-exam-title").val(res[0]['title']);
            $("#show-exam-description").val(res[0]['exam_description']);
            $('#show-exam-summernote').summernote('reset');
            $('#show-exam-summernote').summernote('disable')
            $('#show-exam-summernote').summernote('pasteHTML', res[0]['body']);

        },
        async: true
    })
}

function editExam(exam_id){
    //localStorage.removeItem("bioimpedance");
    //localStorage.setItem("bioimpedance", bioimpedance_id);
    
    $("#EditExamDialog").dialog({
        width: 900,
        height: 600
    })

    $('.ui-dialog-titlebar-close').addClass('ui-icon ui-icon-closethick');
    
    $("#edit-exam-summernote").summernote({
        height: 350
    })

    $("#edit-exam-submit").attr('onclick', `performEditChanges(${exam_id})`)

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getExamByID",
        data: {
            "exam_id" : exam_id
        },
        success: function(res){
            $("#edit-exam-title").val(res[0]['title'])
            $("#edit-exam-description").val(res[0]['exam_description'])
            $('#edit-exam-summernote').summernote('reset');
            $('#edit-exam-summernote').summernote('pasteHTML', res[0]['body']);
        },
        async: true
    })
}

function performEditChanges(examID){
    var title = $("#edit-exam-title").val()
    var description = $("#edit-exam-description").val()
    var body = $('#edit-exam-summernote').val()
    var date = formatStringDate(getCurrentDate())
    if($("#physical-exam-radio").prop("checked")){
        var type = "physical";
    }else if ($("#biochemical-exam-radio").prop("checked")){
        var type = "biochemical";
    }

    $.ajax({
        type: "PUT",
        url: "http://localhost:3333/updateExam",
        data: {
            "examText": body,
            "examDate": date,
            "title": title,
            "type": type,
            "description": description,
            "patientId" : localStorage.getItem("patient"),
            "exam_id" : examID,

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
