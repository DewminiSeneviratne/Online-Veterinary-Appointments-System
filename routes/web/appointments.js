var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Appointment = require("../../models/appointments");
var Inquiry = require("../../models/contact")

var router = express.Router();

//router.use(ensureAuthenticated);

router.get("/", function(req, res){
    Inquiry.find().exec(function(err, appointments){
        if(err){console.log(err);}

        res.render("home/appointments",{appointments:appointments});
    });
 });


 router.get("/add", function(req, res){
    res.render("home/appointments");
 });

 router.post("/add", function(req, res){

    var newAppointment = new Appointment({
        service:         req.body.service,
        firstname:       req.body.firstname,
        lastname:        req.body.lastname,
        email:           req.body.email,
        contactnumber:   req.body.contactnumber,
        date:            req.body.date,
        time:            req.body.time,
        message:         req.body.message,
        //userID:req.user._id
    });

    newAppointment.save(function(err,appointment){
        if(err){console.log(err);}
        res.redirect("/appointments");
    });

 });




 

module.exports = router;



