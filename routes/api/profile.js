const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route 	GET api/profile
// @desc 		Tests Profile Route
// @access 	Public
router.get('/test', (req, res) => {
	res.json({
		msg: 'Profile Works'
	});
});

// @route 	GET api/profile
// @desc 		Get current user profile
// @access 	Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	errors = {};
	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
	}).catch(e => res.status(400).json(e));
});

// @route 	POST api/profile
// @desc 		Create and update user profile
// @access 	Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	let errors = {};
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.social.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.social.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.social.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.social.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.social.instagram;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields }, { new: true }).then((profile) => res.status(200).json(profile));
		} else {
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				} else {
					new Profile(profileFields).save().then((profile) => res.status(200).json(profile));
				}
			});
		}
	});
});

module.exports = router;