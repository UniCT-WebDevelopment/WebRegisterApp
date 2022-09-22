const mysql = require("mysql");
const config = require("../../config.json");

var connection = mysql.createConnection({
    host: config.hostname,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

connection.connect(function(error){
    if(error){
        console.log("Errore connessione al Database");
        throw error;
    }else{
        console.log("Connessione al Database avvenuta con successo!");
    }
})

module.exports = connection;