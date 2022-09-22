// al click del tasto invia, il client invia al server i nomi dei file csv
function sendFileProgettista(){    
    let file1 = document.querySelector("#file1").value.split("\\");

    let name = file1[file1.length-1];

    $.ajax({
        type: "POST",
        url: "/uploadFileProgettista",
        data: { nomeFile: name},
        dataType: "json",
        success: function(){
            console.log("OK");
        }
    })
}