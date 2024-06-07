const User = require("../models/user.model");
const Appointment = require("../models/appointment.model")
const Role = require("../models/role.model")
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'groomingbuddyy@gmail.com',
    pass: 'naiasrseoalhreqc',
  },
});

const adminRole = Role.findOne({name: 'admin'});


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  exports.appointmentDelete = async (req, res) => {
    try {
      const appointmentId = req.params.id;
  
      const deletedAppointment = await Appointment.findByIdAndRemove(appointmentId);
  
      if (!deletedAppointment) {
        return res.status(404).send({ message: 'Appointment not found' });
      }
  
      res.status(200).send({ message: 'Appointment deleted successfully' });
    } catch (err) {
      console.error('Error deleting appointment:', err);
      res.status(500).send({ message: 'Failed to delete appointment' });
    }

  };
  
  exports.appointmentAdd = (req, res) => {
    const appointment = new Appointment({
      user: req.body.user,
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

  exports.sendEmail = async (req, res) => {
    try {
      let admins = await User.find({ role: adminRole._id }).exec();

      const adminEmails = admins.map(admin => admin.email).join(',');
  
      const mailOptions = {
        from: req.email,
        to: adminEmails,
        subject: `Contact Form Submission from ${req.body.firstName} ${req.body.lastName}`,
        text: req.body.message,
      };
  
      // Send email
      let info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
  
      res.status(200).send({ message: 'Email sent successfully' });
    } catch (err) {
      console.error('Error sending email:', err);
      res.status(500).send({ message: 'Failed to send email' });
    }
  };