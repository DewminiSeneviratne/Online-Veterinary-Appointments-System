/*const mongoose = require("mongoose");

const SALT_FACTOR =10;

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}
});



userSchema.methods.checkPassword = function(guess, done){
    if(this.password != null){
        bcrypt.compare(guess,this.password, function(err, isMatch){
            done(err, isMatch);
        });
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;*/