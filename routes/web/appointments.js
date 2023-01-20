var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Appointment = require("../../models/appointments");
var Inquiry = require("../../models/contact")

var router = express.Router();

//router.use(ensureAuthenticated);

router.get("/", function (req, res) {
    Inquiry.find().exec(function (err, appointments) {
        if (err) { console.log(err); }

        res.render("home/appointments", { appointments: appointments });
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*router.get("/add", function (req, res) {
    
});*/

router.post("/add", function (req, res) {
    var appointmentNo = 0
    var appointmentDate = req.body.date

    Appointment.find({ "date": appointmentDate }).sort({ appointmentID: -1 }).findOne().exec(function (err, appointmentsdetails) {
        console.log(appointmentsdetails)
        if (appointmentsdetails == undefined) {
            appointmentNo = 1
        } else {
            if (appointmentsdetails.appointmentID == 10) {
                res.render("home/appointments", { message: 'Select another date.' });
            } else {
                appointmentNo = appointmentsdetails.appointmentID + 1
            }
        }
        console.log(appointmentNo)



        var newAppointment = new Appointment({
            service: req.body.service,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            contactnumber: req.body.contactnumber,
            date: appointmentDate,
            //time: req.body.time,
            message: req.body.message,
            appointmentID: appointmentNo
        });

        newAppointment.save(function (err, appointment) {
            if (err) { console.log(err); }
            res.render("home/appointments", { message: 'Appointment placed successfully. Date: ' + appointmentDate + '. Appointment ID: ' + appointmentNo });
        });
    })

});


module.exports = router;



