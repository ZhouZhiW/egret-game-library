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
			"content": "{\"threshold\":\"D\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a77%br\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\",\"img\":\"quce\\/quiz-5578-2hSyCaQQra.png\",\"desc\":\"\\u5176\\u5b9e\\u4e0d\\u662f\\u4e0d\\u592a\\u613f\\u610f\\u81ea\\u5df1\\u592a\\u6df1\\u60c5\\u7684\\uff0c\\u56e0\\u4e3a\\u4f60\\u5bb3\\u6015\\u5728\\u4e00\\u6bb5\\u611f\\u60c5\\u4e2d\\u6295\\u5165\\u592a\\u591a\\u81ea\\u5df1\\u4f1a\\u53d7\\u4f24\\uff0c\\u8584\\u60c5\\u4e00\\u70b9\\u79bb\\u5f00\\u65f6\\u5c31\\u4e0d\\u4f1a\\u90a3\\u4e48\\u5fc3\\u75db\\u4e86\\u3002\\u56e0\\u6b64\\u4f60\\u5728\\u611f\\u60c5\\u4e2d\\u603b\\u662f\\u4f1a\\u7b49\\u5230\\u5bf9\\u65b9\\u5148\\u5bf9\\u81ea\\u5df1\\u597d\\u5230\\u4e00\\u5b9a\\u7a0b\\u5ea6\\uff0c\\u624d\\u4f1a\\u6162\\u6162\\u4ed8\\u51fa\\u81ea\\u5df1\\u7684\\u6df1\\u60c5\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u6df1\\u60c5\\uff1f\\u6211\\u7684\\u6df1\\u60c5\\u6307\\u657077%\\uff0c\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\\u3002\",\"oldimg\":\"quce\\/quiz-5578-2hSyCaQQra.png\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a399%br\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\",\"oldimg\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\"},{\"threshold\":\"B\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a269%br\\u7528\\u7231\\u5305\\u56f4TA\",\"oldimg\":\"quce\\/quiz-5578-5ki4xFMWZX.png\"},{\"threshold\":\"C\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a101%br\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\",\"oldimg\":\"quce\\/quiz-5578-MfQaBEkREH.png\"},{\"threshold\":\"D\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a77%br\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\",\"oldimg\":\"quce\\/quiz-5578-2hSyCaQQra.png\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513317603gbgdY.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a101%br\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\",\"img\":\"quce\\/quiz-5578-MfQaBEkREH.png\",\"desc\":\"\\u4f60\\u5728\\u611f\\u60c5\\u4e2d\\u76f8\\u5f53\\u6162\\u70ed\\uff0c\\u4f60\\u5355\\u8eab\\u7684\\u65f6\\u5019\\u5927\\u5bb6\\u90fd\\u89c9\\u5f97\\u4f60\\u5f88\\u8584\\u60c5\\uff0c\\u4e00\\u65e6\\u5f53\\u4f60\\u9047\\u5230\\u90a3\\u4e2a\\u8ba9\\u4f60\\u5fc3\\u52a8\\u7684\\u4eba\\u4f60\\u5c31\\u4f1a\\u5bf9ta\\u655e\\u5f00\\u5fc3\\u6249\\uff0c\\u5c55\\u73b0\\u51fa\\u4f60\\u6df1\\u60c5\\u7684\\u4e00\\u9762\\uff0c\\u56e0\\u4e3a\\u5bf9\\u4f60\\u6765\\u8bf4\\uff0c\\u611f\\u60c5\\u8fd9\\u79cd\\u4e8b\\u662f\\u4e00\\u4ef6\\u5f88\\u4e25\\u8083\\u7684\\u4e8b\\uff0c\\u8981\\u4e48\\u5c31\\u4e0d\\u7231\\uff0c\\u8981\\u7231\\u5c31\\u8981\\u6df1\\u7231\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u6df1\\u60c5\\uff1f\\u6211\\u7684\\u6df1\\u60c5\\u6307\\u6570101%\\uff0c\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\\u3002\",\"oldimg\":\"quce\\/quiz-5578-MfQaBEkREH.png\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a399%br\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\",\"oldimg\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\"},{\"threshold\":\"B\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a269%br\\u7528\\u7231\\u5305\\u56f4TA\",\"oldimg\":\"quce\\/quiz-5578-5ki4xFMWZX.png\"},{\"threshold\":\"C\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a101%br\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\",\"oldimg\":\"quce\\/quiz-5578-MfQaBEkREH.png\"},{\"threshold\":\"D\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a77%br\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\",\"oldimg\":\"quce\\/quiz-5578-2hSyCaQQra.png\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513317603gbgdY.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a269%br\\u7528\\u7231\\u5305\\u56f4TA\",\"img\":\"quce\\/quiz-5578-5ki4xFMWZX.png\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u59a5\\u59a5\\u7684\\u5b9e\\u5fc3\\u773c\\uff0c\\u5728\\u4f60\\u773c\\u91cc\\u65e2\\u7136\\u8981\\u8c08\\u604b\\u7231\\u5c31\\u8981\\u8ba4\\u771f\\u505a\\u597d\\uff0c\\u56e0\\u6b64\\u5728\\u4ea4\\u5f80\\u8fc7\\u7a0b\\u4e2d\\u4f60\\u4f1a\\u5168\\u5fc3\\u5168\\u610f\\u5730\\u53bb\\u7231TA\\uff0c\\u8ba9TA\\u88ab\\u4f60\\u7684\\u7231\\u5305\\u56f4\\uff0c\\u597d\\u5403\\u7684\\u597d\\u7528\\u7684\\u901a\\u901a\\u7ed9\\u5bf9\\u65b9\\uff0c\\u82e6\\u70b9\\u7d2f\\u70b9\\u7b97\\u5565\\uff0c\\u770b\\u7740\\u5bf9\\u65b9\\u5e78\\u798f\\u5c31\\u662f\\u81ea\\u5df1\\u6700\\u5927\\u7684\\u5e78\\u798f\\uff01\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u6df1\\u60c5\\uff1f\\u6211\\u7684\\u6df1\\u60c5\\u6307\\u6570269%\\uff0c\\u7528\\u7231\\u5305\\u56f4TA\\u3002\",\"oldimg\":\"quce\\/quiz-5578-5ki4xFMWZX.png\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a399%br\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\",\"oldimg\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\"},{\"threshold\":\"B\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a269%br\\u7528\\u7231\\u5305\\u56f4TA\",\"oldimg\":\"quce\\/quiz-5578-5ki4xFMWZX.png\"},{\"threshold\":\"C\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a101%br\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\",\"oldimg\":\"quce\\/quiz-5578-MfQaBEkREH.png\"},{\"threshold\":\"D\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a77%br\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\",\"oldimg\":\"quce\\/quiz-5578-2hSyCaQQra.png\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513317603gbgdY.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a399%br\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\",\"img\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\",\"desc\":\"\\u5f53\\u4f60\\u7231\\u4e0a\\u4e86\\u4e00\\u4e2a\\u4eba\\uff0c\\u4f60\\u5c31\\u4f1a\\u628a\\u6240\\u6709\\u611f\\u60c5\\u901a\\u901a\\u6295\\u6ce8\\u5728TA\\u8eab\\u4e0a\\uff0c\\u5168\\u5fc3\\u5168\\u610f\\u4ed8\\u51fa\\uff0c\\u773c\\u4e2d\\u53ea\\u4f1a\\u770b\\u5230\\u5bf9\\u65b9\\u7684\\u4e00\\u5207\\uff0c\\u5176\\u4ed6\\u4eba\\u5219\\u7edf\\u7edf\\u81ea\\u52a8\\u5ffd\\u7565\\u3002\\u76f8\\u7231\\u4e4b\\u540e\\uff0c\\u4e5f\\u4f1a\\u628aTA\\u4fdd\\u62a4\\u7684\\u597d\\u597d\\u7684\\uff0c\\u4e0d\\u4f1a\\u8ba9\\u5bf9\\u65b9\\u53d7\\u5230\\u4efb\\u4f55\\u4f24\\u5bb3\\u3002\\u4f60\\u5bf9\\u611f\\u60c5\\u7684\\u4e13\\u4e00\\uff0c\\u6709\\u65f6\\u5019\\u5df2\\u7ecf\\u5230\\u4e86\\u6b7b\\u5fc3\\u773c\\u7684\\u5730\\u6b65\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u6df1\\u60c5\\uff1f\\u6211\\u7684\\u6df1\\u60c5\\u6307\\u6570399%\\uff0c\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\\u3002\",\"oldimg\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a399%br\\u628a\\u5fc3\\u90fd\\u638f\\u7ed9\\u5bf9\\u65b9\",\"oldimg\":\"quce\\/quiz-5578-Rs8Y4fZ7yz.png\"},{\"threshold\":\"B\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a269%br\\u7528\\u7231\\u5305\\u56f4TA\",\"oldimg\":\"quce\\/quiz-5578-5ki4xFMWZX.png\"},{\"threshold\":\"C\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a101%br\\u8981\\u4e48\\u4e0d\\u7231\\u8981\\u4e48\\u6df1\\u7231\",\"oldimg\":\"quce\\/quiz-5578-MfQaBEkREH.png\"},{\"threshold\":\"D\",\"title\":\"\\u6df1\\u60c5\\u6307\\u6570\\uff1a77%br\\u53ea\\u662f\\u5bb3\\u6015\\u53d7\\u4f24\",\"oldimg\":\"quce\\/quiz-5578-2hSyCaQQra.png\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513317603gbgdY.png\",\"account\":1003}"
		}
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 15 && _num >= 10) {
		data = data1[1];

	} else if (_num < 20 && _num >= 15) {
		data = data1[2];

	} else if (_num >= 20) {
		data = data1[3];

	}
	
	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] = "./" + result['img'];
		}
		// clearInterval(getTimer);
		// if(timerCnt < waitTime){
		// waitTime -= timerCnt;
		callback(result, JSON.parse(data['total']), 3);
		// }else{
		// 	callback(result, JSON.parse(data['total']), 0);
		// }
	}
	// $.ajax({
	// 	type: 'POST',
	// 	url: serser,
	// 	data: postData,
	// 	dataType: 'json',
	// 	timeout: 20000,
	// 	success: function(data){
	// 		if(data.status == 200){
	// 			var result = JSON.parse(data['content']);
	// 			var attention = JSON.parse(data['attention']);
	// 			result['attention'] = attention;
	// 			if(result['img']){
	// 				result['img'] = adminPath +"/"+ result['img'];
	// 			}
	// 			clearInterval(getTimer);
	// 			if(timerCnt < waitTime){
	// 				waitTime -= timerCnt;
	// 				callback(result, JSON.parse(data['total']), waitTime);
	// 			}else{
	// 				callback(result, JSON.parse(data['total']), 0);
	// 			}
	// 		}else{
	// 			clearInterval(checkTimer);
	// 			clearInterval(getTimer);
	// 			if(timerCnt < waitTime){
	// 				setTimeout(function(){
	// 					showError(data.status);
	// 				}, (waitTime-timerCnt)*1000);
	// 			}else{
	// 				showError(data.status);
	// 			}
	// 		}
	// 	},
	// 	error: function(xhr, type){
	// 		var errorinfo = xhr.status+" "+type;
	// 		// console.log(errorinfo)
	// 		showError(errorinfo);
	// 	}
	// })
}