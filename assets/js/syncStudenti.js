/**
 * Sync data html with graphs
 */
if(window.location.pathname=='/'){ 
    counterEsaminati();
    counterRegistrati();
    // $(document).ready(function () {
    //     $("#counterEsaminati").counterUp({
    //         delay: 10,
    //         time: 800
    //     })

    //     $("#counterStudente").counterUp({
    //         delay: 10,
    //         time: 600
    //     })
    // });
}

function counterEsaminati(){
    let request1 = {
        "url": "/api/getCountEsame",
        "method": "GET",
    }
    
    $.ajax(request1).done(function (response) {
        $("#counterEsaminati").text(response[0].res);
    });
}


function counterRegistrati(){
    let request2 = {
        "url": "/getCountStudente",
        "method": "GET",
    }

    $.ajax(request2).done(function (response) {
        $("#counterStudente").text(response[0].res);
    });
}




