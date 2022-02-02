$(document).ready(function() {
    $("#telInput").mask("(00) 0-0000-0000");
    $("#dtInput").mask("99/99/9999");
    $("#CPFInput").mask("999.999.999-99");
    $("#RGInput").mask("9.999.999");
    $("#CEPInput").mask("99999-999");

    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patient_id');

    if (typeof patientId != "null" && patientId != null){
        buildEditPatient(patientId)
    }
});


function buildEditPatient(patientId){
    $.ajax({
        type: "POST",
        url: "http://localhost:3333/getPatientByID",
        data: {
            "patient_id" : patientId
        },
        success: function(res){
            cpf = res[0]['cpf']
            if (cpf.split("").length == 10){
                var explodedCpfString = cpf.split("");
                explodedCpfString.unshift('0');
                var cpf = explodedCpfString.join("");
            }else{
                var cpf = form[4]
            }

            $("#patientTitle").text("Editar paciente");
            $("#patientName").val(res[0]['patient_name'])
            $("#telInput").val(res[0]['phone_number']);
            $("#dtInput").val(reverseFormatStringDate(res[0]['birth_date']));
            $("#CPFInput").val(cpf);
            $("#RGInput").val(res[0]['rg']);
            $("#CEPInput").val(res[0]['cep']);
            $("#patientEmail").val(res[0]['email']);
            $("#patientAddress").val(res[0]['patient_address']);
            $("#patientOccupation").val(res[0]['occupation']);
            $("#patientComorbidities").val(res[0]['comorbidities']);
            $("#sendBtn").text("Editar").attr("onclick","editPatient(this.form)");

        },
        dataType: "json",
        async: true
    })
    
}

function editPatient(form){
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patient_id');

    $.ajax({
        type: "PUT",
        url: "http://localhost:3333/updatePatient",
        data: {
            "patient_id": patientId,
            "name": form[0].value,
            "phone": form[1].value,
            "birth_date": formatStringDate(form[2].value),
            "CPF": form[3].value ,
            "RG": form[4].value,
            "CEP": form[5].value,
            "email" : form[6].value,
            "address": form[7].value,
            "occupation": form[8].value,
            "comorbidities": form[9].value
        },
        success: function(res){
            alert(JSON.stringify(res['responseText']))
            document.location.reload(true);
        },
        error: function(res){
            alert(JSON.stringify(res['responseText']));
        },
        dataType: "json",
        async: true
    })
    
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

function registerPatient(form){
    patientName = form[0].value
    patientPhone = form[1].value.replaceAll('-', '').replace('(','').replace(')','').replace(/\s/g, '');
    patientBirthDate = formatStringDate(form[2].value)
    patientCPF = form[3].value.replaceAll('.', '').replace('-','')
    patientRG = form[4].value.replaceAll('.', '')
    patientCEP = form[5].value.replaceAll('-', '')
    patientEmail = form[6].value
    patientAddress = form[7].value
    patientOccupation = form[8].value
    patientComorbidities = form[9].value

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/createPatient",
        data: 
            {
                "name" : patientName,
                "phone" : patientPhone,
                "birth_date": patientBirthDate,
                "CPF" : patientCPF,
                "RG" : patientRG,
                "CEP": patientCEP,
                "email": patientEmail,
                "address": patientAddress,
                "occupation": patientOccupation,
                "comorbidities": patientComorbidities
            },
        success: function(res){
            alert(JSON.stringify(res['responseText']));
        },
        error: function(res){
            alert(JSON.stringify(res['responseText']));
        },
        dataType: "json",
        async: true
    })
}