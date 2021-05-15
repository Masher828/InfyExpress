var express = require('express');
var authenticate = require('../authenticate');
const passport = require('passport');
var router = express.Router();
var User = require('../models/User');
const cors = require('./cors');
const multer = require("multer");
const path = require("path");


router.options('*',cors.corsWithOptions, (req, res)=>{res.sendStatus(200);})
/* GET users listing. */
sendResponse = (res,code, json)=>{
  res.statusCode = code;
  res.setHeader('Content-Type','application/json');
  res.json(json)
}



const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null,"PROFILE-"+req.body.username + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter =(req,file,cb)=>{
 if(!file.originalname.toLowerCase().match(/\.(jpg|jpeg|gif|png)$/)){
   return cb(new Error('You can upload only image files!'),false);
 }
 else{
   cb(null, true);
 }
}
const upload = multer({
  storage: storage,
  fileFilter:fileFilter
});

router.post('/signup',cors.corsWithOptions, upload.single('profilepic'), (req,res,next)=>{
  User.register(new User({name: req.body.name, username:req.body.username, contact:req.body.contact}), req.body.password)
  .then((user,err)=>{
    if (err){
      return next(err);
    }
    else{
      if (req.file){
        user.profilepic = req.file.filename;
      }
      user.save((err, user)=>{
        if (err){
          return next(err);
        }
        else{
          passport.authenticate('local')(req,res,()=>{
            sendResponse(res,200,{success:true})
          });
        }
      });
      
    }
  },(err)=>{
    sendResponse(res,200,{success:false,err:err.message});
    })
  .catch((err)=>{
    next(err)});
})

router.post('/login',cors.corsWithOptions, (req,res, next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if (err){
      return next(err);
    }
    else if(!user){
      sendResponse(res,200,{success:false,info:info})
    }
    else{
      req.logIn(user,(err)=>{
        if (err){
          return next(err);
        }
        else{
          sendResponse(res,200,{success:true, token:authenticate.getToken({_id:req.user._id}), user_id:req.user._id});
        }
      })
    }
  })(req,res,next)
});

router.get('/logout',cors.cors,(req,res)=>{
  req.logOut()
  req.session.destroy()
  res.clearCookie('session-id');
  sendResponse(res, 200,{success:true})
})
module.exports = router;
