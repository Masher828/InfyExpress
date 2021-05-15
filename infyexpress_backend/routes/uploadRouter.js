const path = require("path");
const multer = require("multer");
const cors = require('./cors');
const router = require('express').Router();


const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const fileFilter =(req,file,cb)=>{
  if(!file.originalname.match(/\.(jpg|jpeg|gif|png)$/)){
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


router.post(upload.single('profilepic'),(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(req.file);
})