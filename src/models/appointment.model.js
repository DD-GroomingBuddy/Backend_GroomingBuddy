const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phoneNumber: String,
    service: String,
    dateTime: Date,
    status: String,
  })
);

module.exports = Appointment;
