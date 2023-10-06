"use strict";
//------------------------ Defining MongoDb Connection
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uri_1 = __importDefault(require("./uri"));
//const url = ``;
mongoose_1.default
    .connect(uri_1.default, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () {
    console.log("Connected to the database ");
})
    .catch(function (err) {
    console.error("Error connecting to the database. n".concat(err));
});
//-------------------------
//import Incident from './public/src/model';
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3000;
//---------------For input new incident--------------------
var body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//---------------------------------------------------------
var incidents_1 = __importDefault(require("./public/src/routes/incidents"));
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use("/", incidents_1.default);
/*app.get('/incidents', async function(req, res) {
    const incidents = await Incident.find();
    res.send({ incidents });
  });

app.post('/createIncident', async function(req, res) {
    const incidentData = req.body;
    const newIncident = new Incident(incidentData);
    await newIncident.save();
    res.sendStatus(200);
  });


app.delete('/deleteIncident/:id', async function(req, res) {
  console.log('delete operation called');
  const incidentId = req.params.id;
  console.log(incidentId);
  try {
    await Incident.findByIdAndDelete(incidentId);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error deleting incident. ${err}`);
    res.sendStatus(500);
  }
});


app.put('/updateIncident/:id', async function(req, res) {
  console.log('update operation called');
  const incidentId = req.params.id;
  const newStatus = req.body.newStatus;
  console.log(incidentId);
  console.log(newStatus);
  //console.log(req);
  try {
    await Incident.findByIdAndUpdate(incidentId, {status:newStatus});
    res.sendStatus(200);
  } catch (err) {
    //console.error(`Error updating incident. ${err}`);
    res.sendStatus(500);
  }
});*/
app.listen(PORT, function () {
    console.log("server started");
    console.log("Listening to Port ".concat(PORT));
});
