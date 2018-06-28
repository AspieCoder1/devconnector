import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputField = ({
	name,
	placeholder,
	value,
	label,
	error,
	icon,
	type,
	onChange,
	disabled,
	autoComplete
}) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			{label && <label>{label}</label>}
			<input
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				autoComplete={autoComplete}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	icon: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	autoComplete: PropTypes.string
};

InputField.defaultProps = {
	text: 'text'
};

export default InputField;
