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


export const setProfileLoading = () => ({
	type: 'PROFILE_LOADING'
});

export const clearProfile = () => ({
	type: 'CLEAR_CURRENT_PROFILE'
});