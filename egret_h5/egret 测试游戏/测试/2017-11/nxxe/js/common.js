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
			"content": "{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\",\"img\":\"quce\\/quiz-5481-tdJz5yMwwB.jpg\",\"desc\":\"\\u4e0d\\u7ba1\\u662f\\u5185\\u5728\\u8fd8\\u662f\\u5916\\u5728\\uff0c\\u4f60\\u90fd\\u662f\\u4e00\\u6837\\u7684\\uff01\\u4f60\\u662f\\u4e2a\\u5b89\\u5b9a\\u7684\\u4eba\\uff0c\\u6027\\u683c\\u8f83\\u7a33\\uff0c\\u4e0d\\u559c\\u6b22\\u6fc0\\u8fdb\\u7684\\u4e8b\\u60c5\\uff0c\\u8fd9\\u6837\\u7684\\u6027\\u683c\\u867d\\u7136\\u53ef\\u80fd\\u8ba9\\u4f60\\u5728\\u5076\\u5c14\\u7684\\u65f6\\u5019\\u7fa1\\u6155\\u4e00\\u4e0b\\u90a3\\u4e9b\\u65e5\\u5b50\\u8fc7\\u5f97\\u98ce\\u98ce\\u706b\\u706b\\u3001\\u65b0\\u9c9c\\u7684\\u82b1\\u6837\\u4e0d\\u65ad\\u7684\\u4eba\\uff0c\\u4f46\\u4f60\\u66f4\\u4eab\\u53d7\\u5e73\\u548c\\u5b89\\u4e50\\u5e26\\u7ed9\\u4f60\\u7684\\u5feb\\u4e50\\u3002\\u540c\\u65f6\\uff0c\\u4f60\\u8fd8\\u4f1a\\u83b7\\u5f97\\u6bd4\\u8f83\\u597d\\u7684\\u7231\\u60c5\\u4e0e\\u5a5a\\u59fb\\uff01\",\"sharetitle\":\"\\u6211\\u5185\\u5fc3\\u7684\\u90aa\\u6076\\u6307\\u6570\\u662f20%\\uff0c\\u5feb\\u6d4b\\u6d4b\\u4f60\\u5185\\u5fc3\\u771f\\u7684\\u5f88\\u90aa\\u6076\\u5417\\uff1f\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\"},{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\"},{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\"},{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\"},{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/151332120559jBW.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\",\"img\":\"quce\\/quiz-5481-n6kSFCRWYs.jpg\",\"desc\":\"\\u4ece\\u5916\\u8868\\u4e0a\\u770b\\u4f60\\u662f\\u4e00\\u4e2a\\u795e\\u7ecf\\u5f88\\u7ec6\\u4e14\\u6e29\\u67d4\\u4f53\\u8d34\\u7684\\u4eba\\uff0c\\u901a\\u5e38\\u7ed9\\u4eba\\u7684\\u7b2c\\u4e00\\u5370\\u8c61\\u662f\\u6587\\u9759\\uff0c\\u53ef\\u8fd9\\u53ea\\u662f\\u8868\\u8c61\\uff0c\\u5b9e\\u9645\\u4e0a\\u4f60\\u53ef\\u80fd\\u4e00\\u5f00\\u53e3\\u5c31\\u4f1a\\u98a0\\u8986\\u522b\\u4eba\\u5bf9\\u4f60\\u7684\\u5370\\u8c61\\uff0c\\u8ba9\\u521a\\u521a\\u5efa\\u7acb\\u8d77\\u6765\\u7684\\u6587\\u9759\\u5370\\u8c61\\u8361\\u7136\\u65e0\\u5b58\\uff01\\u4f60\\u5bf9\\u4e8e\\u7b2c\\u4e00\\u6b21\\u89c1\\u9762\\u7684\\u4eba\\uff0c\\u5982\\u679c\\u51ed\\u76f4\\u89c9\\u4e0d\\u559c\\u6b22\\u7684\\u8bdd\\uff0c\\u5c31\\u4f1a\\u5f88\\u4e3b\\u89c2\\u7684\\u62d2\\u7edd\\u5bf9\\u65b9\\uff0c\\u5c5e\\u4e8e\\u597d\\u6076\\u611f\\u5f88\\u91cd\\u7684\\u4eba\\uff01\",\"sharetitle\":\"\\u6211\\u5185\\u5fc3\\u7684\\u90aa\\u6076\\u6307\\u6570\\u662f45%\\uff0c\\u5feb\\u6d4b\\u6d4b\\u4f60\\u5185\\u5fc3\\u771f\\u7684\\u5f88\\u90aa\\u6076\\u5417\\uff1f\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\"},{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\"},{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\"},{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\"},{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/151332120559jBW.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\",\"img\":\"quce\\/quiz-5481-pQcSAeRDRE.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u89c2\\u5bdf\\u529b\\u654f\\u9510\\u3001\\u611f\\u53d7\\u529b\\u4e30\\u5bcc\\u7684\\u4eba\\uff0c\\u5b63\\u8282\\u53d8\\u5316\\u6216\\u522b\\u4eba\\u7684\\u4e3e\\u624b\\u6295\\u8db3\\u90fd\\u80fd\\u62e8\\u52a8\\u4f60\\u7684\\u60c5\\u7eea\\uff0c\\u5728\\u522b\\u4eba\\u773c\\u4e2d\\u770b\\u6765\\u4f60\\u662f\\u4e2a\\u60c5\\u7eea\\u5316\\u7684\\u4eba\\u3002\\u4f60\\u7684\\u9aa8\\u5b50\\u91cc\\uff0c\\u662f\\u4e00\\u4e2a\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\\uff0c\\u62e5\\u6709\\u4ed6\\u4eba\\u6240\\u4e0d\\u77e5\\u7684\\u575a\\u5f3a\\u72ec\\u7acb\\u548c\\u9738\\u9053\\u3002\\u4e0d\\u8fc7\\u4f60\\u7684\\u90aa\\u6076\\u5168\\u90e8\\u90fd\\u85cf\\u5728\\u5fc3\\u5e95\\u7f62\\u4e86\\u3002\",\"sharetitle\":\"\\u6211\\u5185\\u5fc3\\u7684\\u90aa\\u6076\\u6307\\u6570\\u662f75%\\uff0c\\u5feb\\u6d4b\\u6d4b\\u4f60\\u5185\\u5fc3\\u771f\\u7684\\u5f88\\u90aa\\u6076\\u5417\\uff1f\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\"},{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\"},{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\"},{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\"},{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/151332120559jBW.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\",\"img\":\"quce\\/quiz-5481-tmzXHNtmar.jpg\",\"desc\":\"\\u4f60\\u4ece\\u5916\\u8868\\u770b\\uff0c\\u5e76\\u4e0d\\u662f\\u6dd1\\u5973\\/\\u7ec5\\u58eb\\u6837\\uff0c\\u800c\\u662f\\u5341\\u5206\\u90aa\\u6076\\u7684\\u3002\\u5e73\\u65f6\\uff0c\\u4f60\\u770b\\u8d77\\u6765\\u6ca1\\u5fc3\\u6ca1\\u80ba\\uff0c\\u8bf4\\u7740\\u4e0d\\u7740\\u8fb9\\u9645\\u7684\\u8bdd\\uff0c\\u505a\\u7740\\u5f02\\u60f3\\u5929\\u5f00\\u7684\\u68a6\\uff0c\\u4f46\\u5b9e\\u9645\\u4e0a\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u4e0d\\u6298\\u4e0d\\u6263\\u7684\\u597d\\u4eba\\uff0c\\u4e5f\\u6709\\u81ea\\u5df1\\u7684\\u4f24\\u5fc3\\uff0c\\u4e5f\\u6709\\u81ea\\u5df1\\u6e29\\u67d4\\u7684\\u4e00\\u9762\\uff0c\\u53ea\\u662f\\u6ca1\\u673a\\u4f1a\\u8868\\u73b0\\u51fa\\u6765\\uff01\",\"sharetitle\":\"\\u6211\\u5185\\u5fc3\\u7684\\u90aa\\u6076\\u6307\\u6570\\u662f99%\\uff0c\\u5feb\\u6d4b\\u6d4b\\u4f60\\u5185\\u5fc3\\u771f\\u7684\\u5f88\\u90aa\\u6076\\u5417\\uff1f\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\"},{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\"},{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\"},{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\"},{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/151332120559jBW.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\",\"img\":\"quce\\/quiz-5481-XfndAQiSZ6.jpg\",\"desc\":\"\\u4f60\\u771f\\u7684\\u662f\\u4e00\\u4e2a\\u5916\\u8868\\u4e0e\\u5185\\u5fc3\\u90fd\\u770b\\u8d77\\u6765\\u50cf\\u662f\\u4e00\\u4e2a\\u90aa\\u6076\\u7684\\u4eba\\u3002\\u4f60\\u662f\\u4e00\\u4e2a\\u80fd\\u529b\\u8d85\\u5f3a\\u3001\\u601d\\u60f3\\u4e0a\\u6709\\u81ea\\u5df1\\u7684\\u4e3b\\u89c1\\uff0c\\u52c7\\u6562\\u575a\\u5b9a\\u7684\\u4eba\\uff01\\u751f\\u6d3b\\u4e0a\\u4e0d\\u78e8\\u53fd\\uff0c\\u5341\\u5206\\u72ec\\u7acb\\uff1b\\u5fc3\\u7406\\u4e0a\\u4e5f\\u5f88\\u52c7\\u6562\\uff0c\\u6562\\u4e8e\\u627f\\u53d7\\u78e8\\u96be\\uff01\\u8fd9\\u6837\\u7684\\u4f60\\uff0c\\u5185\\u5fc3\\u5341\\u5206\\u5f3a\\u5927\\uff0c\\u4e5f\\u8ba9\\u4eba\\u89c9\\u5f97\\u5341\\u5206\\u53ef\\u9760\\u3002\",\"sharetitle\":\"\\u6211\\u5185\\u5fc3\\u7684\\u90aa\\u6076\\u6307\\u6570\\u662f200%\\uff0c\\u5feb\\u6d4b\\u6d4b\\u4f60\\u5185\\u5fc3\\u771f\\u7684\\u5f88\\u90aa\\u6076\\u5417\\uff1f\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a20%br\\u7b80\\u5355\\u7eaf\\u7cb9\"},{\"threshold\":\"B\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a45%br\\u5916\\u8868\\u6587\\u9759\\uff0c\\u5185\\u5fc3\\u90aa\\u6076\"},{\"threshold\":\"C\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a75%br\\u5341\\u8db3\\u7684\\u5c0f\\u6076\\u9b54\"},{\"threshold\":\"D\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a99%br\\u5916\\u8868\\u90aa\\u6076\\uff0c\\u5185\\u5fc3\\u5584\\u826f\"},{\"threshold\":\"E\",\"title\":\"\\u90aa\\u6076\\u6307\\u6570\\uff1a200%br\\u6d51\\u8eab\\u6563\\u53d1\\u7740\\u6076\\u9b54\\u6c14\\u8d28\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/151332120559jBW.png\",\"account\":1003}"
		}
	]



	var _num=0;
	var data;
	for(var i=0;i<option.length;i++){
		_num+=option[i];
	}
	if(_num<=16){
		data=data1[4];
		
	}else if(_num<=22&&_num>16) {
		data=data1[3];
	
	}else if(_num<=30&&_num>22){
		data=data1[2];
	
	}else if(_num<=38&&_num>30){
		data=data1[1];
		
	}else if(_num>38){
		data=data1[0];
	}
	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] =  "./" + result['img'];
		}
		// clearInterval(getTimer);
		// if (timerCnt < waitTime) {
			// waitTime -= timerCnt;
			callback(result, JSON.parse(data['total']), waitTime);
		// } else {
		// 	callback(result, JSON.parse(data['total']), 0);
		// }
	} 
	// $.ajax({
	// 	type: 'POST',
	// 	url: serser,
	// 	data: postData,
	// 	dataType: 'json',
	// 	timeout: 20000,
	// 	success: function (data) {
	// 		if (data.status == 200) {
	// 			var result = JSON.parse(data['content']);
	// 			var attention = JSON.parse(data['attention']);
	// 			result['attention'] = attention;
	// 			if (result['img']) {
	// 				result['img'] = adminPath + "/" + result['img'];
	// 			}
	// 			clearInterval(getTimer);
	// 			if (timerCnt < waitTime) {
	// 				waitTime -= timerCnt;
	// 				callback(result, JSON.parse(data['total']), waitTime);
	// 			} else {
	// 				callback(result, JSON.parse(data['total']), 0);
	// 			}
	// 		} else {
	// 			clearInterval(checkTimer);
	// 			clearInterval(getTimer);
	// 			if (timerCnt < waitTime) {
	// 				setTimeout(function () {
	// 					showError(data.status);
	// 				}, (waitTime - timerCnt) * 1000);
	// 			} else {
	// 				showError(data.status);
	// 			}
	// 		}
	// 	},
	// 	error: function (xhr, type) {
	// 		var errorinfo = xhr.status + " " + type;
	// 		// console.log(errorinfo)
	// 		showError(errorinfo);
	// 	}
	// })
}