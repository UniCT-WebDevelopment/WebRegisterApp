const express = require("express");
const api = express.Router();
const appelloController = require("../controller/appelloController");
const studenteController = require("../controller/studenteController");
const esameController = require("../controller/esameController");
const progettistaController = require("../controller/progettistaController");

/**
 * API APPELLO
 */
api.get("/visualizzaAppelli/api/getAllAppelli",appelloController.getAllAppelli);
api.get("/visualizzaAppelli/api/getAppello",appelloController.getAppello);
api.put("/visualizzaAppelli/api/updateAppello/:idAppello",appelloController.updateAppello);
api.delete("/visualizzaAppelli/api/deleteAppello/:idAppello",appelloController.deleteAppello);

/**
 * API ESAME
 */
api.post("/api/creaEsame",esameController.creaEsame);
api.get("/api/getCountEsame",esameController.getCountEsame);
api.delete("/api/deleteEsame",esameController.deleteEsame);
api.get("/api/getCountPromossi",esameController.countPromossi);
api.get("/api/getCountRimandati",esameController.countRimandati);

/**
 * API STUDENTE
 */
api.post("/api/creaStudente",studenteController.addStudente);

/**
 * API PROGETTISTA
 * Utilizzate solo per test con postman
 */
api.get("/api/getProgettista",progettistaController.getProgettista);
// api.delete("/api/deleteProgettista",progettistaController.deleteProgettista);

module.exports = api;