const JWTStrategy = require('passport-jwt').Strategy;
const ExstractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('../config/keys');

const opts = {};

opts.jwtFromRequest = ExstractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
		User.findById({ _id:  jwt_payload.id }).then(user => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		}).catch(e => console.log(e));
	}));
};