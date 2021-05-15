var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Booking = new Schema({
    user:{
        type : Schema.Types.ObjectId
    },
    service :{
        type : Schema.Types.ObjectId
    },
    sname:{
        type : String,
        required : true
    },
    rname : {
        type : String,
        required : true
    },
    datetime : {
        type : Date,
        default : new Date()
    },
    rcontact : {
        type : String,
        required : true
    },
    scontact : {
        type : String,
        required : true
    },
    rcountry:{
        type :String,
        required : true
    },
    scountry:{
        type :String,
        required : true
    },
    rcity:{
        type : String,
        required : true
    },
    scity:{
        type : String,
        required : true
    },
    rzip:{
        type : Number,
        required : true
    },
    szip:{
        type : Number,
        required : true
    },
    raddr:{
        type:String,
        required :true
    },
    saddr:{
        type:String,
        required :true
    },
    status:{
        type : String,
        default:"In Progress"
    }
});

module.exports = mongoose.model('Booking',Booking);