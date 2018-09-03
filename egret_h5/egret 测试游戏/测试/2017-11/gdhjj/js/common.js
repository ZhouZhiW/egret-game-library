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
		{"content": "{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\",\"img\":\"quce\\/quiz-5477-RZcSsiyrZz.jpg\",\"desc\":\"\\u540c\\u5b66\\u4e0d\\u597d\\u610f\\u601d\\uff0c\\u4f60\\u8d70\\u9519\\u7247\\u573a\\u4e86\\uff01\\u8fd9\\u91cc\\u53ea\\u6709\\u53f2\\u524d\\u602a\\u517d\\uff0c\\u6ca1\\u6709\\u5bab\\u6597\\u620f\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u8d70\\u9519\\u4e86\\u7247\\u573a\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\",\"img\":\"quce\\/quiz-5477-M6ZpyyJryA.jpg\",\"desc\":\"\\u76f8\\u8c8c\\u5e73\\u5e73\\u7684\\u4f60\\uff0c\\u6839\\u672c\\u5c31\\u662f\\u5bab\\u5ef7\\u620f\\u4e2d\\u7684\\u8def\\u4eba\\u7532\\uff0c\\u7239\\u5a18\\u8d70\\u5173\\u7cfb\\u585e\\u94f6\\u5b50\\u628a\\u4f60\\u9001\\u5165\\u79c0\\u5973\\u5927\\u9009\\uff0c\\u4f60\\u5374\\u56e0\\u4e3a\\u76f8\\u8c8c\\u5e73\\u5e73\\uff0c\\u51b2\\u649e\\u4e86\\u5e1d\\u540e\\uff0c\\u88ab\\u67e5\\u51fa\\u884c\\u8d3f\\u4e4b\\u4e8b\\uff0c\\u8fd8\\u6ca1\\u6765\\u5f97\\u53ca\\u4eab\\u53d7\\u5bab\\u6597\\u5267\\u60c5\\uff0c\\u5c31\\u6109\\u5feb\\u5730\\u72d7\\u5e26\\u4e86\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u6839\\u672c\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\",\"img\":\"quce\\/quiz-5477-nchYbDsXpZ.jpg\",\"desc\":\"\\u9646\\u516c\\u5b50\\u88ab\\u4f60\\u6251\\u5230\\u65f6\\u540e\\u78d5\\u5230\\u4e86\\u540e\\u8111\\u52fa\\uff0c\\u88ab\\u6a2a\\u7740\\u62ac\\u51fa\\u4e86\\u4f60\\u5bb6\\uff0c\\u4f60\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\\uff0c\\u6210\\u4e86\\u8857\\u574a\\u90bb\\u5c45\\u6559\\u80b2\\u5b50\\u5973\\u7684\\u53cd\\u9762\\u6559\\u6750\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u53ea\\u6d3b\\u4e8620\\u5206\\u949f\\uff0c\\u6210\\u4e3a\\u4e86\\u7a7f\\u8d8a\\u5973\\u7684\\u53cd\\u9762\\u6559\\u6750\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\",\"img\":\"quce\\/quiz-5477-ZwD6ZE6m6z.jpg\",\"desc\":\"\\u5ae1\\u6bcd\\u542c\\u5230\\u4f60\\u7684\\u8bdd\\u540e\\uff0c\\u8ba4\\u4e3a\\u662f\\u5bf9\\u5979\\u7684\\u6311\\u8845\\uff0c\\u5ae1\\u6bcd\\u5f88\\u751f\\u6c14\\uff0c\\u540e\\u679c\\u5f88\\u4e25\\u91cd\\uff01\\u7236\\u4eb2\\u77e5\\u9053\\u540e\\uff0c\\u8ba4\\u4e3a\\u4f60\\u4e0d\\u77e5\\u793c\\u6570\\uff0c\\u96be\\u5f53\\u5927\\u4efb\\uff0c\\u628a\\u4f60\\u8bb8\\u914d\\u7ed9\\u4e1e\\u76f8\\u5927\\u4eba\\u7684\\u50bb\\u513f\\u5b50\\u4e86\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u53ea\\u6d3b\\u4e862\\u96c6\\uff0c\\u5ac1\\u7ed9\\u4e86\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\",\"img\":\"quce\\/quiz-5477-zjsHnhYwY8.jpg\",\"desc\":\"\\u592a\\u5b50\\u8fd8\\u6ca1\\u6709\\u89c1\\u8fc7\\u5982\\u6b64\\u4e0d\\u5206\\u5c0a\\u5351\\u7684\\u5973\\u5b50\\uff0c\\u8ba4\\u4e3a\\u4f60\\u6709\\u5931\\u4f53\\u7edf\\uff0c\\u9a8c\\u8bc1\\u4e86\\u4f60\\u7684\\u5ae1\\u59d0\\u5bf9\\u4f60\\u7684\\u5dee\\u8bc4\\uff0c\\u4e8e\\u662f\\u4f60\\u88ab\\u8d2c\\u53bb\\u51b7\\u5bab\\u626b\\u5730\\u3001\\u6d17\\u76d8\\u5b50\\u3002\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u53ea\\u6d3b\\u4e8610\\u96c6\\uff0c\\u5929\\u5929\\u5728\\u51b7\\u5bab\\u64e6\\u76d8\\u5b50\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\",\"img\":\"quce\\/quiz-5477-bBpJkjcAhP.jpg\",\"desc\":\"\\u592a\\u5b50\\u8fd8\\u6ca1\\u6709\\u89c1\\u8fc7\\u5982\\u6b64\\u5927\\u80c6\\u3001\\u8c6a\\u653e\\u7684\\u5973\\u5b50\\uff0c\\u4e0e\\u592a\\u5b50\\u5983\\u5546\\u8bae\\u4e00\\u756a\\u540e\\u8ba4\\u4e3a\\u4f60\\u88ab\\u90aa\\u795f\\u9644\\u8eab\\uff0c\\u4e8e\\u662f\\u903c\\u4f60\\u559d\\u4e0b\\u4e86\\u5047\\u9053\\u58eb\\u70bc\\u7684\\u5047\\u836f\\uff0c\\u4e8e\\u662f\\u4f60\\u4e00\\u547d\\u545c\\u547c\\u4e86\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u53ea\\u6d3b\\u4e8610\\u96c6\\uff0c\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u88ab\\u66dd\\u5149\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\",\"img\":\"quce\\/quiz-5477-zy24cQR4B2.jpg\",\"desc\":\"\\u4f60\\u5c31\\u662f\\u8fd9\\u90e8\\u5bab\\u5ead\\u5267\\u5f53\\u4e4b\\u65e0\\u6127\\u7684\\u5973\\u732a\\u811a\\uff0c\\u7687\\u5e1d\\u7684\\u6731\\u7802\\u75e3\\uff0c\\u5723\\u5ba0\\u4e0d\\u8870\\uff0c\\u65e0\\u4eba\\u66ff\\u4ee3\\uff01\\u56e0\\u4e3a\\u4f60\\u591f\\u806a\\u660e\\u673a\\u667a\\u591f\\u6740\\u4f10\\u51b3\\u65ad\\uff0c\\u65e2\\u5584\\u4e8e\\u63e3\\u5ea6\\u4eba\\u5fc3\\uff0c\\u56db\\u4e24\\u62e8\\u5343\\u65a4\\u5730\\u89e3\\u51b3\\u5371\\u673a\\uff0c\\u53c8\\u6562\\u4e8e\\u4e3a\\u81ea\\u5df1\\u7684\\u547d\\u8fd0\\u4e0b\\u8d4c\\u6ce8\\uff0c\\u50cf\\u4f60\\u8fd9\\u6837\\u7684\\u5927\\u5973\\u4e3b\\u4e0d\\u6d3b\\u5230\\u5927\\u7ed3\\u5c40\\u90fd\\u96be\\uff01\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40\\uff0c\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\",\"img\":\"quce\\/quiz-5477-WhpHbnd5p3.jpg\",\"desc\":\"\\u4f60\\u5728\\u8fd9\\u90e8\\u5bab\\u5ef7\\u620f\\u4e2d\\u662f\\u80fd\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2\\u7684\\u72e0\\u89d2\\u8272\\uff0c\\u4e5f\\u662f\\u7687\\u5e1d\\u7684\\u89e3\\u8bed\\u82b1\\u3002\\u867d\\u7136\\u540e\\u5bab\\u4eba\\u5fc3\\u9669\\u6076\\uff0c\\u4f46\\u4f60\\u65e2\\u77e5\\u5206\\u8fa8\\u654c\\u53cb\\uff0c\\u53c8\\u6709\\u80fd\\u63e3\\u6d4b\\u5723\\u610f\\uff0c\\u8fdb\\u53ef\\u53d6\\uff0c\\u9000\\u53ef\\u5b89\\uff0c\\u6240\\u4ee5\\u5c79\\u7acb\\u5267\\u7ec8\\u4e0d\\u5012\\uff01\\u7687\\u5e1d\\u9a7e\\u5d29\\u540e\\uff0c\\u4f60\\u88ab\\u4f5c\\u4e3a\\u592a\\u5983\\u9001\\u81f3\\u738b\\u5e9c\\u5b89\\u4eab\\u81ea\\u5728\\u7684\\u751f\\u6d3b\\u4e86\\u3002\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2\\uff0c\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\",\"img\":\"quce\\/quiz-5477-iRENTMX8Dj.jpg\",\"desc\":\"\\u4f60\\u5728\\u8fd9\\u90e8\\u540e\\u5bab\\u620f\\u4e2d\\u662f\\u6700\\u77a9\\u76ee\\u7684\\u89d2\\u8272\\uff0c\\u4f60\\u7684\\u5bb9\\u8c8c\\u548c\\u8eab\\u59ff\\u7d27\\u7d27\\u7684\\u6293\\u4f4f\\u4e86\\u7687\\u4e0a\\u7684\\u5fc3\\uff0c\\u914d\\u5408\\u4f60\\u7684\\u5c0f\\u5fc3\\u673a\\uff0c\\u4fbf\\u72ec\\u5f97\\u6069\\u5ba0\\u3002\\u53ef\\u662f\\u4f60\\u7684\\u51fa\\u7c7b\\u62d4\\u8403\\u906d\\u5230\\u5404\\u65b9\\u52bf\\u529b\\u7684\\u5992\\u5fcc\\uff0c\\u867d\\u4f9d\\u9760\\u4f60\\u7684\\u673a\\u667a\\u4fdd\\u5168\\u4e86\\u81ea\\u8eab\\uff0c\\u5374\\u96be\\u4ee5\\u518d\\u51fa\\u5934\\uff0c30\\u96c6\\u540e\\u9eef\\u7136\\u9000\\u573a\\u3002\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u6d3b\\u523030\\u96c6\\uff0c\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},
		{"content": "{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\",\"img\":\"quce\\/quiz-5477-DZPdff6S58.jpg\",\"desc\":\"\\u4f60\\u662f\\u8fd9\\u90e8\\u5bab\\u5ef7\\u620f\\u4e2d\\u662f\\u6700\\u5bb9\\u6613\\u88ab\\u4eba\\u559c\\u7231\\u7684\\u89d2\\u8272\\uff0c\\u6ca1\\u6709\\u5bb3\\u4eba\\u7684\\u60f3\\u6cd5\\uff0c\\u53ea\\u60f3\\u5b89\\u5b89\\u9759\\u9759\\u5730\\u505a\\u4e00\\u4e2a\\u5403\\u74dc\\u7f8e\\u5973\\u5b50\\uff0c\\u7687\\u4e0a\\u5bf9\\u4f60\\u9887\\u4e3a\\u601c\\u7231\\u3002\\u867d\\u7136\\u4e0d\\u5bb9\\u6613\\u6210\\u4e3a\\u7bad\\u9776\\u5b50\\uff0c\\u4f46\\u5374\\u7279\\u522b\\u5bb9\\u6613\\u53d7\\u5230\\u5979\\u4eba\\u7684\\u7275\\u8fde\\uff0c\\u662f\\u5426\\u80fd\\u7ad9\\u961f\\u6b63\\u786e\\u662f\\u4f60\\u80fd\\u6d3b\\u591a\\u4e45\\u7684\\u5173\\u952e\\u3002\",\"sharetitle\":\"\\u7a7f\\u8d8a\\u5bab\\u6597\\u5267\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\\u6211\\u6d3b\\u523015\\u96c6\\uff0c\\u7eaf\\u6d01\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u8d70\\u9519\\u7247\\u573a\"},{\"threshold\":\"B\",\"title\":\"\\u6d3b\\u4e0d\\u8fc7\\u7247\\u5934\\u66f2\"},{\"threshold\":\"C\",\"title\":\"\\u53ea\\u6d3b\\u4e8620\\u5206\\u949fbr\\u5931\\u53bb\\u5165\\u5bab\\u8d44\\u683c\"},{\"threshold\":\"D\",\"title\":\"\\u6d3b\\u5230\\u7b2c2\\u96c6br\\u5ac1\\u7ed9\\u4e1e\\u76f8\\u7684\\u50bb\\u513f\\u5b50\"},{\"threshold\":\"E\",\"title\":\"\\u6d3b\\u5230\\u7b2c10\\u96c6br\\u5f00\\u542f\\u51b7\\u5bab\\u6a21\\u5f0f\"},{\"threshold\":\"F\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u7a7f\\u8d8a\\u8005\\u8eab\\u4efd\\u66dd\\u5149\"},{\"threshold\":\"G\",\"title\":\"\\u6d3b\\u5230\\u5b8c\\u7f8e\\u5927\\u7ed3\\u5c40br\\u4e07\\u4eba\\u4e4b\\u4e0a\\uff0c\\u8363\\u8000\\u4e00\\u751f\"},{\"threshold\":\"H\",\"title\":\"\\u6d3b\\u5230\\u7247\\u5c3e\\u66f2br\\u8363\\u534e\\u5bcc\\u8d35\\uff0c\\u660e\\u54f2\\u4fdd\\u8eab\"},{\"threshold\":\"I\",\"title\":\"\\u6d3b\\u5230\\u7b2c30\\u96c6br\\u624d\\u8c8c\\u53cc\\u7edd\\uff0c\\u906d\\u4eba\\u5992\\u5fcc\"},{\"threshold\":\"J\",\"title\":\"\\u6d3b\\u5230\\u7b2c15\\u96c6br\\u540e\\u5bab\\u5c0f\\u767d\\u82b1\\uff0c\\u8eba\\u7740\\u4e5f\\u4e2d\\u67aa\"}]","attention": "{\"qrcode\":\"quce\\/qrcode\\/1513753244nELiM.png\",\"account\":1003}"},

	]
	var data;
	var _Array=["A", "B", "C", "D", " E", "F", "G", "H", "I", "J"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1]);
		if(_num!=-1){
			data=data1[_num];
		}
	}
	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] = "./" + result['img'];
		}
		callback(result, JSON.parse(data['total']), 3);

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