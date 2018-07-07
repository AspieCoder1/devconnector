import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../common/TextArea';
import { addComment } from '../../redux/actions/postActions';
import { getCurrentProfile } from '../../redux/actions/profileActions';

class CommentForm extends Component {
	state = {
		text: '',
		errors: {}
	};

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	static getDerivedStateFromProps(nextProps) {
		if (nextProps.errors) {
			return {
				errors: nextProps.errors
			};
		}
		return null;
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const { postId } = this.props;
		const { profile } = this.props.profile;
		const { user } = this.props.auth;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
			handle: profile.handle
		};

		this.props.addComment(postId, newComment);
		this.setState({ text: '' });
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Make a comment...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextArea
									placeholder="Reply to post"
									name="text"
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ addComment, getCurrentProfile }
)(CommentForm);
