require('dotenv').config();

// A passport strategy for authenicating with a JSON web token
// This allows to authenicate endpoints using the token
const JwtStrategy = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const { deserializeUser } = require('passport');
// const User = mongoose.model('User');

//options is an object literal containing options to control
// how the token is extracted from the request or verified
const options = {}
// jwtFromRequest (REQUIRED) function that accepts a request as the
// only parameter and return either the JWT as a string or null.

// fromAuthHeaderAsBearerToken() creates an extractor that looks for the JWT in the auth header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;


module.exports = (passport) => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) =>{
        User.findById(jwt_payload)
        // jwt_payload is an object literal containing the decoded JWT payload
        // done is a passport callback that has error first as an argument done(error, user, info)
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