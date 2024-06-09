const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Role = require("../models/role.model");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "groomingbuddyy@gmail.com",
    pass: "naiasrseoalhreqc",
  },
});

const adminRole = Role.findOne({ name: "admin" });

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.sendEmail = async (req, res) => {
  try {
    let admins = await User.find({ role: adminRole._id }).exec();

    const adminEmails = admins.map((admin) => admin.email).join(",");

    const messageBody = `
      Name: ${req.body.firstName} ${req.body.lastName}
      Email: ${req.body.email}
      Phone Number: ${req.body.phoneNumber}
      Message:
      ${req.body.message}
    `;

    const mailOptions = {
      from: req.body.email,
      to: adminEmails,
      subject: `Contact Form Submission from ${req.body.firstName} ${req.body.lastName}`,
      text: messageBody,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    res.status(200).send({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Failed to send email" });
  }
};
