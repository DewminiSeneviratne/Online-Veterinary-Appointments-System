var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");
//const hbs = require("express-handlebars");
require("dotenv").config();

var setUpPassport = require("./setuppassport");

var app = express();

// Database Connection
mongoose.set('strictQuery', false);
mongoose.connect(params.DATABASECONNECTION, {});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

setUpPassport();

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

//set template engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: false
}));

//app.use("/uploads", express.static(path.resolve(__dirname, 'uploads')));
app.use("/adminPanel", express.static(path.resolve(__dirname, 'adminPanel')));

//setup passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//route prefix
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function () {
    console.log("Server started on port " + app.get("port"));
})

app.use(express.static(__dirname + '/public'));

//////////////////////////////////////////////////////////////////////////////////////////////


app.use(express.static(path.join(__dirname, 'statics')));


app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})


module.exports.app = app;

module.exports = app;
