const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Appointment = db.appointment;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};


exports.appointmentDelete = async (req, res) => {
  try {
    const appointmentId = req.body.id;
    console.log(appointmentId)

    const deletedAppointment = await Appointment.findByIdAndRemove(
      appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    res.status(200).send({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).send({ message: "Failed to delete appointment" });
  }
};

exports.appointmentAdd = (req, res) => {
  const newDateTime = new Date(req.body.dateTime);
  
  const appointment = new Appointment({
    user: req.body.user.id,
    phoneNumber: req.body.phoneNumber,
    service: req.body.service,
    dateTime: newDateTime
  });

  appointment.save((err, appointment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.user) {
      User.findOne({ _id: req.body.user.id }, (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        appointment.user = user;

        appointment.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "Appointment registered successfully" });
        });
      });
    }
  });
};

exports.getAppointments = (req, res) => {
  Appointment.find({ user: req.query.userId })
    .populate({
      path: 'user',
      select: 'username email' // Specify the fields you want to include
    })
    .exec((err, appointments) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(appointments);
    });
};

exports.getAllAppointments = (req, res) => {
  Appointment.find({})
  .populate({
    path: 'user',
    select: 'username email' // Specify the fields you want to include
  })
  .exec((err, appointments) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(appointments);
  });
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.body.id;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "Completed" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    res.status(200).send({ message: "Appointment status updated to Completed", appointment: updatedAppointment });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    res.status(500).send({ message: "Failed to update appointment status" });
  }
};