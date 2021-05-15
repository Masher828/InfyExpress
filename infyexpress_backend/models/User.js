var passportLocalMongoose = require('passport-local-mongoose');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const User = new Schema({
    name : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        maxlength:13,
        minlength:8,
        required : true
    },
    profilepic :{
        type : String
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",User);