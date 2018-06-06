import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import SelectField from '../common/SelectField';
import InputGroup from '../common/InputField';
import { createProfile } from '../../redux/actions/profileActions';

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: '',
		status: '',
		company: '',
		website: '',
		location: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	onSubmit = e => {
		e.preventDefault();
		const newProfile = {
			handle: this.state.handle,
			status: this.state.status,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};

		this.props.createProfile(newProfile, this.props.history);
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	// componentWillRecieveProps is deprecated
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.errors) {
			return {
				errors: nextProps.errors
			};
		}
		return null;
	}

	render() {
		const { errors, displaySocialInputs } = this.state;
		const statusOptions = [
			{ label: 'Select professional status', value: '0' },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student', value: 'Student' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' },
		];

		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup placeholder="Twitter" name="twitter" icon="fab fa-twitter" value={this.state.twitter} onChange={this.onChange} error={errors.twitter}/>
					<InputGroup placeholder="Facebook" name="facebook" icon="fab fa-facebook" value={this.state.facebook} onChange={this.onChange} error={errors.facebook}/>
					<InputGroup placeholder="LinkedIn" name="linkedin" icon="fab fa-linkedin" value={this.state.linkedin} onChange={this.onChange} error={errors.linkedin}/>
					<InputGroup placeholder="Youtube" name="youtube" icon="fab fa-youtube" value={this.state.youtube} onChange={this.onChange} error={errors.youtube}/>				
					<InputGroup placeholder="Instagram" name="instagram" icon="fab fa-instagram" value={this.state.instagram} onChange={this.onChange} error={errors.instagram}/>
				</div>
			);
		}

		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile stand out
							</p>
							<form onSubmit={this.onSubmit}>
								<TextField placeholder="Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} info="A unique handle for your profile URL. Your fullname, nickname, company name etc." error={errors.handle}/>
								<SelectField placeholder="Status" name="status" value={this.state.status} onChange={this.onChange} options={statusOptions} error={errors.status} info="Give us an idea of where you are in your career"/>
								<TextField placeholder="Company (Optional)" name="company" value={this.state.company} onChange={this.onChange} error={errors.company}/>
								<TextField placeholder="Website (Optional)" name="website" value={this.state.website} onChange={this.onChange} error={errors.website}/>
								<TextField placeholder="Location (Optional)" name="location" value={this.state.location} onChange={this.onChange} error={errors.location}/>
								<TextArea placeholder="Skills" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} info="Please use comma seperated values (eg. HTML, CSS, JavaScript, Django)"/>
								<TextField placeholder="GitHub username (Optional)" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} info="Required if you wish to display your latest repos and a github link to be displayed on your profile"/>
								<TextArea placeholder="Bio (Optional)" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Tell us a little about yourself"/>
								<div className="mb-3">
									<button className="btn btn-light" onClick={() => {this.setState(prev => ({displaySocialInputs: !prev.displaySocialInputs}));}}>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" onSubmit={this.onSubmit} className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));