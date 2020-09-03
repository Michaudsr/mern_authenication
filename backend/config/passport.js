require('dotenv').config();

// A passport strategy for authenicating with a JSON web token
// This allows to authenicate endpoints using the token
const JwtStrategy = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const { deserializeUser } = require('passport');
// const User = mongoose.model('User');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;


module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) =>{
        User.findById(jwt_payload)
        .then(user => {
            if(user) {
                // If the user found, return null (for error) and user
                return done(null, user);
            }
            // If no user is found
            return done(null, false);
        })
        .catch(error => console.log("passport error", error));
    }));
}