//------------------------ Defining MongoDb Connection

import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";


const uri = `mongodb+srv://szhoubf:Zh20000815@cluster0.sh1tefq.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

//-------------------------
//import Incident from './public/src/model';

import express from "express";
const app = express();
const PORT = 3000;

//---------------For input new incident--------------------
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------------------------
import incidentRouter from "./public/src/routes/incidents";

app.use(express.static("public"));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.use("/", incidentRouter);

app.listen(PORT, function () {
  console.log("server started");
  console.log(`Listening to Port ${PORT}`);
});
