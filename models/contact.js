var mongoose = require("mongoose");


var inquirySchema = mongoose.Schema({
    contactname: {type: String, required:true},
    contactemail: {type:String, required:false},
    contactno: {type:String, required:false},
    message: {type:String, required:false},
    sentAt: {type:Date, default:Date.now},
    userID:{type:mongoose.Schema.Types.ObjectId, required:false, unique:false},
    public:{type:Boolean, default:false, required:false,unique:false}
});

var Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;

