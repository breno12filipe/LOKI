$(document).ready(function() {
    $("#telInput").mask("(00) 0-0000-0000");
    $("#dtInput").mask("99/99/9999");
    $("#CPFInput").mask("999.999.999-99");
    $("#RGInput").mask("9.999.999");
    $("#CEPInput").mask("99999-999");
});

function formatStringDate(data) {
    var day  = data.split("/")[0];
    var month  = data.split("/")[1];
    var year  = data.split("/")[2];
    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
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

    // é necessario tratar esses dados antes de fazer a requisição 
    // por exemplo o tipo date e os tipos numbers

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