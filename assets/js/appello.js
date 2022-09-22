$("#formAddAppello").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });

    console.log("DATA TO UPDATE: ", data);

    var request = {
        "url": `/creaAppello/add`,
        "method": "POST",
        "data": data
    }

    $.ajax(request).done(function (response) {
        if (typeof response !== 'undefined') {
            let msg = document.createElement("p");
            let msgImg = document.createElement("img");
            let divMsg = document.getElementsByClassName("msgFromBackend")[0];

            msgImg.src = "../img/mario24px.png";
            msgImg.style.marginRight = "20px";

            msg.style.textAlign = "center";
            msg.style.color = "#FCB91C";
            msg.style.fontSize = "18px";
            msg.style.alignItems = "center";

            msg.textContent = response.msg;

            divMsg.style.display = "flex";

            divMsg.appendChild(msgImg);
            divMsg.appendChild(msg);

            if (divMsg) {
                setTimeout(() => {
                    divMsg.removeChild(msg);
                    divMsg.removeChild(msgImg);
                }, 2000);
            }
        }
        setTimeout(() => {
            window.location.href = "/visualizzaAppelli";
        }, 1500)
    })
})

$("#formUpdateAppello").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });

    console.log("DATA TO UPDATE: ", data);

    var request = {
        "url": `/updateAppello/edit/${data.idAppello}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Appello aggiornato con successo!");
        window.location.href = `/visualizzaAppelli`;
    })
})

//DELETE APPELLO
if (window.location.pathname == "/visualizzaAppelli") {
    $ondelete = $("table tbody tr td button a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id");

        var request = {
            "url": `visualizzaAppelli/api/deleteAppello/${id}`,
            "method": "DELETE",
        }

        if (confirm("Vuoi davvero eliminare l'appello?")) {
            $.ajax(request).done(function (response) {
                alert("Appello eliminato con successo!");
                location.reload();
            })
        }
    })
}

function updateFormula() {
    let formula = document.getElementById("formulaAppello").value.toLowerCase().replaceAll(" ",'');
    let btnFormula = document.getElementById("sendFormula");
    let idAppello = window.location.href.split("=")[1];
    btnFormula.addEventListener("click", () => {
        var request = {
            "url": `/updateFormulaAllEsami?idAppello=${parseInt(idAppello)}`,
            "method": "POST",
            "data": {
                formula: formula
            }
        }

        $.ajax(request).done(function (response) {
            location.reload();
        })
    })
}

if (window.location.pathname == "/appello") {
    let input = document.querySelector("#searchEsameByMatricola");

    input.addEventListener("input", () => {
        let td, txtValue;
        let str = input.value.toUpperCase();
        let table = document.getElementById("tableAppello")
        let tr = table.rows;

        for (let i = 1; i < tr.length; i++) {
            td = tr[i].children[0];
            if (td) {
                txtValue = td.textContent
                if (txtValue.indexOf(str) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    })
}