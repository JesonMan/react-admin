import { getCookie, setCookie } from './cookie';

const LOGIN_COOKIE_NAME = 'sessionId';

export function isAuthenticated() {
	return getCookie(LOGIN_COOKIE_NAME);
}

export function authenticateSuccess(token) {
	setCookie(LOGIN_COOKIE_NAME, token);
}

export function logout() {
	setCookie(LOGIN_COOKIE_NAME, '', 0);
}