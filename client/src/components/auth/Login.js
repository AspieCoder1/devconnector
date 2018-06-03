import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../redux/actions/authActions';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	}

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(user);
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	// componentWillRecieveProps is deprecated
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			nextProps.history.push('/dashboard');
		}
		return null;
	}

	render() {
		const { errors } = this.props;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form action="dashboard.html" onSubmit={this.onSubmit} noValidate>
								<div className="form-group">
									<input type="email" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.email
									})} placeholder="Email Address" autoComplete="email" name="email" value={this.state.email} onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.email}</p>
									</div>
								</div>
								<div className="form-group">
									<input type="password" className={classnames('form-control form-control-lg', {
										'is-invalid': errors.password
									})} placeholder="Password" autoComplete="password" name="password" value={this.state.password} onChange={this.onChange} />
									<div className="invalid-feedback">
										<p>{errors.password}</p>
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

Login.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);