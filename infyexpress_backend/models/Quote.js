var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const quoteSchema =  new Schema({
    from :{
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true,
    },
    weight:{
        type : String,
        required : true
    },
    length:{
        type:Number
    },
    breadth : {
        type : Number,
        required : true
    },
    height : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Quote',quoteSchema);