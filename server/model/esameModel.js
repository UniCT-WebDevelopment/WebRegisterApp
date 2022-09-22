const sql = require("../database/dbConnection");

let esame = sql.query("create table if not exists esame(idAppello bigint unsigned, matricola varchar(10) not null, maxRisposte int unsigned not null, risposteDate int unsigned not null, maxVotoScritto int unsigned not null, formula text, orale int unsigned not null, laboratorio int unsigned not null, votoComplessivo int not null,stato varchar(20),foreign key(matricola) references studente(matricola) on delete cascade,foreign key (idAppello) references appello(idAppello) on delete cascade,primary key(idAppello,matricola));")

function creaEsame(req,callback){
    sql.connect(function(){
        const idAppello = req.body.idAppello;
        const matricola = req.body.matricola;
        const maxRisposte = req.body.maxDomande;
        const risposteDate = req.body.risposteEsatte;
        const maxVotoScritto = req.body.maxVotoScritto;
        const formula = req.body.formula;
        const orale = req.body.orale;
        const laboratorio = req.body.laboratorio;
        const votoComplessivo = req.body.votoComplessivo;
        const stato = req.body.stato;
        
        console.log("Cercando di inserire l'esame: ",idAppello,matricola);
        sql.query("insert ignore into esame(idAppello,matricola,maxRisposte,risposteDate,maxVotoScritto,formula,orale,laboratorio,votoComplessivo,stato) values(?,?,?,?,?,?,?,?,?,?)",
        [idAppello,matricola,maxRisposte,risposteDate,maxVotoScritto,formula,orale,laboratorio,votoComplessivo,stato],function(err,result){
            if(err){
                console.log(err);
                callback(err,null);
                return;
            }
            console.log("Esame inserito con successo!")
            callback(null,result);
            return;
        })
    })
}

function getAllEsame(req,callback){

    sql.connect(function(){
        const idAppello = req.body;
        console.log("Ricerco l'esame con idAppello: ",idAppello);        
        sql.query("select * from esame where idAppello = ?",[idAppello],function(err,result){
            if(!result){
                callback(err,null);
            }
            callback(null,result);
        })
    })
}

function getCountEsame(req,callback){
    sql.connect(function(){
        sql.query("select count(*) as res from esame",function(err,result){
            if(!result){
                callback(err,null);
            }
            callback(null,result);
        })
    })
}

function getEsame(req,callback){
    sql.connect(function(){
        let idAppello = req.body.idAppello;
        let matricola = req.body.matricola;

        console.log("Ricerco esame: ",idAppello+" -- "+matricola);
        sql.query("select * from esame where idAppello = ? and matricola = ?",[idAppello,matricola],function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function updateEsame(req,callback){
    sql.connect(function(){
        let idAppelloToUpdate = req.query.idAppello;
        let matricolaToUpdate = req.query.matricola;
        
        let idAppello = req.body.idAppello;
        let matricola = req.body.matricola;
        let risposteDate = req.body.risposteEsatte;
        let maxRisposte = req.body.maxDomande;
        let maxVotoScritto = req.body.maxVotoScritto;
        let formula = req.body.formula;
        let orale = req.body.orale;
        let laboratorio = req.body.laboratorio;
        let votoComplessivo = req.body.votoComplessivo;
        let stato = req.body.stato;


        console.log("Connesso al DB, UPDTAE esame: ",idAppello+" -- "+matricola);
        sql.query("update esame set matricola = ?, risposteDate = ?, maxRisposte = ?, maxVotoScritto = ?, formula = ?, orale = ?, laboratorio = ?, votoComplessivo = ?, stato = ? where matricola = ? and idAppello = ?",
        [matricola,risposteDate,maxRisposte,maxVotoScritto,formula,orale,laboratorio,votoComplessivo,stato,matricolaToUpdate,idAppelloToUpdate],
        function(err,result){
            if(!result){
                console.log("Errore model: ");
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function updateFormulaAllEsami(req,callback){
    sql.connect(function(){
        let idAppello = req.query.idAppello;
        let formula = req.body.formula;

        sql.query("update esame set formula = ? where idAppello = ?",
        [formula,idAppello],
        function(err,result){
            if(!result){
                console.log("Errore model: ");
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function deleteEsame(req,callback){
    sql.connect(function(){
        let idAppello = req.query.idAppello;
        let matricola = req.query.matricola;

        console.log("Connesso al DB, ELIMINO esame: ",idAppello+" -- "+matricola);
        sql.query("delete from esame where idAppello = ? and matricola = ?",[idAppello,matricola],function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function  countPromossi(req,callback){
    sql.connect(function(){
        sql.query("select count(*) as ris from esame as e, progettista as p where (e.stato like 'r%' or e.stato like 'R%') or (p.matricola = e.matricola and p.esito like 'r%' or e.stato like 'R%')",function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            console.log(result);
            callback(null,result[0].ris);
        })
    })
}


function countRimandati(req,callback){
    console.log("SONO NEL MODEL: ",req.body);
    sql.connect(function(){
        sql.query("select count(*) as ris from esame as e where e.votoComplessivo < 18",function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result[0].ris);
        })
    })
}

module.exports = {esame,creaEsame,getAllEsame,getCountEsame,getEsame,updateEsame,deleteEsame,countPromossi,countRimandati,updateFormulaAllEsami };