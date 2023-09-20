const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  context: {
    type: String
  },
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  Deadline: {
    type: Date,
    required: true
  },
  PIC: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Incident', IncidentSchema);