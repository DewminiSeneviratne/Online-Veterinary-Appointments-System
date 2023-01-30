//const { compare } = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function () {
    //turns a user object into an id
    //serializing the user
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    //turns the id into a user object
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("login", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {

    }));

};
