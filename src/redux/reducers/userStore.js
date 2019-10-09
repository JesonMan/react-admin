import { LOGIN, LOGOUT, REGISTER } from '@/redux/types/const';
import { isAuthenticated, authenticateSuccess, logout } from '@/utils/session';

// 初始化state
const initState = {
	isLogin: !!isAuthenticated(),
	users: localStorage.users ? JSON.parse(localStorage.users) : [{ username: 'admin', password: 'admin' }],
	loginUser: isAuthenticated() ? { name: isAuthenticated() } : {}
};

export default function reducer(state = initState, action) {
	switch (action.type) {
		case LOGIN:
			authenticateSuccess(action.name);
			return { ...state, isLogin: true, loginUser: { name: action.name } };
		case LOGOUT:
			logout();
			return { ...state, isLogin: false, loginUser: {} };
		case REGISTER:
			localStorage.setItem('users', JSON.stringify([...state.users, {
				username: action.username, password: action.password
			}]));
			return {
				...state,
				users: [...state.users, {
					username: action.username, password: action.password
				}]
			};
		default:
			return state;
	}
}