var serviceRouter = require('express').Router()
var Service = require('../models/Service');
var mongoose = require('mongoose');
var cors = require('./cors');
const { request } = require('express');
var authenticate = require('../authenticate');
sendResponse = (res,code, json)=>{
    res.statusCode = code;
    res.setHeader('Content-Type','application/json');
    res.json(json)
  }


serviceRouter.route('/')
.options(cors.corsWithOptions,  (req, res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{

    Service.find({})
    .then((services)=>{
        sendResponse(res,200,{success : true,services:services});
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req,res,next)=>{
    Service.create(req.body)
    .then((service)=>{
        service.save()
        sendResponse(res,200,{success:true})
    }, (err)=>next(err))
    .catch((err)=>next(err));
});

serviceRouter.route('/update/:serviceId')
.put((req,res,next)=>{
    Service.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.serviceId),{$set:req.body},{new:true})
    .then((service)=>{
        sendResponse(res, 200,{success:true});
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = serviceRouter;