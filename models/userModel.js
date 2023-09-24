const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide the user name"]
    },
    email:{
        type:String,
        required:[true, "Please provide the email address"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);