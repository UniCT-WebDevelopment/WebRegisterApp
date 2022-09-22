const progettistiModel = require("../model/progettistaModel");

exports.creaProgettista = (req,callback)=>{
    progettistiModel.creaProgettista(req,function(err,result){
        if(!result){
            callback(err,null);
        }
        callback(null,result);
    })
}

exports.getAllProgettisti = (req,callback)=>{
    progettistiModel.getAllProgettisti(req,function(err,result){
        if(!result){
                callback(err,null);
                return;
            }
        callback(null,result);
    })
}

exports.getProgettista = (req,callback)=>{
    progettistiModel.getProgettista(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}

exports.updateProgettista = (req,callback)=>{
    progettistiModel.updateProgettista(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}


exports.deleteProgettista = (req,callback)=>{
    progettistiModel.deleteProgettista(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}