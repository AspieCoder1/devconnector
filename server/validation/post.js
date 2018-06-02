const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 10, max: 300})) {
		errors.text = 'Post cannot be longer than 300 character';
	}
	if (Validator.isEmpty(data.text)) {
		errors.text = 'Post cannot be empty';
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
