const sql = require("../database/dbConnection");

let appello = sql.query("create table if not exists appello ("+
    "idAppello bigint unsigned primary key AUTO_INCREMENT,"+
    "nomeAppello varchar(10) not null)"
)

let creaAppello = function(req,callback){
    sql.connect(function(){
        var nomeAppello = req.body.nomeAppello;
        sql.query('insert into appello(nomeAppello) values(?)',[nomeAppello],function(error,result){
            if(error) {
                callback(error,null)
                return false;
            }
            callback(null,result);
        });
    })
}

function getAllAppelli(data, callback){
    sql.connect(function(){
        console.log("Connected for GET appelli!");
        sql.query('select * from appello',callback,function(error,result){
            if(error) {
                callback(error,null);
            }
            callback(null,result);
        });
    })
}

async function getAppello(req,callback){
    sql.connect(function(){
        console.log("Connected for GET appello.. Searching id:"+req.query.id);       
        sql.query('select * from appello where idAppello = ?',[req.query.id],function(error,result){
            if(error){
                callback(error,null);
            }
            callback(null,result);
        });
    })
}

async function updateAppello(req,callback){
    const idAppello = req.params[0].idAppello;
    const nomeAppelloUpdated = req.body.nomeAppello;

    sql.connect(function(){
        console.log("Connected for UPDATE Appello");       
        sql.query('update appello set nomeAppello = ? where idAppello = ?',[nomeAppelloUpdated,idAppello],function(error,result){
            if(error) {
                callback(error,null);
            }
            callback(null,result);
        });
    })
}

function deleteAppello(req,callback){
    const idAppello = req.params.idAppello;

    sql.connect(function(){
        console.log("Connected for DELETE element with id: ",idAppello);
        sql.query("delete from appello where idAppello = ?",[idAppello],function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
            return;
        })
    })
}

module.exports = {appello,creaAppello,getAllAppelli,getAppello,updateAppello,deleteAppello};