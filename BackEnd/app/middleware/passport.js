const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

passport.use(new JwtStrategy({},() => {
   // jwtFromRequest: ,
  //  secretOrKey: process.env.JWT_KEY,
}))