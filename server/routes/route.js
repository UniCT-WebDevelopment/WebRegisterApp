const appelloController = require("../controller/appelloController");
const express = require("express");
const route = express.Router();
const CSVToJSON = require("csvtojson");
const studenteController = require("../controller/studenteController");
const esameController = require("../controller/esameController");
const progettistaController = require("../controller/progettistaController"); 
const xlsx = require("xlsx");
const fs = require("fs");
const config = require("../../config.json");

/**
 * @Description route homepage
 * @method GET/
 */
route.get("/", (req, res) => {
    res.render("index", {courseName: config.courseName});
})

/**
 * @Description route visualizza appelli con tutti gli appelli visualizzati nella tabella
 * @method GET/visualizzaAppelli
 */
route.get("/visualizzaAppelli", (req, res) => {
    appelloController.getAllAppelli(req, function (err, result) {
        if (!result) {
            res.status(400).send(err);
        }
        res.render("visualizzaAppelli", { appelli: result })
    })
})

/**
 * @Description route crea appello
 * @method GET/creaAppello
 */
route.get("/creaAppello", (req, res) => {
    res.render("creaAppello");
})

route.post("/creaAppello/add",(req,res)=>{
    appelloController.createAppello(req,function(err,result){
        if(!result){
            res.send({msg: "Errore nella creazione dell'appello: "+err.message})
            return;
        }
        res.send({msg:"Appello creato con successo!"});
    })
})

/**
 * @Description route tesisti
 * @method GET/tesisti
 */
route.get("/studenti", (req, res) => {
    studenteController.getAllStudente(req,function(err,result){
        if (!result) {
            res.status(400).send(err);
        }
        res.render("studenti", { studente: result })
    })
})

route.get("/updateStudente", (req, res) => {
    const request = {
        body: {
            matricola: req.query.matricola
        }
    }
    studenteController.getStudenteByMatricola(request,function(err,result){
        if(!result){
            console.log("Errore nella route!");
            res.status(400).send(err);
        }
        res.status(200).render("updateStudente",{studente: result});
    });
})

route.put("/updateStudente/edit",(req,res)=>{
    studenteController.updateStudente(req,function(err,result){
        if(!result){
            console.log(err);
            res.status(400).send(err);
            return;
        }
        res.status(200).send(result);
    })
})

