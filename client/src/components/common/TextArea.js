import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
	autoComplete
}) => {
	return (
		<div className="form-group">
			<textarea
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				autoComplete={autoComplete}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	autoComplete: PropTypes.string
};

export default TextArea;
