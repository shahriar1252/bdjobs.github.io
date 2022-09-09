var CryptoJS = require('crypto-js');

const secret = 'xSEVn8A&SN_DS*Dqc/XoNeXeXDpJh92rmm^1!l0.pp2V?s+{';

exports.encrypt = (token) => {
	const cipher = CryptoJS.AES.encrypt(token, secret).toString();
	localStorage.setItem('stream', cipher);
	return cipher;
};

exports.decrypt = () => {
	const cipher = localStorage.getItem('stream');
	if (cipher) {
		const decipher = CryptoJS.AES.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
		return decipher;
	}
	return '';
};
