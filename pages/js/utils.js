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

function loadModule(url, target, method){
    if (method == "append"){
        $.ajax({
            type: "GET",
            url: url,
            success: function(res){
                $(target).append(res)
            },
            dataType: "html",
            async: false
        })
    }else if (method == "prepend"){
        $.ajax({
            type: "GET",
            url: url,
            success: function(res){
                $(target).prepend(res)
            },
            dataType: "html",
            async: false
        })
    }
}