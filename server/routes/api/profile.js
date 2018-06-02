const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route 	GET api/profile
// @desc 		Get current user profile
// @access 	Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	let errors = {};

	Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']).then(profile => {
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		res.json(profile);
	}).catch(err => res.status(404).json(err));
});

// @route 	POST api/profile
// @desc 		Create and update user profile
// @access 	Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',').map(skill => skill.trim());
	}
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ user: req.user.id }).then(profile => {
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id}, { $set: profileFields }, { new: true }).then(profile => res.status(200).json(profile));
		} else {
			Profile.findOne({ handle: profileFields.handle }).then(profile => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				} else {
					new Profile(profileFields).save().then(profile => res.status(200).json(profile));
				}
			});
		}
	});
});

// @route 	GET api/profile/all
// @desc 		Get all profiles
// @access 	Public
router.get('/all', (req, res) => {
	let errors = {};
	Profile.find().populate('user', ['name', 'avatar']).then(profiles => {
		if (!profiles) {
			errors.noproflile = 'There are no profiles';
			return res.status(404).json(errors);
		}

		res.status(200).json(profiles);
	}).catch(() => res.status(404).json({ profiles: 'There are no profiles' }));
});

// @route 	GET api/profile/handle/:handle
// @desc 		Get profile by handle
// @access 	Public
router.get('/handle/:handle', (req, res) => {
	let errors = {};

	Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']).then(profile => {
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors);
		}
		res.status(200).json(profile);
	}).catch(() => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route 	GET api/profile/user/:user_id
// @desc 		Get profile by user ID
// @access 	Public
router.get('/user/:user_id', (req, res) => {
	let errors = {};

	Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']).then(profile => {
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors);
		}
		res.status(200).json(profile);
	}).catch(() => res.status(404).json({profile: 'There is no profile for this user'}));
});

// @route 	POST api/profile/experience
// @desc 		Add experience to profile
// @access 	Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateExperienceInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then(profile => {
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		profile.experience.unshift(newExp);
		profile.save().then(profile => res.status(200).json(profile));
	});
});

// @route 	POST api/profile/education
// @desc 		Add education to profile
// @access 	Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then(profile => {
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldofstudy: req.body.fieldofstudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		profile.education.unshift(newEdu);
		profile.save().then(education => res.status(200).json(education));
	});
});

// @route 	DELETE api/profile/experience/:exp_id
// @desc 		Deletes experience from profile
// @access 	Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		profile.save().then(profile => res.status(200).json(profile)).catch(e => res.status(404).json({e}));
	});
});

// @route 	DELETE api/profile/education/:edu_id
// @desc 		Deletes education from profile
// @access 	Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		profile.save().then(profile => res.status(200).json(profile)).catch(e => res.status(404).json({e}));
	});
});

// @route 	DELETE api/profile/
// @desc 		Deletes profile
// @access 	Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id }).then(() => {
		User.findOneAndRemove({ _id: req.user.id }).then(() => res.status(200).json({ success: true}));
	});
});

module.exports = router;