if(window.location.pathname == "/studenti"){
    let input = document.querySelector("#searchStudentByMatricola");

    input.addEventListener("input", () => {
        let td,txtValue;

        let table = document.getElementById("tableStudenti")
        let tr = table.rows;

        for(let i=1;i<tr.length;i++){       
            td = tr[i].children[0];
            if(td){
                txtValue = td.textContent
                if(txtValue.indexOf(input.value.toUpperCase())>-1){
                    tr[i].style.display = "";
                }
                else{
                    tr[i].style.display = "none";
                }
            }
        }
    })

    let ondelete = $("table tbody tr td button a.deleteStud");
    ondelete.click(function () {
        var matricola = $(this).attr("data-matricola");

        var request = {
            "url": `/deleteStudente?matricola=${matricola}`,
            "method": "DELETE",
        }

        if (confirm("Vuoi davvero eliminare lo studente?")) {
            $.ajax(request).done(function (response) {
                alert("Studente eliminato con successo!");
                location.reload();
            })
        }
    })
}

if(window.location.pathname == "/updateStudente"){
    $(".updateStudente").submit(function(event){
        event.preventDefault();

        var unindexed_array = $(this).serializeArray();
        var data = {};

        $.map(unindexed_array, function(n,i){
            data[n['name']] = n['value'];
        });

        console.log("DATA TO UPDATE: ",data);

        var request = {
            "url" : `/updateStudente/edit?matricola=${data.matricola}`,
            "method": "PUT",
            "data": data
        }

        $.ajax(request).done(function(){
            alert("Studente aggiornato con successo!");
            window.location.href = "/studenti";
        })
    })
}

