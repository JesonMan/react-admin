import { LOGIN, LOGOUT, REGISTER } from '@/redux/types/const';

// 登录
export function login(name) {
	return {
		type: LOGIN,
		name
	};
}

// 注销
export function logout() {
	return { type: LOGOUT };
}

// 注册
export function register(username, password) {
	return {
		type: REGISTER,
		username,
		password
	};
}