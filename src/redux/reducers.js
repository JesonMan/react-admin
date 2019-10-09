import userStore from './reducers/userStore';

export default function combineReducers(state = {}, action) {
	return {
		userStore: userStore(state.userStore, action)
	};
}