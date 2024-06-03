const User = require("../models/user.model");
const Appointment = require("../models/appointment.model")

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.appointmentAdd = (req, res) => {
    const appointment = new Appointment({
      // user: req.body.user,
      phoneNumber: req.body.phoneNumber,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time
    });

    appointment.save((err, appointment) => {
      if (err) {
        res.status(500).send({message: err});
        return;
      }

      if(req.body.user){
        User.findOne({id: req.body.user.id}, (err,user) =>{
          if(err){
            res.status(500).send({message: err})
            return;
          }
          appointment.user = user

          appointment.save((err) => {
            if(err){
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Appointment registered successfully" });
          });
          });
      }
    });
  };

  exports.getAppointments = (req,res) => {
    Appointment.find({ user: req.query.userId })
    .populate('user')
    .exec((err, appointments) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(appointments);
    });
  };

  exports.getAllAppointments = (req,res) => {
    Appointment.find({})
    .exec((err, appointments) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(appointments);
    });
  }