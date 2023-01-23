var mongoose = require("mongoose");


var appointmentsSchema = mongoose.Schema({

    service: { type: String, required: false },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contactnumber: { type: Number, required: true },
    date: { type: String, required: true },
    //time:    {type: String, required:true},
    message: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    userID: { type: mongoose.Schema.Types.ObjectId, required: false, unique: false },
    appointmentID: { type: Number, required: true }

});

var Appointment = mongoose.model("Appointment", appointmentsSchema);

module.exports = Appointment;