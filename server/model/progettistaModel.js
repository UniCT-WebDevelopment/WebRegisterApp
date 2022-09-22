const sql = require("../database/dbConnection");

let progettisti = sql.query("create table if not exists progettista(idAppello bigint unsigned not null, matricola varchar(10) not null, voto int unsigned not null check(voto>=18 and voto<=31), votoProgetto int unsigned not null, votoFinale varchar(4) not null, dataConsegna varchar(35) not null, esito varchar(20) not null, titoloProgetto varchar(60) not null, foreign key (idAppello) references appello(idAppello), foreign key(matricola) references esame(matricola) on delete cascade, primary key(matricola))");

function creaProgettista(req,callback){
    const idAppello = req.body.idAppello;
    const matricola = req.body.matricola;
    const voto = req.body.voto;
    const votoProgetto = req.body.votoProgetto;
    const votoFinale = req.body.votoFinale;
    const dataConsegna = req.body.dataConsegna;
    const esito = req.body.esito;
    const titoloProgetto = req.body.titoloProgetto;

    sql.connect(function(){
        console.log("Inserimento progettista..");
        sql.query("insert ignore into progettista values(?,?,?,?,?,?,?,?)",
        [idAppello,matricola,voto,votoProgetto,votoFinale,dataConsegna,esito,titoloProgetto],
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        });
    });
}

function getAllProgettisti(req,callback){
    sql.connect(function(){
        sql.query("select * from progettista",function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function getProgettista(req,callback){
    const matricola = req.body.matricola;
    sql.connect(function(){
        sql.query("select * from progettista where matricola = ?",
        [matricola],
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function updateProgettista(req,callback){
    const idAppello = req.body.idAppello;
    const matricola = req.body.matricola;
    const voto = req.body.voto;
    const votoProgetto = req.body.votoProgetto;
    const votoFinale = req.body.votoFinale;
    const dataConsegna = req.body.dataConsegna;
    const esito = req.body.esito;
    const titoloProgetto = req.body.titoloProgetto;

    sql.connect(function(){
        sql.query("update progettista set idAppello = ?, matricola = ?, voto = ?, votoProgetto = ?, votoFinale = ?, dataConsegna = ?, esito = ?, titoloProgetto = ? where matricola = ?",
        [idAppello,matricola,voto,votoProgetto,votoFinale,dataConsegna,esito,titoloProgetto,matricola],
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function deleteProgettista(req,callback){
    sql.connect(function(){
        const matricola = req.query.matricola;

        sql.query("delete from progettista where matricola = ?",
        [matricola],
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            console.log("RESULT: ",result);
            callback(null,result);
        })
    })
}

module.exports = {progettisti,creaProgettista,getAllProgettisti,getProgettista,updateProgettista,deleteProgettista}