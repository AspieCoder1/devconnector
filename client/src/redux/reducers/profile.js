const initialState = {
	profile: null,
	profiles: null,
	loading: true
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PROFILE':
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: true
			};
		case 'CLEAR_CURRENT_PROFILE':
			return {
				...state,
				profile: null
			};
		default:
			return state;
	}
};