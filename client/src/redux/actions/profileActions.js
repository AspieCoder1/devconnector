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

export const addExperience = (expData, history) => dispatch => {
	axios
		.post('/api/profile/experience', expData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const addEducation = (eduData, history) => dispatch => {
	axios
		.post('/api/profile/education', eduData)
		.then(() => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const deleteExperience = id => dispatch => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then(res =>
			dispatch({
				type: 'GET_PROFILE',
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const deleteEducation = id => dispatch => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then(res =>
			dispatch({
				type: 'GET_PROFILE',
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};
