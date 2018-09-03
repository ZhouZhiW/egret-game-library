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
	function toogleClass(obj, cls){
		if(hasClass(obj, cls)){
			removeClass(obj, cls);
		}else{
			addClass(obj, cls);
		}
	}
	function aboutUS(){
		location.href= aboutUrl; 
	} 
    function random(min,max){
        return Math.floor(min+Math.random()*(max-min));
    } 
    
	function isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        return true;
	    }else{
	        return false;
	    }
	}
/*  common function */
function ajaxGet(url,callback){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET",url,true);
	xmlHttp.onreadystatechange= function(){
		if (xmlHttp.readyState==4 && xmlHttp.status==200){
			// var d= xmlHttp.responseText;
			//$result = JSON.parse(d);
			callback&&callback(xmlHttp.responseText);
		}
	}
	xmlHttp.send();
}

function ajaxPost(url, data, callback, error){
	var postData = data;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	if(typeof(postData) === 'object'){
		postData = (function(obj){ // 转成post需要的字符串.
			var str = "";
			for(var prop in obj){
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}
	xhr.onreadystatechange = function(){
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var text = XMLHttpReq.responseText;
				callback&&callback( text);
			}else{
				xhr.abort();
				error&&error(XMLHttpReq.status);
			}
		}
	};
	xhr.send(postData);
}

function updateRecord(gameId, record, level){
	var  data = {};
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
function getResult(serser, gid, option, callback ){
	var timerCnt = 0, getOk = 0, waitTime = 5;
	var getTimer = setInterval(function(){
		timerCnt++;
	},1000);
	var checkTimer = setInterval(function(){
		if(getOk){
			clearInterval(checkTimer);
		}
	},1000);

	var postData = {id:gid, option:option, acid:acid};
	if(typeof(postData) === 'object'){
		postData = (function(obj){ // 转成post需要的字符串.
			var str = "";
			for(var prop in obj){
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}
	var data1 = [
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u6211\\u6709\\uff1a1\\u4e2a\\u7231\\u60c5\\u52abbr\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\",\"img\":\"quce\\/quiz-5321-hTjFE5Km4z.jpg\",\"desc\":\"\\u4f60\\u4e00\\u751f\\u53ea\\u4f1a\\u7ecf\\u5386\\u4e00\\u6b21\\u7231\\u60c5\\u52ab\\u3002\\u4f60\\u7684\\u6c14\\u606f\\u975e\\u5e38\\u5e72\\u51c0\\uff0c\\u5728\\u5f02\\u6027\\u773c\\u4e2d\\u5c5e\\u4e8e\\u7981\\u6b32\\u7cfb\\u7684\\u7c7b\\u578b\\uff0c\\u6240\\u4ee5\\u4e0d\\u4f1a\\u62db\\u60f9\\u5f88\\u591a\\u6843\\u82b1\\u3002\\u4f60\\u53ea\\u8981\\u8010\\u5fc3\\u7b49\\u5f85\\u5c31\\u591f\\u4e86\\uff0c\\u7b49\\u5f85\\u90a3\\u552f\\u4e00\\u4e00\\u6b21\\u80fd\\u8ba9\\u4f60\\u7684\\u7075\\u9b42\\u5347\\u534e\\u7684\\u7231\\u60c5\\u5230\\u6765\\u5427\\uff01\",\"sharetitle\":\"\\u4f60\\u4e00\\u751f\\u6709\\u51e0\\u4e2a\\u7231\\u60c5\\u52ab\\uff1f\\u6211\\u4f1a\\u67091\\u4e2a\\uff0c\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u6211\\u6709\\uff1a1\\u4e2a\\u7231\\u60c5\\u52abbr\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u6211\\u6709\\uff1a2\\u4e2a\\u7231\\u60c5\\u52abbr\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\"},{\"threshold\":\"C\",\"title\":\"\\u6211\\u6709\\uff1a4\\u4e2a\\u7231\\u60c5\\u52abbr\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\"},{\"threshold\":\"D\",\"title\":\"\\u6211\\u6709\\uff1a6\\u4e2a\\u7231\\u60c5\\u52abbr\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515488448xxqk8.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u6211\\u6709\\uff1a2\\u4e2a\\u7231\\u60c5\\u52abbr\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\",\"img\":\"quce\\/quiz-5321-WnHtCXNyJt.jpg\",\"desc\":\"\\u4f60\\u4e00\\u751f\\u4f1a\\u7ecf\\u53862\\u4e2a\\u7231\\u60c5\\u52ab\\u3002\\u7b2c\\u4e00\\u4e2a\\u52ab\\u4f1a\\u5bf9\\u4f60\\u9020\\u6210\\u5f88\\u6df1\\u523b\\u7684\\u5f71\\u54cd\\uff0c\\u4f1a\\u8ba9\\u4f60\\u6000\\u7591\\u81ea\\u5df1\\u3001\\u6539\\u53d8\\u81ea\\u5df1\\u3002\\u7ecf\\u5386\\u5b8c\\u7b2c\\u4e00\\u4e2a\\u7231\\u60c5\\u52ab\\uff0c\\u4f60\\u4f1a\\u7ecf\\u5386\\u5f88\\u6f2b\\u957f\\u7684\\u7b49\\u5f85\\u65f6\\u95f4\\uff0c\\u7136\\u540e\\u8fce\\u6765\\u7b2c\\u4e8c\\u4e2a\\uff0c\\u575a\\u6301\\u4e0b\\u53bb\\u4f60\\u5c31\\u8d62\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u4e00\\u751f\\u6709\\u51e0\\u4e2a\\u7231\\u60c5\\u52ab\\uff1f\\u6211\\u6709\\u4e2a2\\u4e2a\\uff0c\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u6211\\u6709\\uff1a1\\u4e2a\\u7231\\u60c5\\u52abbr\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u6211\\u6709\\uff1a2\\u4e2a\\u7231\\u60c5\\u52abbr\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\"},{\"threshold\":\"C\",\"title\":\"\\u6211\\u6709\\uff1a4\\u4e2a\\u7231\\u60c5\\u52abbr\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\"},{\"threshold\":\"D\",\"title\":\"\\u6211\\u6709\\uff1a6\\u4e2a\\u7231\\u60c5\\u52abbr\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515488448xxqk8.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u6211\\u6709\\uff1a4\\u4e2a\\u7231\\u60c5\\u52abbr\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\",\"img\":\"quce\\/quiz-5321-hX7rBzBsfw.jpg\",\"desc\":\"\\u4f60\\u4e00\\u751f\\u4f1a\\u7ecf\\u53864\\u4e2a\\u7231\\u60c5\\u52ab\\uff0c\\u6bcf\\u4e00\\u4e2a\\u7231\\u60c5\\u52ab\\u90fd\\u4f1a\\u8ba9\\u4f60\\u8715\\u53d8\\uff0c\\u4f46\\u4f60\\u4e00\\u76f4\\u5f88\\u77db\\u76fe\\u4e5f\\u5f88\\u72b9\\u8c6b\\uff0c\\u6240\\u4ee5\\u603b\\u9519\\u8fc7\\u6700\\u597d\\u7684\\u65f6\\u673a\\uff0c\\u5230\\u6700\\u540e\\u4f60\\u4f1a\\u53d1\\u73b0\\uff0c\\u8f6c\\u6765\\u8f6c\\u53bb\\u8fd8\\u662f\\u6700\\u521d\\u7684\\u81ea\\u5df1\\u6700\\u597d\\uff0c\\u8fd8\\u662f\\u6700\\u521d\\u7684\\u90a3\\u4e2a\\u4eba\\u6700\\u597d\\u3002\",\"sharetitle\":\"\\u4f60\\u4e00\\u751f\\u6709\\u51e0\\u4e2a\\u7231\\u60c5\\u52ab\\uff1f\\u6211\\u67094\\u4e2a\\uff0c\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u6211\\u6709\\uff1a1\\u4e2a\\u7231\\u60c5\\u52abbr\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u6211\\u6709\\uff1a2\\u4e2a\\u7231\\u60c5\\u52abbr\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\"},{\"threshold\":\"C\",\"title\":\"\\u6211\\u6709\\uff1a4\\u4e2a\\u7231\\u60c5\\u52abbr\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\"},{\"threshold\":\"D\",\"title\":\"\\u6211\\u6709\\uff1a6\\u4e2a\\u7231\\u60c5\\u52abbr\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515488448xxqk8.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u6211\\u6709\\uff1a6\\u4e2a\\u7231\\u60c5\\u52abbr\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\",\"img\":\"quce\\/quiz-5321-WYQtGB88Pz.jpg\",\"desc\":\"\\u4f60\\u4e00\\u751f\\u4f1a\\u7ecf\\u53866\\u4e2a\\u7231\\u60c5\\u52ab\\uff0c\\u56e0\\u4e3a\\u4f60\\u662f\\u4e2a\\u5f88\\u60dc\\u7f18\\u7684\\u4eba\\uff0c\\u751f\\u6015\\u81ea\\u5df1\\u4f1a\\u9519\\u8fc7\\u5bf9\\u65b9\\uff0c\\u6240\\u4ee5\\u603b\\u5728\\u4e00\\u5f00\\u59cb\\u5c31\\u8ba4\\u5b9a\\u5bf9\\u65b9\\uff0c\\u540e\\u6765\\u624d\\u53d1\\u73b0\\u4e0d\\u5408\\u9002\\u3002\\u6240\\u4ee5\\u7ed9\\u4f60\\u7684\\u5efa\\u8bae\\u662f\\uff0c\\u522b\\u51b2\\u52a8\\uff0c\\u6700\\u597d\\u7684\\u7231\\u60c5\\u6c38\\u8fdc\\u7559\\u5728\\u6700\\u540e\\u9762\\u3002\",\"sharetitle\":\"\\u4f60\\u4e00\\u751f\\u6709\\u51e0\\u4e2a\\u7231\\u60c5\\u52ab\\uff1f\\u6211\\u67096\\u4e2a\\uff0c\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u6211\\u6709\\uff1a1\\u4e2a\\u7231\\u60c5\\u52abbr\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u6211\\u6709\\uff1a2\\u4e2a\\u7231\\u60c5\\u52abbr\\u67f3\\u6697\\u82b1\\u660e\\u53c8\\u4e00\\u6751\"},{\"threshold\":\"C\",\"title\":\"\\u6211\\u6709\\uff1a4\\u4e2a\\u7231\\u60c5\\u52abbr\\u515c\\u515c\\u8f6c\\u8f6c\\u56de\\u5230\\u4e86\\u8d77\\u70b9\"},{\"threshold\":\"D\",\"title\":\"\\u6211\\u6709\\uff1a6\\u4e2a\\u7231\\u60c5\\u52abbr\\u6700\\u597d\\u7684\\u7231\\u60c5\\u7559\\u5728\\u6700\\u540e\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515488448xxqk8.png\",\"account\":1003}" },
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 6) {
		data = data1[3];

	} else if (_num < 10 && _num >= 6) {
		data = data1[2];

	} else if (_num < 15 && _num >= 10) {
		data = data1[1];

	} else if (_num >= 15) {
		data = data1[0];
	}

	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] = "./" + result['img'];
		}
		callback(result, JSON.parse(data['total']), 4);
	}
}

