const { response } = require("express");
var express = require("express");
const { authenticate } = require("passport");
var passport = require("passport");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");
var Appointment = require("../../models/appointments");
var Inquiry = require("../../models/contact");
var Service = require("../../models/service");

const { DATABASECONNECTION } = require("../../params/params");
const { find } = require("../../models/appointments");

var router = express.Router();
/*router.use(function(req,res,next) {
    res.locals.err = req.flash("error")
    res.locals.info = req.flash("info")
    res.locals.success = req.flash("success");

    next();

})*/

router.get("/", function (req, res) {
    //console.log("Hello I'm on the start page here")
    res.render("home/home");
});

router.get("/home", function (req, res) {
    res.render("home/home");
});

router.get("/appointments", function (req, res) {
    Service.find().exec(function (err, services) {
    res.render("home/appointments", { message: '' ,services: services });
    })
});

router.get("/services", function (req, res) {
    Service.find().exec(function (err, services) {

        if (err) { console.log(err); }
        res.render("home/services", { services: services });

    });
});

router.get("/about", function (req, res) {
    res.render("home/about");
});

router.get("/contact", function (req, res) {
    res.render("home/contact", {message: ''});
});

router.get("/dashboard", function (req, res) {
    res.render("adminPanel/dashboard");
});

//get all apointments route
router.get("/appointmentsAdmin", function (req, res) {
    Appointment.find().exec(function (err, appointments) {
        if (err) {
            //res.json({message:err.message});
            console.log(err)
        }
        res.render('adminPanel/appointmentsAdmin', {
            //title: 'Home Page',
            appointments: appointments
        });

    });
});

//update appointments

router.get("/editAppointments/:id", function (req, res) {
    let id = req.params.id;

    Appointment.findById(id).exec(function (err, appointmentsdetails) {

        Service.find().exec(function (err, services) {
            if (err) { console.log(err); }
            res.render("adminPanel/editAppointments", { appointmentsdetails: appointmentsdetails, services: services });
        })
    });
});

router.post("/updateAppointments/:id", function (req, res) {
    let id = req.params.id;

    Appointment.findByIdAndUpdate(id, {
        service: req.body.service,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contactnumber: req.body.contactnumber,
        date: req.body.date,
        //time: req.body.time,
        message: req.body.message,
        appointmentID: req.body.apppointmentID

    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Appointment Updated")
        }
        res.redirect("/appointmentsAdmin")
    });

});

//delete appointments
router.get("/deleteAppointments/:id", function (req, res) {
    let id = req.params.id;

    Appointment.findByIdAndRemove(id).exec(function (err) {
        if (err) { console.log(err); 
        } else {
            res.redirect(req.get('referer'));
        }
    });
});

router.get("/inquiriesAdmin", function (req, res) {

    Inquiry.find().exec(function (err, contacts) {

        if (err) { console.log(err); }
        res.render("adminPanel/inquiriesAdmin", { contacts: contacts });

    });
});

router.get("/servicesAdmin", function (req, res) {
    Service.find().exec(function (err, services) {

        if (err) { console.log(err); }
        res.render("adminPanel/servicesAdmin", { services: services });

    });

});

router.post("/addService", function (req, res) {
    var newService = new Service({
        servicename: req.body.servicename,
        servicedescription: req.body.servicedescription,
        animals: req.body.serviceanimals,
        price: req.body.serviceprice
    });

    newService.save(function (err, service) {
        if (err) { console.log(err); }
        res.redirect("/servicesAdmin");
    });
});

router.get("/login", function (req, res) {
    res.render("home/login");
});

/*router.get("/adminpanel", ensureAuthenticated, function(req,res) {
    res.render("home/adminpanel");
});*/


router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

/*router.post("/login",passport.authenticate("login",{
    successRedirect:"/adminpanel",
    failureRedirect:"/login",
    failureFlash:true
}));*/

router.post("/login", function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "admin" && password == "admin123") {
        //req.flash("success", "Successfully Logged In.");
        console.log("User Successfully Logged In.")
        return res.redirect("/dashboard");
    }
    else if (username != "admin" && password != "admin123") {
        req.flash("error", "Invalid Username and Password.");
        console.log("Invalid Username and Password")
        return res.redirect("/login")
    }
    else {
        if (username != "admin") {
            req.flash("error", "Invalid Username.");
            console.log("Invalid Username")
            return res.redirect("/login")
        }
        else if (password != "admin123") {
            //return (null,false,{message: "Incoreect Password"}); 
            req.flash("error", "Invalid Password.");
            console.log("Invalid Password")
            return res.redirect("/login")
        }

    }; passport.authenticate("login", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })

});




router.post("/contact", function (req, res, next) {
    var contactname = req.body.contactname;
    var contactmail = req.body.contactmail;
    var contactno = req.body.contactno;
    var message = req.body.message;



    Inquiry.findOne(function (err, inquiry) {
        if (err) { return next(err); }
        if (inquiry) {
            req.flash("success", "Your message was successfully sent.");
            console.log("Message was successfully sent")
            return res.redirect("/contact");
        }

        var newInquiry = new Inquiry({
            contactname: contactname,
            contactmail: contactmail,
            contactno: contactno,
            message: message,
        });

        newInquiry.save(next);

    }); passport.authenticate("contact", {
        successRedirect: "/contact",
        failureRedirect: "/contact",
        failureFlash: true
    })

});


module.exports = router;

