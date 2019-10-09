export function getCookie(name) {
	let cookies = document.cookie.replace(/[ ]/g, '');
	let resArr = cookies.split(';');
	let res = '';
	for (let i = 0, len = resArr.length; i < len; i++) {
		let arr = resArr[i].split('=');
		if (arr[0] === name) {
			res = arr[1];
			break;
		}
	}
	return unescape(res);
}

export function setCookie(name, value, expiresDays = 1) {
	let date = new Date();
	date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化时间
	let expiresStr = `expires=${date.toGMTString()};`;
	document.cookie = `${name}=${escape(value)};${expiresStr}`;
}