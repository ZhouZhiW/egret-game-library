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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05br\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\",\"img\":\"quce\\/quiz-5337-BCTGXE2Gfk.jpg\",\"desc\":\"\\u54c7\\uff0c\\u4f60\\u7b80\\u76f4\\u662f\\u4e00\\u4e2a\\u53d1\\u7535\\u673a\\uff01\\u4f60\\u5929\\u751f\\u5c31\\u6709\\u5a9a\\u60d1\\u5f02\\u6027\\u672c\\u4e8b\\uff0c\\u4e3e\\u624b\\u6295\\u8db3\\u4e4b\\u95f4\\u90fd\\u6d41\\u9732\\u51fa\\u4f4e\\u8c03\\u7684\\u6027\\u611f\\uff0c\\u9b45\\u529b\\u5929\\u6210\\uff0c\\u5c31\\u7b97\\u4e0d\\u8bf4\\u8bdd\\u5750\\u5728\\u90a3\\u513f\\u4e0d\\u52a8\\u4e5f\\u80fd\\u64a9\\u7684\\u5bf9\\u65b9\\u5fc3\\u75d2\\u96be\\u8010\\uff0c\\u518d\\u914d\\u5408\\u4e0a\\u4f60\\u4e0d\\u7ecf\\u610f\\u7684\\u5c0f\\u52a8\\u4f5c\\uff0c\\u5728\\u5f02\\u6027\\u5fc3\\u76ee\\u4e2d\\u7684\\u64a9\\u4eba\\u6307\\u6570\\u767e\\u5206\\u767e\\uff01\",\"sharetitle\":\"\\u4f60\\u64a9\\u4eba\\u7684\\u529f\\u529b\\u6709\\u51e0\\u5206\\uff1f\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05\\uff0c\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05br\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05br\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05br\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05br\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513756852FSv4d.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05br\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\",\"img\":\"quce\\/quiz-5337-4Twr3ci76C.jpg\",\"desc\":\"\\u4f60\\u662f\\u5929\\u751f\\u7684\\u64a9\\u4eba\\u738b\\uff01\\u5728\\u611f\\u60c5\\u4e2d\\uff0c\\u4f60\\u53ef\\u4ee5\\u8bf4\\u662f\\u5f88\\u6c89\\u5f97\\u4f4f\\u6c14\\u4e86\\uff0c\\u61c2\\u5f97\\u628a\\u63e1\\u65f6\\u673a\\uff0c\\u77e5\\u9053\\u4ec0\\u4e48\\u65f6\\u5019\\u8bf4\\u4ec0\\u4e48\\u8bdd\\u505a\\u4ec0\\u4e48\\u52a8\\u4f5c\\u4f1a\\u8ba9\\u5f02\\u6027\\u5bf9\\u4f60\\u5fc3\\u52a8\\u3002\\u4f46\\u4f60\\u5374\\u4ece\\u4e0d\\u4e3b\\u52a8\\u5411\\u5bf9\\u65b9\\u544a\\u767d\\uff0c\\u800c\\u662f\\u5148\\u52fe\\u5f15ta\\u9760\\u8fd1\\u4f60\\uff0c\\u518d\\u6b32\\u62d2\\u8fd8\\u8fce\\u53bb\\u62d6\\u62c9\\uff0c\\u8fd9\\u79cd\\u6070\\u5230\\u597d\\u5904\\u7684\\u95f7\\u9a9a\\u603b\\u662f\\u8ba9\\u4eba\\u5fc3\\u75d2\\u75d2\\u3002\",\"sharetitle\":\"\\u4f60\\u64a9\\u4eba\\u7684\\u529f\\u529b\\u6709\\u51e0\\u5206\\uff1f\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05\\uff0c\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05br\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05br\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05br\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05br\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513756852FSv4d.png\",\"account\":1003}" },		
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05br\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\",\"img\":\"quce\\/quiz-5337-MeankxanmR.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5916\\u51b7\\u5185\\u70ed\\u7684\\u4eba\\uff0c\\u751f\\u6d3b\\u4e2d\\u770b\\u8d77\\u6765\\u5bf9\\u4ec0\\u4e48\\u90fd\\u65e0\\u6240\\u8c13\\u7684\\u6837\\u5b50\\u5f88\\u6de1\\u7136\\uff0c\\u4f46\\u4f60\\u9aa8\\u5b50\\u91cc\\u5374\\u4e00\\u70b9\\u4e5f\\u4e0d\\u51b7\\uff0c\\u7279\\u522b\\u662f\\u5728\\u7231\\u4e0a\\u4e00\\u4e2a\\u4eba\\u7684\\u65f6\\u5019\\uff0c\\u7206\\u53d1\\u529b\\u662f\\u6781\\u5f3a\\u7684\\u3002\\u53ef\\u4ee5\\u8bf4\\u4f60\\u5728\\u5916\\u4eba\\u9762\\u524d\\u9ad8\\u51b7\\u7981\\u6b32\\uff0c\\u56de\\u5230\\u5bb6\\u540e\\u70ed\\u60c5\\u4f3c\\u706b\\uff0c\\u8fd9\\u79cd\\u6781\\u5177\\u53cd\\u5dee\\u7684\\u6001\\u5ea6\\uff0c\\u5176\\u5b9e\\u662f\\u5f88\\u64a9\\u4eba\\u7684\\u54e6\\uff01\",\"sharetitle\":\"\\u4f60\\u64a9\\u4eba\\u7684\\u529f\\u529b\\u6709\\u51e0\\u5206\\uff1f\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05\\uff0c\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05br\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05br\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05br\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05br\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513756852FSv4d.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05br\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\",\"img\":\"quce\\/quiz-5337-2QTA56inS8.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u4e2a\\u6027\\u9c9c\\u660e\\u7684\\u4eba\\uff0c\\u5728\\u7231\\u60c5\\u4e2d\\u4e0d\\u559c\\u6b22\\u63a8\\u62c9\\u731c\\u5fcc\\u7684\\u641e\\u66a7\\u6627\\u3002\\u4f60\\u8ba4\\u4e3a\\u559c\\u6b22\\u5c31\\u8981\\u5927\\u58f0\\u51fa\\u6765\\uff0c\\u4e0d\\u559c\\u6b22\\u4e5f\\u8981\\u61c2\\u5f97\\u5982\\u4f55\\u53bb\\u62d2\\u7edd\\uff0c\\u90a3\\u4e9b\\u6709\\u7684\\u6ca1\\u7684\\u6b32\\u64d2\\u6545\\u7eb5\\u7684\\u5c0f\\u624b\\u6bb5\\u548c\\u82b1\\u62db\\u90fd\\u662f\\u4e0d\\u9760\\u8c31\\u7684\\u8868\\u73b0\\uff0c\\u6211\\u4eec\\u5e94\\u8be5\\u7528\\u6700\\u771f\\u5b9e\\u7684\\u81ea\\u5df1\\u53bb\\u9762\\u5bf9\\u6700\\u771f\\u631a\\u7684\\u7231\\u60c5\\u3002\",\"sharetitle\":\"\\u4f60\\u64a9\\u4eba\\u7684\\u529f\\u529b\\u6709\\u51e0\\u5206\\uff1f\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05\\uff0c\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a300\\uff05br\\u9b45\\u60d1\\u5341\\u8db3\\u7684\\u53d1\\u7535\\u673a\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a120\\uff05br\\u6b32\\u62d2\\u8fd8\\u8fce\\u95f7\\u9a9a\\u738b\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a95\\uff05br\\u5916\\u51b7\\u5185\\u70ed\\u53cd\\u5dee\\u64a9\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u4eba\\u529f\\u529b\\uff1a0.8\\uff05br\\u4e2a\\u6027\\u76f4\\u767d\\u4ece\\u4e0d\\u66a7\\u6627\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513756852FSv4d.png\",\"account\":1003}" },
	]
	var _num=0;
	var data;
	for(var i=0;i<option.length;i++){
		_num+=option[i];
	}
	if(_num<14){
		data=data1[3];
	}else if(_num<16&&_num>=14) {
		data=data1[2];
	
	}else if(_num<19&&_num>=16){
		data=data1[1];
	
	}else if(_num>=19){
		data=data1[0];
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