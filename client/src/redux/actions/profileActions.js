import axios from 'axios';

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get('/api/profile').then(res => dispatch({
		type: 'GET_PROFILE',
		payload: res.data
	})).catch(() => dispatch({
		type: 'GET_PROFILE',
		payload: {}
	}));
};


export const createProfile = (profileData, history) => dispatch => {
	axios.post('/api/profile', profileData).then(() => history.push('/dashboard')).catch(err => dispatch({
		type: 'GET_ERRORS',
		payload: err.response.data
	}));
};

export const setProfileLoading = () => ({
	type: 'PROFILE_LOADING'
});

export const clearProfile = () => ({
	type: 'CLEAR_CURRENT_PROFILE'
});