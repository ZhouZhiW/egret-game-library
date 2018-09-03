class MD5Utils {
	public constructor() {
	}
	private static secret = "4b33bec9f079144c0326d85dc8632311";
	// 4b33bec9f079144c0326d85dc8632311
	public static hex_md5(str) {
		return new md5().hex_md5(str + this.secret);
	}

	public static getMd5Data(sendData) {
		// let timestamp = Math.floor(new Date().getTime() / 1000);
		// sendData["timestamp"] = timestamp;
		// let jsonData = JSON.stringify(sendData);
		// let sign = MD5Utils.hex_md5(jsonData);
		// sendData["sign"] = sign;
		this.sign(sendData);
		return sendData;
	}
	public static sign(params) {
		params['timestamp'] = Math.floor(new Date().getTime() / 1000);
		let keys = Object.keys(params).sort();
		let sign_data = [];
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i].toLocaleLowerCase();
			if (key === 'sign') {
				continue;
			}
			sign_data.push(key + '=' + params[key]);
		}
		let sign = this.hex_md5(sign_data.join('&'));
		params.sign = sign;

	}
}