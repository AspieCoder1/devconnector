import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/actions/authActions';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
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
		const { errors } = this.state;

		return ( 
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your DevConnector account</p>
							<form action="create-profile.html" noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input type="text" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.name 
									})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.name}</p>
									</div>
								</div>
								<div className="form-group">
									<input type="email" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.email
									})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.email}</p>
									</div>
									<small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
								</div>
								<div className="form-group">
									<input type="password" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.password
									})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.password}</p>
									</div>
								</div>
								<div className="form-group">
									<input type="password" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.password2
									})} placeholder="Confirm Password" name="password2" value={this.state.password2}onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.password2}</p>
									</div>
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));