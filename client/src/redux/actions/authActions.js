import axios from 'axios';

export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData).then(() => history.push('/login')).catch(e => dispatch({
		type: 'GET_ERRORS',
		payload: e.response.data
	}));
};

export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData).then(res => {
		// save to local storage
		const token = res.data.token;
		console.log(token);
	}).catch(e => dispatch({
		type: 'GET_ERRORS',
		payload: e.response.data
	}));
};