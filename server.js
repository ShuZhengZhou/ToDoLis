

//------------------------ Defining MongoDb Connection

const mongoose = require('mongoose');
const url = `mongodb+srv://szhoubf:Zh20000815@cluster0.sh1tefq.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams).then( 
    () => {console.log('Connected to the database ')}
    ).catch(
         (err) => {console.error(`Error connecting to the database. n${err}`);});


//-------------------------
const Incident = require('./model');

const express = require('express');
const app = express();
const PORT = 3000;

//---------------For input new incident--------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------------------------

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/incidents', async function(req, res) {
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

app.listen(PORT, function() {
    console.log('server started');
    console.log(`Listening to Port ${PORT}`);
})