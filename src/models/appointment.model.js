const mongoose = require("mongoose");

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    phoneNumber: String,
    service: String,
    date: Date,
    time: Date

  })
);

module.exports = Appointment;