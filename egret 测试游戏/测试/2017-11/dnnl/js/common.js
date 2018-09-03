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
	var data1 = [


		{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a49\\u5c81\\u5de6\\u53f3br\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\",\"img\":\"quce\\/quiz-5489-QNECrRs7Ew.png\",\"desc\":\"\\u4f60\\u7684\\u8111\\u9f84\\u5df2\\u7ecf\\u8fdb\\u5165\\u4e2d\\u5e74\\uff0c\\u4f60\\u7684\\u4e3a\\u4eba\\u6bd4\\u8f83\\u7a33\\u91cd\\uff0c\\u6709\\u70b9\\u5c11\\u5e74\\u8001\\u6210\\u7684\\u611f\\u89c9\\uff0c\\u4f60\\u5bf9\\u4e16\\u754c\\u4e0a\\u7684\\u4eba\\u60c5\\u4e16\\u6545\\uff0c\\u4e16\\u6001\\u708e\\u51c9\\u7686\\u638c\\u63e1\\u4e8e\\u80f8\\u3002\\u53ea\\u6709\\u771f\\u6b63\\u4e86\\u89e3\\u4f60\\u7684\\u4eba\\uff0c\\u624d\\u61c2\\u5f97\\u4f60\\u7684\\u667a\\u6167\\u3002\\u4f60\\u7684\\u813e\\u6c14\\u4e0d\\u592a\\u597d\\uff0c\\u6709\\u70b9\\u7f3a\\u4e4f\\u8010\\u5fc3\\uff0c\\u5bb9\\u6613\\u751f\\u6c14\\u53d1\\u706b\\uff0c\\u60f9\\u5230\\u4f60\\u7684\\u4eba\\u4e0b\\u573a\\u603b\\u662f\\u4f1a\\u5f88\\u60e8\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5927\\u8111\\u5904\\u4e8e\\u4ec0\\u4e48\\u5e74\\u9f84\\u6bb5\\uff1f\\u6211\\u7684\\u5927\\u8111\\u5e74\\u9f8449\\u5c81\\u5de6\\u53f3\\uff0c\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\\u3002\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a11\\u5c81\\u5de6\\u53f3br\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a19\\u5c81\\u5de6\\u53f3br\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a28\\u5c81\\u5de6\\u53f3br\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a49\\u5c81\\u5de6\\u53f3br\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513303254C8Nk3.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a28\\u5c81\\u5de6\\u53f3br\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\",\"img\":\"quce\\/quiz-5489-8pZ6byBCBZ.png\",\"desc\":\"\\u4f60\\u7684\\u5927\\u8111\\u6b63\\u503c\\u58ee\\u5e74\\uff0c\\u601d\\u7ef4\\u6a21\\u5f0f\\u975e\\u5e38\\u6210\\u719f\\uff0c\\u63a5\\u53d7\\u65b0\\u751f\\u4e8b\\u7269\\u7684\\u80fd\\u529b\\u4e5f\\u5f88\\u5feb\\u3002\\u4f60\\u7684\\u4e2a\\u6027\\u4e00\\u4e1d\\u4e0d\\u82df\\uff0c\\u505a\\u4e8b\\u9887\\u6709\\u539f\\u5219\\uff0c\\u4f1a\\u52aa\\u529b\\u8981\\u6c42\\u81ea\\u5df1\\u628a\\u4e8b\\u60c5\\u89c4\\u5212\\u5f97\\u6709\\u6761\\u4e0d\\u7d0a\\uff0c\\u73b0\\u5728\\u4f60\\u7684\\u5927\\u8111\\u5e74\\u9f84\\u6b63\\u5c5e\\u4e8e\\u9002\\u5408\\u594b\\u6597\\u7684\\u65f6\\u671f\\uff0c\\u597d\\u597d\\u5584\\u7528\\u5fc5\\u5c06\\u4f1a\\u5e26\\u6765\\u4e0d\\u5c11\\u7684\\u5229\\u76ca\\u56de\\u62a5\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5927\\u8111\\u5904\\u4e8e\\u4ec0\\u4e48\\u5e74\\u9f84\\u6bb5\\uff1f\\u6211\\u7684\\u5927\\u8111\\u5e74\\u9f8428\\u5c81\\u5de6\\u53f3\\uff0c\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\\u3002\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a11\\u5c81\\u5de6\\u53f3br\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a19\\u5c81\\u5de6\\u53f3br\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a28\\u5c81\\u5de6\\u53f3br\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a49\\u5c81\\u5de6\\u53f3br\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513303254C8Nk3.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a19\\u5c81\\u5de6\\u53f3br\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\",\"img\":\"quce\\/quiz-5489-6yXnBXFPms.png\",\"desc\":\"\\u4f60\\u7684\\u5927\\u8111\\u73b0\\u5728\\u5904\\u4e8e\\u9752\\u5c11\\u5e74\\u72b6\\u6001\\uff0c\\u867d\\u7136\\u5df2\\u7ecf\\u5177\\u6709\\u72ec\\u7acb\\u601d\\u8003\\u7684\\u80fd\\u529b\\u4f46\\u8fd8\\u662f\\u7ecf\\u5e38\\u5904\\u5728\\u77db\\u76fe\\u4e4b\\u4e2d\\u3002\\u4f60\\u5fc3\\u5730\\u5584\\u826f\\u53c8\\u597d\\u76f8\\u5904\\uff0c\\u5e38\\u8868\\u73b0\\u51fa\\u7eaf\\u771f\\u7684\\u4e00\\u9762\\uff0c\\u4e5f\\u4f1a\\u70ed\\u5fc3\\u52a9\\u4eba\\uff0c\\u662f\\u670b\\u53cb\\u773c\\u4e2d\\u7684\\u5584\\u826f\\u5929\\u4f7f\\u300218\\u5c81\\u7684\\u8111\\u9f84\\u6b63\\u662f\\u4e00\\u4e2a\\u8111\\u7ec6\\u80de\\u6d3b\\u8dc3\\u7684\\u65f6\\u671f\\uff0c\\u8981\\u597d\\u597d\\u5f00\\u53d1\\u4f60\\u7684\\u5927\\u8111\\uff0c\\u4f60\\u7684\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5927\\u8111\\u5904\\u4e8e\\u4ec0\\u4e48\\u5e74\\u9f84\\u6bb5\\uff1f\\u6211\\u7684\\u5927\\u8111\\u5e74\\u9f8419\\u5c81\\u5de6\\u53f3\\uff0c\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\\u3002\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a11\\u5c81\\u5de6\\u53f3br\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a19\\u5c81\\u5de6\\u53f3br\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a28\\u5c81\\u5de6\\u53f3br\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a49\\u5c81\\u5de6\\u53f3br\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513303254C8Nk3.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a11\\u5c81\\u5de6\\u53f3br\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\",\"img\":\"quce\\/quiz-5489-HPrMwBsSFX.png\",\"desc\":\"\\u4e0d\\u5ba2\\u6c14\\u5730\\u8bf4\\uff0c\\u4f60\\u7684\\u8111\\u9f84\\u8fd8\\u662f\\u4e00\\u4e2a\\u5b69\\u5b50\\u3002\\u5355\\u7ec6\\u80de\\u7684\\u4f60\\u603b\\u662f\\u50cf\\u4e2a\\u5b69\\u5b50\\u4e00\\u6837\\uff0c\\u5f88\\u5bb9\\u6613\\u611f\\u52a8\\uff0c\\u603b\\u662f\\u559c\\u6b22\\u542c\\u522b\\u4eba\\u5938\\u5956\\u4f60\\uff0c\\u65f6\\u523b\\u90fd\\u4fdd\\u6301\\u7740\\u5b69\\u7ae5\\u822c\\u7684\\u5929\\u771f\\u70c2\\u6f2b\\u3002\\u8fd9\\u79cd\\u72b6\\u6001\\u4f7f\\u4f60\\u7684\\u601d\\u7ef4\\u603b\\u662f\\u5929\\u9a6c\\u884c\\u7a7a\\uff0c\\u4f46\\u8fd9\\u4e5f\\u4f7f\\u4f60\\u6bd4\\u90a3\\u4e9b\\u201c\\u6210\\u719f\\u201d\\u7684\\u4eba\\u4eec\\u66f4\\u80fd\\u611f\\u53d7\\u5230\\u5feb\\u4e50\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5927\\u8111\\u5904\\u4e8e\\u4ec0\\u4e48\\u5e74\\u9f84\\u6bb5\\uff1f\\u6211\\u7684\\u5927\\u8111\\u5e74\\u9f8411\\u5c81\\u5de6\\u53f3\\uff0c\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\\u3002\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a11\\u5c81\\u5de6\\u53f3br\\u53e4\\u7075\\u7cbe\\u602a\\uff0c\\u7a1a\\u6c14\\u672a\\u8131\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a19\\u5c81\\u5de6\\u53f3br\\u524d\\u9014\\u65e0\\u9650\\u5149\\u660e\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a28\\u5c81\\u5de6\\u53f3br\\u6b63\\u503c\\u594b\\u6597\\u65f6\\u671f\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u8111\\u5e74\\u9f84\\uff1a49\\u5c81\\u5de6\\u53f3br\\u770b\\u5c3d\\u4e16\\u6001\\u708e\\u51c9\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513303254C8Nk3.png\",\"account\":1003}"
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
		//clearInterval(getTimer);
		//if(timerCnt < waitTime){
		//	waitTime -= timerCnt;
		//	callback(result, JSON.parse(data['total']), waitTime);
		callback(result, JSON.parse(data['total']), 4);
		//}else{
		//	callback(result, JSON.parse(data['total']), 0);
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