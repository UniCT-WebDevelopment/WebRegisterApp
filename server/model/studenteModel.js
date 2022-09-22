const sql = require("../database/dbConnection");

let studente = sql.query("create table if not exists studente(Matricola varchar(10) primary key, Nome varchar(25) not null, Cognome varchar(25) not null, cf varchar(16) not null, codCdsIscr varchar(5) not null,Regolamento varchar(9) not null, cfu varchar(2) not null)");

function addStudente(req,callback){
    let matricola = req.body.matricola;
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let cf = req.body.cf;
    let codCdsIscr = req.body.codCdsIscr;
    let regolamento = req.body.regolamento;
    let cfu = req.body.cfu;

    sql.connect(function(){
        sql.query("insert ignore into studente(Matricola,Nome,Cognome,cf,codCdsIscr,Regolamento,cfu) values(?,?,?,?,?,?,?)",[matricola,nome,cognome,cf,codCdsIscr,regolamento,cfu],function(err,result){
            if(!result){
                callback(err,null);
            }
            callback(null,result);
        })
    })
}

function getAllStudente(req,callback){
    sql.connect(function(){
        sql.query("select * from studente",function(err,result){
            if(!result){
                callback(err,null);
            }
            callback(null,result);
        })
    })
}

function getStudenteByMatricola(req,callback){
    const matricola = req.body.matricola;
    sql.connect(function(){
        sql.query("select * from studente where matricola = ?",
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

function updateStudente(req,callback){
    const matricola = req.body.matricola;
    const nome = req.body.nome;
    const cognome = req.body.cognome;
    const cf = req.body.cf;
    const codCdsIscr = req.body.codCdsIscr;
    const regolamento = req.body.regolamento;
    const cfu = req.body.cfu;

    sql.connect(function(){
        sql.query("update studente set Matricola = ?, Nome = ?, Cognome = ?, cf = ?, codCdsIscr = ?, Regolamento = ?, cfu = ? where matricola = ?",
        [matricola,nome,cognome,cf,codCdsIscr,regolamento,cfu,matricola],
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

function deleteStudente(req,callback){
    sql.connect(function(){
        const matricola = req.query.matricola;

        sql.query("delete from studente where matricola = ?",
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

function getCountStudente(req,callback){
    sql.connect(function(){

        sql.query("select count(*) as res from studente",
        function(err,result){
            if(!result){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

module.exports = {studente,addStudente,getAllStudente,getStudenteByMatricola,updateStudente,deleteStudente,getCountStudente};