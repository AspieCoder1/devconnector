import axios from 'axios';

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then(res =>
			dispatch({
				type: 'GET_PROFILE',
				payload: res.data
			})
		)
		.catch(() =>
			dispatch({
				type: 'GET_PROFILE',
				payload: {}
			})
		);
};

export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('/api/profile', profileData)
		.then(() => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const setProfileLoading = () => ({
	type: 'PROFILE_LOADING'
});

export const clearProfile = () => ({
	type: 'CLEAR_CURRENT_PROFILE'
});

export const deleteAccount = () => dispatch => {
	if (window.confirm('Are you sure? This CANNOT be undone')) {
		axios
			.delete('/api/profile')
			.then(() =>
				dispatch({
					type: 'SET_CURRENT_USER',
					payload: {}
				})
			)
			.catch(err =>
				dispatch({
					type: 'GET_ERRORS',
					payload: err.data
				})
			);
	}
};
