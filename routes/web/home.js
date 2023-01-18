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

var router = express.Router();

router.get("/",function(req,res) {
    //console.log("Hello I'm on the start page here")
    res.render("home/index");
});

router.get("/home",function(req,res) {
    res.render("home/home");
});

router.get("/appointments",function(req,res) {
    res.render("home/appointments");
});

router.get("/services",function(req,res) {
    Service.find().exec(function (err, services) {

        if (err) { console.log(err); }
        res.render("home/services", { services: services });

    });
});

router.get("/about",function(req,res) {
    res.render("home/about");
});

router.get("/contact",function(req,res) {
    res.render("home/contact");
});

router.get("/dashboard",function(req,res) {
    res.render("adminPanel/dashboard");
});

 //get all apointments route
 router.get("/appointmentsAdmin", function(req,res) {
    Appointment.find().exec(function(err,appointments)  {
        if(err) {
            //res.json({message:err.message});
            console.log(err)
        } 
            res.render('adminPanel/appointmentsAdmin', {
                //title: 'Home Page',
                appointments: appointments
            });
        
    });
 });

 router.get("/inquiriesAdmin",  function (req, res) {

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

router.post("/addService", function(req, res) {
    var newService = new Service({
        servicename:         req.body.servicename,
        servicedescription:       req.body.servicedescription,
        animals:        req.body.serviceanimals,
        price:           req.body.serviceprice
    });

    newService.save(function(err,service){
        if(err){console.log(err);}
        res.redirect("/servicesAdmin");
    });
});

router.get("/login",function(req,res) {
    res.render("home/login");
});

/*router.get("/adminpanel", ensureAuthenticated, function(req,res) {
    res.render("home/adminpanel");
});*/


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect("/");
    });
  });

/*router.post("/login",passport.authenticate("login",{
    successRedirect:"/adminpanel",
    failureRedirect:"/login",
    failureFlash:true
}));*/

router.post("/login", function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;

        if (username == "admin" && password == "admin123") {
            req.flash("success", "Successfully Logged In.");
            console.log("User Successfully Logged In.")
            return res.redirect("/dashboard");
        } 
        else if (username != "admin" && password != "admin123") {
            req.flash("error", "Incorrect Username and Password");
            console.log("Invalid Username and Password")
            return res.redirect("/login")
        } 
        else {
            if (username != "admin") {
                req.flash("error", "Incorrect Username");
                console.log("Invalid Username")
                return res.redirect("/login")
            } 
            else if (password != "admin123") {
                //return (null,false,{message: "Incoreect Password"}); 
                req.flash("error", "Incorrect Password");
                console.log("Invalid Password")
                return res.redirect("/login")
            } 

        } ; passport.authenticate("login", {
        successRedirect:"/dashboard",
        failureRedirect: "/login",
        failureFlash:true
    })

});

router.post("/appointments", function(req,res,next){
    var firstname  =  req.body.firstname;
    var lastname   =  req.body.lastname;
    var email   =  req.body.email;
    var contactnumber =  req.body.contactnumber;
    var date    =  req.body.date;

        if (firstname !== null && lastname !== null && email !== null && contactnumber !== null && date !== null) {
            req.flash("success", "Appointment Request Sent.");
            console.log("Appointment Request Sent")
            return res.redirect("/appointments");
        } 
        ; passport.authenticate("appointments", {
        successRedirect:"/appointments",
        failureRedirect: "/appointments",
        failureFlash:true
    })

});


router.post("/contact", function(req,res,next){
    var contactname  =  req.body.contactname;
    var contactmail   =  req.body.contactmail;
    var contactno =  req.body.contactno;
    var message    =  req.body.message;

        /*if (!(contactname === null && contactmail === null && contactno === null && message === null)) {
            req.flash("success", "Your message was successfully sent.");
            console.log("Message was successfully sent")
            return res.redirect("/contact");
        }
        ; passport.authenticate("contact", {
        successRedirect:"/contact",
        failureRedirect: "/contact",
        failureFlash:true
    })*/

    Inquiry.findOne(function(err, inquiry){
        if(err){return next(err);}
        if(inquiry){
            req.flash("success", "Your message was successfully sent.");
            console.log("Message was successfully sent")
            return res.redirect("/contact");
        }

        var newInquiry = new Inquiry({
            contactname:  contactname,
            contactmail: contactmail,
            contactno: contactno,
            message: message,
        });

        newInquiry.save(next);

    }); passport.authenticate("contact", {
        successRedirect:"/contact",
        failureRedirect: "/contact",
        failureFlash:true
    })

});

/*router.post("/signup", function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user){
        if(err){return next(err);}
        if(user){
            req.flash("error", "There's already an account with this email");
            return res.redirect("/");
        }

        var newUser = new User({
            username:username,
            password:password,
            //email:email
        });

        newUser.save(next);

    }); passport.authenticate("login", {
        successRedirect:"/",
        failureRedirect: "/signup",
        failureFlash:true
    })

});*/

/*router.post("/login", authenticate(req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;

    if(username === null) 
    {
        return res.status(400).json({
            message: "Invalid Username.",
        });
    } 
    else 
    {
        if (username == "admin" && password == "admin123") 
        {
            console.log("User Successfully Logged In")
            res.redirect("/adminpanel")
        }   else 
        {
            console.log("Invalid Password")
            return res.status(400).json({
                message: "Incorrect Password",
            });
        }
    }
});*/
/*
router.post("/login", function(req,res,next){
    var username = req.body.username;
    var password = req.body.password; */

    /*User.findOne({username: username}, function(err, user) {
        if(err){return next(err);}
        if(user){
            req.flash("error", "There's already an account with this email");
            return res.redirect("/");
        }*/
    /*
    if(username === null) 
    {
        return res.status(400).json({
            message: "Invalid Username.",
        });
    } 
    else 
    {
        if (username == "admin" && password == "admin123") 
        {
            console.log("User Successfully Logged In.")
            res.redirect("/adminpanel")
        }   else 
        {
            console.log("Invalid Password")
            return res.status(400).json({
                message: "Incorrect Password.",
            });
        }
    }
    if(username == "admin" && password == "admin123") {
        return done(null,false,{message: "Successfully Logged In."});
    } 
    else if (username != "admin" && password != "admin123") {
        return done(null,false,{message: "Incorrect Username and Password"});
    }
    else {
        if (username != "admin") {
            return done(null,false,{message: "Incorrect Username"});
        } 
        else if (password != "admin123") {
            return done(null,false,{message: "Incoreect Password"}); 
        } 
    }


}); passport.authenticate("login", {
        successRedirect:"/adminpanel",
        failureRedirect: "/login",
        failureFlash:true
});*/

//});

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////