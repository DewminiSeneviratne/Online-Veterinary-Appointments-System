//const { compare } = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function(){
    //turns a user object into an id
    //serializing the user
    passport.serializeUser(function(user,done){
        done(null, user._id); 
    });

    //turns the id into a user object
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
     });

     passport.use("login", new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
     },function(username, password, done){
        
       /* User.findOne(function(err, user){
            if(err){return done(err);}
            if(username != "admin"){
                return done(null,false,{message: "Incorrect Username"});
            }
        });
        User.findOne(function(err, user){
            if(err){return done(err);}
            if(password != "admin123"){
                return done(null,false,{message: "Incoreect Password"});      
            }
        });
        User.findOne(function(err,user){
            if(err){return done(err);}
            if(username != "admin" && password != "admin123"){
                return done(null,false,{message: "Incorrect Username or Password"});
            }
        });

        User.findOne(function(err,user){
            if(err){return done(err);}
            if(username == "admin" && password == "admin123"){
                return done(null,false,{message: "Successfully Logged In."});
            }
        });

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
        }*/

     }));
     
};
/*
//serializing the user
passport.serializeUser(function(user,done){
    done(null, user.id); 
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
 });

 //setup strategy  authenticate
 passport.use(new LocalStrategy(function (username, password, done){
    User.findOne ({username: username}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, {message:"Incorrect Username." });

        compare(password, user.password, function(err, res) {
            if (err) return done(err);
            if (res ===false) return done(null, false, {message: "Incorrect Password."});

            return done(null,user);
        });
    });
 })); */


/*
module.exports = function(){
    //turns a user object into an id
    passport.serializeUser(function(user,done){
        done(null, user._id); //serializing the user
    });

    //turns the id into a user object
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
     });

     passport.use("login", new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
     },function(email, password, done){
        //User.findOne({email: email}, function(err, user){
            //if(err){return done(err);}
            //if(!user){
                //return done(null,false,{message: "No user has that Email!"});
            //}
            User.checkPassword(password, function(err, isMatch){
                if(err) {return done(err);}
                if(isMatch){
                    return done(null, User);
                } else{
                    return done(null,false,{message:"Invalid Password"});
                }
            });
        //});
     }));
}*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////