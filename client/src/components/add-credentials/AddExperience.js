import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { TextField } from '../common/TextField';
import { TextArea } from '../common/TextArea';
import PropTypes from 'prop-types';

class AddExperience extends Component {
	state = {
		company: '',
		title: '',
		from: '',
		to: '',
		current: '',
		description: '',
		errors: {},
		disabled: false
	};
	render() {
		const { errors } = this.state;
		return (
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">
								Add any job or position that you have had in the past or current
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddExperience));
