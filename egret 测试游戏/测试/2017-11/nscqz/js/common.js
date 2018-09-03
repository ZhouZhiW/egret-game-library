/**
 * commonJS
 * about class,share, moregame .etc
 */

function hasClass(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}

function toogleClass(obj, cls) {
	if (hasClass(obj, cls)) {
		removeClass(obj, cls);
	} else {
		addClass(obj, cls);
	}
}

function aboutUS() {
	location.href = aboutUrl;
}

function random(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
/*  common function */
function ajaxGet(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// var d= xmlHttp.responseText;
			//$result = JSON.parse(d);
			callback && callback(xmlHttp.responseText);
		}
	}
	xmlHttp.send();
}

function ajaxPost(url, data, callback, error) {
	var postData = data;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if (typeof (postData) === 'object') {
		postData = (function (obj) { // 转成post需要的字符串.
			var str = "";
			for (var prop in obj) {
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}
	xhr.onreadystatechange = function () {
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var text = XMLHttpReq.responseText;
				callback && callback(text);
			} else {
				xhr.abort();
				error && error(XMLHttpReq.status);
			}
		}
	};
	xhr.send(postData);
}

function updateRecord(gameId, record, level) {
	var data = {};
	data['record'] = encodeURIComponent(record);
	data['gid'] = gameId;
	data['level'] = level;
	ajaxPost(recordUrl, data);
}

/*
function getResult(serser, gid, option, callback ){
	var timerCnt = 0, getOk = 0, waitTime = 3;
	var getTimer = setInterval(function(){
		timerCnt++;
	},1000);
	var checkTimer = setInterval(function(){
		if(getOk){
			clearInterval(checkTimer);
		}
		if(timerCnt >= 20){
			clearInterval(checkTimer);
			clearInterval(getTimer);
			// ajaxPost(StatusUrl, {id:gid, status:8004});
			// alert("请求超时，请刷新重试"+8004);
			showError(8004);
		}
	},1000);
	ajaxPost(serser, {id:gid, option:option}, function(response){
		response = JSON.parse(response);
		getOk = 1;
		if(response.status == 200){
			var result = JSON.parse(response['content']);
			if(result['img']){
				result['img'] = adminPath +"/"+ result['img'];
			}
			clearInterval(getTimer);
			if(timerCnt < waitTime){
				setTimeout(function(){
					callback(result, JSON.parse(response['total']));
				}, (waitTime-timerCnt)*1000);
			}else{
				callback(result, JSON.parse(response['total']));
			}
		}else{
			clearInterval(checkTimer);
			// ajaxPost(StatusUrl, {id:gid, status:response.status});
			// alert("请求出错，请刷新重试！"+response.status);
			clearInterval(getTimer);
			if(timerCnt < waitTime){
				setTimeout(function(){
					showError(response.status);
				}, (waitTime-timerCnt)*1000);
			}else{
				showError(response.status);
			}
		}
	},function(status){
		clearInterval(checkTimer);
		//ajaxPost(StatusUrl, {id:gid, status:status});
		// alert("网络出错，请检查网络!"+status);
		clearInterval(getTimer);
		if(timerCnt < waitTime){
			setTimeout(function(){
				showError(status);
			}, (waitTime-timerCnt)*1000);
		}else{
			showError(status);
		}
	})
	resultflag = true;
}
*/

/*
	use zepto.js ajax
 */
function getResult(serser, gid, option, callback) {
	var timerCnt = 0,
		getOk = 0,
		waitTime = 5;
	var getTimer = setInterval(function () {
		timerCnt++;
	}, 1000);
	var checkTimer = setInterval(function () {
		if (getOk) {
			clearInterval(checkTimer);
		}
	}, 1000);

	var postData = {
		id: gid,
		option: option,
		acid: acid
	};
	if (typeof (postData) === 'object') {
		postData = (function (obj) { // 转成post需要的字符串.
			var str = "";
			for (var prop in obj) {
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}
	var data1 = [{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a21%br\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\",\"img\":\"quce\\/quiz-5370-fnYE7H3t5M.jpg\",\"desc\":\"\\u4f60\\u7231\\u7684\\u65f6\\u5019\\u662f\\u771f\\u7231\\uff0c\\u4e0d\\u7231\\u7684\\u65f6\\u5019\\u4f60\\u4e5f\\u662f\\u771f\\u7684\\u4e0d\\u7231\\u4e86\\uff0c\\u82e5\\u662f\\u5bf9\\u65b9\\u505a\\u4e86\\u4f60\\u4e0d\\u80fd\\u5fcd\\u53d7\\u7684\\u4e8b\\uff0c\\u6bd4\\u5982\\u80cc\\u53db\\u4e86\\u4f60\\uff0c\\u6216\\u662f\\u4e0d\\u518d\\u90a3\\u4e48\\u559c\\u6b22\\u4f60\\u4e86\\uff0c\\u4f60\\u5c31\\u4f1a\\u8fc5\\u901f\\u7684\\u7ed3\\u675f\\u8fd9\\u6bb5\\u611f\\u60c5\\u3002\\u867d\\u7136\\u4f60\\u4e5f\\u4f1a\\u96be\\u8fc7\\uff0c\\u4f46\\u4e5f\\u4f1a\\u6536\\u62fe\\u5fc3\\u60c5\\u4e0e\\u611f\\u60c5\\uff0c\\u5f00\\u59cb\\u65b0\\u7684\\u751f\\u6d3b\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u75f4\\u60c5\\u79cd\\u5417\\uff1f\\u6211\\u7684\\u60c5\\u79cd\\u6307\\u6570\\u662f60%\\uff0c\\u5728\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a520%br\\u613f\\u610f\\u4e3a\\u4f60\\u4ed8\\u51fa\\u4e00\\u5207\"},{\"threshold\":\"B\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a240%br\\u4f60\\u5c31\\u662f\\u6211\\u7684\\u5929\\u548c\\u5730\"},{\"threshold\":\"C\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a120%br\\u7231\\u4f60\\u5c31\\u662f\\u8fc1\\u5c31\\u5305\\u5bb9\"},{\"threshold\":\"D\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a21%br\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513328457ihTs1.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a120%br\\u7231\\u4f60\\u5c31\\u662f\\u8fc1\\u5c31\\u5305\\u5bb9\",\"img\":\"quce\\/quiz-5370-zmC8pjr6mw.jpg\",\"desc\":\"\\u4f60\\u4e00\\u76f4\\u89c9\\u5f97\\u7231\\u60c5\\u662f\\u8981\\u597d\\u597d\\u7ecf\\u8425\\u7684\\uff0c\\u54ea\\u6015\\u4f60\\u89c9\\u5f97\\u5bf9\\u65b9\\u6709\\u4e9b\\u5730\\u65b9\\u8ba9\\u4f60\\u4e0d\\u662f\\u5f88\\u6ee1\\u610f\\uff0c\\u4f60\\u4e5f\\u613f\\u610f\\u7ed9\\u53cc\\u65b9\\u4e00\\u4e2a\\u5171\\u540c\\u6210\\u957f\\u7684\\u673a\\u4f1a\\u3002\\u56e0\\u4e3a\\u4f60\\u89c9\\u5f97\\u7231\\u60c5\\u662f\\u76f8\\u4e92\\u5305\\u5bb9\\u3001\\u76f8\\u4e92\\u6210\\u957f\\u7684\\u4e00\\u4e2a\\u8fc7\\u7a0b\\uff0c\\u91cd\\u611f\\u60c5\\u7684\\u4f60\\uff0c\\u662f\\u4e0d\\u4f1a\\u8f7b\\u6613\\u8bf4\\u5206\\u624b\\u7684\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u75f4\\u60c5\\u79cd\\u5417\\uff1f\\u6211\\u7684\\u60c5\\u79cd\\u6307\\u6570\\u662f120%\\uff0c\\u6211\\u53ef\\u4ee5\\u4e0d\\u65ad\\u5730\\u5305\\u5bb9\\u4f60\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a520%br\\u613f\\u610f\\u4e3a\\u4f60\\u4ed8\\u51fa\\u4e00\\u5207\"},{\"threshold\":\"B\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a240%br\\u4f60\\u5c31\\u662f\\u6211\\u7684\\u5929\\u548c\\u5730\"},{\"threshold\":\"C\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a120%br\\u7231\\u4f60\\u5c31\\u662f\\u8fc1\\u5c31\\u5305\\u5bb9\"},{\"threshold\":\"D\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a21%br\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513328457ihTs1.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a240%br\\u4f60\\u5c31\\u662f\\u6211\\u7684\\u5929\\u548c\\u5730\",\"img\":\"quce\\/quiz-5370-Yd58BbXYW4.jpg\",\"desc\":\"\\u4f60\\u4e0d\\u4f1a\\u8f7b\\u6613\\u7684\\u7231\\u4e0a\\u4e00\\u4e2a\\u4eba\\uff0c\\u56e0\\u4e3a\\u4f60\\u4e0d\\u60f3\\u8981\\u90a3\\u79cd\\u51d1\\u5408\\u7684\\u7231\\u60c5\\uff0c\\u6240\\u4ee5\\u4f60\\u4e00\\u76f4\\u5728\\u5bfb\\u627e\\u771f\\u6b63\\u80fd\\u8ba9\\u4f60\\u5fc3\\u52a8\\u7684\\u90a3\\u4e2a\\u4eba\\u3002\\u5f53\\u4f60\\u9047\\u5230ta\\uff0c\\u4f60\\u4f1a\\u4e0d\\u7559\\u4f59\\u529b\\u7684\\u53bb\\u7231ta\\uff0c\\u4ece\\u6b64\\u4f60\\u7684\\u7684\\u559c\\u6012\\u54c0\\u4e50\\u5168\\u7531ta\\u8bf4\\u4e86\\u7b97\\u3002\\u800c\\u8fd9\\u4ec5\\u4ec5\\u53ea\\u6709\\u5c11\\u6570\\u4eba\\u80fd\\u505a\\u5230\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u75f4\\u60c5\\u79cd\\u5417\\uff1f\\u6211\\u7684\\u60c5\\u79cd\\u6307\\u6570\\u662f240%\\uff0c\\u88ab\\u6211\\u7231\\u7740\\u771f\\u662f\\u4e09\\u751f\\u6709\\u5e78\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a520%br\\u613f\\u610f\\u4e3a\\u4f60\\u4ed8\\u51fa\\u4e00\\u5207\"},{\"threshold\":\"B\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a240%br\\u4f60\\u5c31\\u662f\\u6211\\u7684\\u5929\\u548c\\u5730\"},{\"threshold\":\"C\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a120%br\\u7231\\u4f60\\u5c31\\u662f\\u8fc1\\u5c31\\u5305\\u5bb9\"},{\"threshold\":\"D\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a21%br\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513328457ihTs1.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a520%br\\u613f\\u610f\\u4e3a\\u4f60\\u4ed8\\u51fa\\u4e00\\u5207\",\"img\":\"quce\\/quiz-5370-7FcDH5z6XM.jpg\",\"desc\":\"\\u5411\\u4f60\\u793a\\u597d\\u7684\\u4eba\\u5f88\\u591a\\uff0c\\u4f46\\u4f60\\u90fd\\u4e0d\\u4e3a\\u6240\\u52a8\\u3002\\u5982\\u679c\\u4f60\\u4e0d\\u559c\\u6b22ta\\uff0c\\u4f60\\u5c31\\u600e\\u4e48\\u90fd\\u4e0d\\u4f1a\\u548cta\\u5728\\u4e00\\u8d77\\u3002\\u4f46\\u5982\\u679c\\u4f60\\u7231\\u4e0a\\u4e86\\u67d0\\u4e2a\\u4eba\\uff0c\\u5c31\\u7b97ta\\u5fc3\\u91cc\\u6ca1\\u6709\\u4f60\\uff0c\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u653e\\u5f03\\u7231ta\\u3002\\u4f60\\u7684\\u7231\\u7ec6\\u817b\\u771f\\u631a\\uff0c\\u80fd\\u88ab\\u4f60\\u7231\\u7740\\u7684\\u4eba\\uff0c\\u771f\\u662f\\u4e0a\\u8f88\\u5b50\\u4fee\\u6765\\u7684\\u798f\\u6c14\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u75f4\\u60c5\\u79cd\\u5417\\uff1f\\u6211\\u7684\\u60c5\\u79cd\\u6307\\u6570\\u662f520%\\uff0c\\u6211\\u7684\\u7231\\u5c31\\u662f\\u7ed9\\u4f60\\u5168\\u4e16\\u754c\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a520%br\\u613f\\u610f\\u4e3a\\u4f60\\u4ed8\\u51fa\\u4e00\\u5207\"},{\"threshold\":\"B\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a240%br\\u4f60\\u5c31\\u662f\\u6211\\u7684\\u5929\\u548c\\u5730\"},{\"threshold\":\"C\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a120%br\\u7231\\u4f60\\u5c31\\u662f\\u8fc1\\u5c31\\u5305\\u5bb9\"},{\"threshold\":\"D\",\"title\":\"\\u75f4\\u60c5\\u6307\\u6570\\uff1a21%br\\u7231\\u60c5\\u4e2d\\u62ff\\u5f97\\u8d77\\u653e\\u5f97\\u4e0b\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513328457ihTs1.png\",\"account\":1003}"
		}
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 12 && _num >= 10) {
		data = data1[1];

	} else if (_num < 14 && _num >= 12) {
		data = data1[2];

	} else if (_num >= 14) {
		data = data1[3];

	} 
	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] = adminPath + "/" + result['img'];
		}
		// clearInterval(getTimer);
		// if(timerCnt < waitTime){
		// waitTime -= timerCnt;
		callback(result, JSON.parse(data['total']), 3);
		// }else{
		// 	callback(result, JSON.parse(data['total']), 0);
		// }
	}

}