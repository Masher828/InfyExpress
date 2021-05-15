var express = require('express');
var adminRouter = express.Router()
var Quote = require('../models/Quote');
var cors = require('./cors');

sendResponse = (res,code, json)=>{
    res.statusCode = code;
    res.setHeader('Content-Type','application/json');
    res.json(json)
  }

adminRouter.route('/addQuote')
.options(cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
.post(cors.corsWithOptions,(req,res,next)=>{
    Quote.create(req.body)
    .then((quote)=>{
        sendResponse(res,200,{success:true});
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = adminRouter;