route.delete("/deleteStudente",(req,res)=>{
    studenteController.deleteStudente(req,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

route.get("/getCountStudente",(req,res)=>{
    studenteController.getCountStudente(req,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

/**
 * @Description route progettisti
 * @method GET/progettisti
 */
route.get("/progettisti", (req, res) => {
    progettistaController.getAllProgettisti(req, function (err, result) {
        if (!result) {
            res.status(400).send(err);
        }
        res.render("progettisti", { progettisti: result })
    })
})

/**
 * @Description route updateAppello
 * @method PUT/updateAppello
 */
route.get("/updateAppello", (req, res) => {
    appelloController.getAppello({ query: { id: req.query.idAppello } }, function (err, result) {
        if (!result) {
            res.status(400).send(err);
        }
        res.render("updateAppello", { appello: result });
    });
});

route.put("/updateAppello/edit/:idAppello", (req, res) => {
    // console.log("SONO NELLA ROUTE PUT: ", req);
    appelloController.getAppello({ query: { id: req.body.idAppello } }, function (err, result) {
        if (!result) {
            res.status(400).send(err);
        }
        appelloController.updateAppello({ params: result, body: req.body }, function (err, result) {
            if (!result) {
                res.status(400).send(err);
            }
        });
    });
    res.render("index");
})

route.get("/appello", (req, res) => {
    const request = {
        body: req.query.idAppello
    }
    esameController.getAllEsame(request,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.render("appello",{esame: result});
    })
});

route.get("/updateEsame",(req,res)=>{
    const request = {
        body: {
            idAppello: req.query.idAppello,
            matricola: req.query.matricola
        }
    }
    esameController.getEsame(request,function(err,result){
        if(!result){
            console.log("Errore nella route!");
            res.status(400).send(err);
            return;
        }
        res.status(200).render("updateEsame",{esame: result});
    });
})

route.put("/updateEsame/edit",(req,res)=>{
    esameController.updateEsame(req,function(err,result){
        if(!result){
            console.log("Errore nella route!");
            res.status(400).send(err);
            return;
        }
        res.status(200).send(result);
    })
})

route.post("/creaEsame",(req,res)=>{
    esameController.creaEsame(req,function(err,result){
        if(!result){
            res.status(400).send(err);
            return;
        }
        res.status(200).send(result);
    })
})

// L'API viene chiamata dal form di appello.ejs
route.post("/uploadFile", (req, res) => {
    /**
     * leggere il file per gli studenti prenotati
     * chiamata per salvare gli studenti nel db
     * chiamata per creare l'esame nel db
     * leggere il file per l'esame e salvare i risultati in esame
     */

    //leggere il file per gli studenti prenotati e salvare gli studenti nel db
    let nomeFile_studPrenotati = req.body.nomeFile[0];
    let estensione = nomeFile_studPrenotati.split(".");
    if(estensione[estensione.length-1] == "xlsx"){
        const fileXlsx = xlsx.readFile("C:/Users/salva/OneDrive/Desktop/WebRegisterApp2.0/server/helper/studPrenotati/"+nomeFile_studPrenotati);
        xlsx.writeFile(fileXlsx,"C:/Users/salva/OneDrive/Desktop/WebRegisterApp2.0/server/helper/studPrenotati/"+estensione[0]+".csv",{bookType: "csv"});
    }
    CSVToJSON().fromFile("C:/Users/salva/OneDrive/Desktop/WebRegisterApp2.0/server/helper/studPrenotati/" + estensione[0]+".csv",{start: 22})
        .then((arr) => {
            arr.forEach((studente) => {
                console.log(studente);
                studenteController.addStudente({
                    body: {
                        matricola: `${studente.Matricola}`,
                        nome: `${studente.Nome}`,
                        cognome: `${studente.Cognome}`,
                        cf: `${studente["Codice Fiscale"]}`,
                        codCdsIscr: `${studente["Codice cds iscr"]}`,
                        regolamento: `${studente.Regolamento}`,
                        cfu: `${studente["Cfu Ins."]}`
                    }
                }, function (err, result) {
                    if (!result && err) {
                        if(err.code == "ER_DUP_ENTRY"){
                            console.log("Errore, stai cercando di iserire elementi già presenti!");
                        }
                    }
                });
                
                esameController.creaEsame({
                    body:{
                        idAppello: `${parseInt(req.query.idAppello)}`,
                        matricola: `${studente.Matricola}`,
                        maxRisposte: 0,
                        risposteDate: 0,
                        maxVotoScritto: 0,
                        formula: ``,
                        orale: 0,
                        laboratorio: 0,
                        votoComplessivo: 0,
                        stato: `-`
                    }
                },function(err,result){
                    if(!result && err){
                        console.log("ERRORE: ",err);
                    }
                    try {
                        fs.unlinkSync("C:/Users/salva/OneDrive/Desktop/WebRegisterApp2.0/server/helper/studPrenotati/"+estensione[0]+".csv");
                        fs.unlinkSync("C:/Users/salva/OneDrive/Desktop/WebRegisterApp2.0/server/helper/studPrenotati/"+req.body.nomeFile[0]);
                        console.log("FILE RIMOSSO");
                    }catch(err) {
                        //console.error(err)
                    }
                })
            })
            res.redirect("/visualizzaAppelli");
        })
        .catch((err) => {
            console.log(err.message);
            return;
        })
});

route.post("/creaProgettista",(req,res)=>{
    progettistaController.creaProgettista(req,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

route.get("/updateProgettista",(req,res)=>{
    const request = {
        body: {
            matricola: req.query.matricola
        }
    }
    progettistaController.getProgettista(request,function(err,result){
        if(!result){
            console.log("Errore nella route!");
            res.status(400).send(err);
        }
        res.status(200).render("updateProgettista",{progettista: result});
    });
})

route.put("/updateProgettista/edit",(req,res)=>{
    progettistaController.updateProgettista(req,function(err,result){
        if(!result){
            console.log(err);
            res.status(400).send(err);
            return;
        }
        res.status(200).send(result);
    })
})

route.delete("/deleteProgettista",(req,res)=>{
    progettistaController.deleteProgettista(req,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

route.post("/updateFormulaAllEsami",(req,res)=>{
    esameController.updateFormulaAllEsami(req,function(err,result){
        if(!result){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
})

module.exports = route;