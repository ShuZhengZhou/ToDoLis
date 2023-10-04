
//------------------------ Defining MongoDb Connection

import mongoose  from 'mongoose';
import { ConnectOptions } from 'mongoose';
import uri from './uri'
//const url = ``;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
};


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true,} as ConnectOptions).then( 
    () => {console.log('Connected to the database ')}
    ).catch(
         (err) => {console.error(`Error connecting to the database. n${err}`);}
    );


//-------------------------
import Incident from './public/src/model';

import express from 'express';
const app = express();
const PORT = 3000;

//---------------For input new incident--------------------
import bodyParser from'body-parser';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------------------------

app.use(express.static('public'));
app.use(express.json());

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
});


app.listen(PORT, function() {
    console.log('server started');
    console.log(`Listening to Port ${PORT}`);
})