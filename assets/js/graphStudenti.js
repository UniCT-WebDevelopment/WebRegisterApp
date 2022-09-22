const ctx = $("#myChart");
var richiestaPromossi = {
    "url": "/api/getCountPromossi",
    "method": "GET"
}

var richiestaBocciati = {
    "url": "/api/getCountRimandati",
    "method": "GET"
}

$.ajax(richiestaPromossi).done(function (promossi) {
    $.ajax(richiestaBocciati).done(function (rimandati) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Promossi', 'Rimandati'],
                datasets: [{
                    data: [promossi, rimandati],
                    backgroundColor: [
                        '#33CCCC',
                        '#FCB91C'
                    ],
                    hoverOffset: 3,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 14
                            },
                            color: "white",
                        }
                    }
                }
            }
        });

        let numStudentiPromossi = $("#numPromossi");
        numStudentiPromossi.text(promossi);

        let numStudentiRimandati = $("#numRimandati");
        numStudentiRimandati.text(rimandati);
    })
})


