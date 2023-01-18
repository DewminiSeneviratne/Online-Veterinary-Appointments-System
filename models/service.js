var mongoose = require("mongoose");


var serviceSchema = mongoose.Schema({
    servicename: {type: String, required:true},
    servicedescription: {type:String, required:false},
    animals: {type:String, required:false},
    price: {type:String, required:false},
    sentAt: {type:Date, default:Date.now}
});

var Service = mongoose.model("Service", serviceSchema);

module.exports = Service;