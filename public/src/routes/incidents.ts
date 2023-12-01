import express from "express";
import Incident from "../model";

const router = express.Router();

router.get("/incidents", async function (req, res) {
  const incidents = await Incident.find();
  res.send({ incidents });
});

router.post("/createIncident", async function (req, res) {
  const incidentData = req.body;
  const newIncident = new Incident(incidentData);
  try{
    await newIncident.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error creating incident. ${err}`);
    res.sendStatus(500);
  }

});

router.delete("/deleteIncident/:id", async function (req, res) {
  const incidentId = req.params.id;
  try {
    await Incident.findByIdAndDelete(incidentId);
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error deleting incident. ${err}`);
    res.sendStatus(500);
  }
});

router.put("/updateIncident/:id", async function (req, res) {
  const incidentId = req.params.id;
  const newStatus = req.body.newStatus;
  try {
    await Incident.findByIdAndUpdate(incidentId, { status: newStatus });
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error updating incident. ${err}`);
    res.sendStatus(500);
  }
});

export default router;
