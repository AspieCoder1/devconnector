import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../redux/actions/profileActions';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			nextProps.history.push('/not-found');
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
							<div className="col-md-6" />
						</div>
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						education={profile.education}
						experience={profile.experience}
					/>
					{profile.githubusername ? (
						<ProfileGithub username={profile.githubusername} />
					) : null}
				</div>
			);
		}

		return <div className="profile">{profileContent}</div>;
	}
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
