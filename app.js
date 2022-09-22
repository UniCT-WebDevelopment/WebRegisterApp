const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(morgan("tiny"));
app.use(cors({origin: '*'}));

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use("/css",express.static(path.resolve(__dirname,"assets/css")));
app.use("/appello/css",express.static(path.resolve(__dirname,"assets/css")));
app.use("/img",express.static(path.resolve(__dirname,"assets/img")));
app.use("/js",express.static(path.resolve(__dirname,"assets/js")));

//caricamento delle routes
app.use("/",require("./server/routes/route"));

//caricamento delle api
app.use("/",require("./server/services/api"))

app.listen(3000);
