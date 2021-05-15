var bookingRouter = require('express').Router();
var Booking = require('../models/Booking');
var mongoose = require('mongoose');
var cors = require('./cors');
var Service = require('../models/Service');
var authenticate = require('../authenticate');
sendResponse = (res,code, json)=>{
    res.statusCode = code;
    res.setHeader('Content-Type','application/json');
    res.json(json)
  }


bookingRouter.route('/')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req, res, next)=>{
    Booking.find({user:req.user._id, status:"In Progress"})
    .then((bookings)=>{
        sendResponse(res, 200, {success:true, bookings:bookings});
    }, (err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next)=>{
    Service.findById({_id:mongoose.Types.ObjectId(req.body.service)})
    .then((service)=>{
        if (service !=null){
            Booking.create(req.body)
            .then((booking)=>{
                booking.user = req.user._id;
                booking.save();
                sendResponse(res, 200, {success:true});
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else{
            sendResponse(res, 200,{success:false, err:"Service does not exists"});
        }
    }, (err)=>{
        sendResponse(res,200,{success:false, err:err});
    })
    .catch((err)=>{
        sendResponse(res,200,{success:false, err:err});
    })
    
});

bookingRouter.route('/cancel')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next)=>{
    console.log(req.body);
    Booking.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.bookingId),{$set:{status:"Cancelled"}},{new:true})
    .then((resp)=>{
        sendResponse(res, 200, {success:true});
    },(err)=>next(err))
    .catch((err)=>next(err));
    
});

bookingRouter.route('/delivered')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.post(cors.corsWithOptions,(req,res,next)=>{
    Booking.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.bookingId),{$set:{status:"Delivered "}},{new:true})
    .then((resp)=>{
        sendResponse(res, 200, {success:true});
    },(err)=>next(err))
    .catch((err)=>next(err));
});

bookingRouter.route('/update/bookingId')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.put(cors.corsWithOptions,(req,res,next)=>{
    Booking.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.bookingId),{$set:req.body},{new:true})
    .then((booking)=>{
        sendResponse(res, 200, {success:true})
    },(err)=>next(err))
    .catch((err)=>next(err));
});
module.exports = bookingRouter;