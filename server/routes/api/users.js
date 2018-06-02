const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const User = require('../../models/User');

// @route 	GET api/users/register
// @desc 		Register user
// @access 	Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (e, salt) => {
				if (e) throw e;
				bcrypt.hash(newUser.password, salt, (e, hash) => {
					if (e) throw e;
					newUser.password = hash;
					newUser.save().then(user => res.status(200).json(user)).catch(e =>{
						console.log(e);
					});
				});
			});
		}
	});
});

// @route 	GET api/users/login
// @desc 		Login user ? Returning JWT Token
// @access 	Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;
	
	User.findOne({ email }).then(user => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = { id: user.id, name: user.name, avatar: user.avatar };
				// Generate token
				jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
					res.json({ success: true, token: 'Bearer ' + token});
				});
			} else {
				errors.password = 'Password is incorrect'; 
				return res.status(400).json(errors);
			}
		});
	});
});

// @route 	GET api/users/current
// @desc 		Returns current user
// @access 	Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;