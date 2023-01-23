var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Inquiry = require("../../models/contact");

var router = express.Router();

//router.use(ensureAuthenticated);

router.get("/", function (req, res) {
    Inquiry.find().exec(function (err, inquiries) {
        if (err) { console.log(err); }

        res.render("home/contact", { inquiries: inquiries });
    });
});


router.get("/add", function (req, res) {
    res.render("home/contact");
});

router.post("/add", function (req, res) {

    var newInquiry = new Inquiry({
        contactname: req.body.contactname,
        contactemail: req.body.contactemail,
        contactno: req.body.contactno,
        message: req.body.message,
        //userID:req.user._id
    });

    newInquiry.save(function (err, inquiry) {
        if (err) { console.log(err); }
        res.render("home/contact", { message: 'Your Message Has Been Sent Successfully.'})
    });

});


module.exports = router;



