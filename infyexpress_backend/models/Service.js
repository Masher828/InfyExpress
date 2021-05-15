var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Service = new Schema({
    name : {
        type : String,
        required : true
    },
    slogan:{
        type : String,
        required : true
    },
    psize : {
        type : String
    },
    pweight : {
        type : String 
    }

});

module.exports = mongoose.model('Service',Service);