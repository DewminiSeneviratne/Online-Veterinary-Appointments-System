var express = require("express");

var router = express.Router();

//to do: add in error and info

router.use(function (req, res, next) {

    //res.locals.currentUser = req.user;
    res.locals.adminname = req.username;
    res.locals.adminpwd = req.password;

    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.success = req.flash("success");

    next();
});

router.use("/", require("./home"));
//router.use("/posts", require("./post"));
router.use("/contact", require("./contact"));
router.use("/appointments", require("./appointments"));
//router.use("/adminPanel", require("./adminPanel"));


module.exports = router;
