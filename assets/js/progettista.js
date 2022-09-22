if(window.location.pathname == "/progettisti"){
    let input = document.querySelector("#searchProgettistaByMatricola");

    input.addEventListener("input", () => {
        let td,txtValue;

        let table = document.getElementById("tableProgettista")
        let tr = table.rows;
        for(let i=1;i<tr.length;i++){       
            td = tr[i].children[1];
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
}

$("#btn_addProgettista").on("click",function(){
    $("#c_formAddProgettista").css({"display":"flex"});
    $("#btn_removeFormProg").css({"display":"block"});
});

$("#btn_removeFormProg").on("click",function(){
    console.log("ciao222");
    $("#c_formAddProgettista").css({"display":"none"});
    $("#btn_removeFormProg").css({"display":"none"});
});

$("#formAddProgettista").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value'];
    });

    console.log("DATA TO UPDATE: ",data);

    var request = {
        "url" : `/creaProgettista`,
        "method": "POST",
        "data": data
    }

    $.ajax(request).done(function(){
        alert("Progettista aggiunto con successo!");
        window.location.href = "/progettisti";
    })
})

$(".updateProgettista").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value'];
    });

    console.log("DATA TO UPDATE: ",data);

    var request = {
        "url" : `/updateProgettista/edit?matricola=${data.matricola}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(){
        alert("Progettista aggiornato con successo!");
        window.location.href = "/progettisti";
    })
})

let ondelete = $("table tbody tr td button a.deleteProg");
ondelete.click(function(){
    var matricola = $(this).attr("data-matricola");

    var request = {
        "url" : `/deleteProgettista?matricola=${matricola}`,
        "method": "DELETE",
    }

    if(confirm("Vuoi davvero eliminare il progetto?")){
        $.ajax(request).done(function(response){
            alert("progetto eliminato con successo!");
            location.reload();
        })
    }
})
