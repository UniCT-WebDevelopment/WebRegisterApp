const studenteModel = require("../model/studenteModel");

exports.addStudente = ((req,callback)=>{
    // console.log("RICHIESTA ARRIVATA AL CONTROLLER: ",req.body);
    if(Object.keys(req.body).length == 0){                   
        res.status(400).send({message: "Content can't be empty"});
        return;
    }
    studenteModel.addStudente(req,function(err,result){
        if(!result){
            callback(err,null);
        }
        callback(null,result);
    })
})

exports.getAllStudente =(req,callback)=>{
    studenteModel.getAllStudente(req,function(err,result){
        if(!result){
            callback(err,null);
        }
        callback(null,result);
    })
}

exports.getStudenteByMatricola = (req,callback)=>{
    studenteModel.getStudenteByMatricola(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}

exports.updateStudente = (req,callback)=>{
    studenteModel.updateStudente(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}

exports.deleteStudente = (req,callback)=>{
    studenteModel.deleteStudente(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}

exports.getCountStudente = (req,callback)=>{
    studenteModel.getCountStudente(req,function(err,result){
        if(!result){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}
