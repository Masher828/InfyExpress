var User = require('./models/User');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./config');

exports.local = passport.use(new passportLocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user)=>{
    return jwt.sign(user, config.secretKey)
}

opts={}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= config.secretKey;

exports.JwtStrategy = passport.use(new JwtStrategy(opts,(payload, done)=>{
    User.findOne({_id : payload._id},(err,user)=>{
        if (err){
            return done(err, false)
        }
        else if (user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt',{session:false});