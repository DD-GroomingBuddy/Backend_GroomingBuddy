const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.appointment = require("./appointment.model");
db.role = require("./role.model");


module.exports = db;