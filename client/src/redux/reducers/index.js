import { combineReducers } from 'redux';
import authReducer from './auth';
import errorReducer from './errors';
import profileReducer from './profile';
import postReduer from './post';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReduer
});
