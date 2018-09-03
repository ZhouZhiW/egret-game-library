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
	var data1=[
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a120%br\\u88ab\\u4eba\\u7231\\u7740\\u662f\\u4f60\\u7684\\u804c\\u8d23\",\"img\":\"quce\\/quiz-5619-5ZrtJAiTAN.jpg\",\"desc\":\"\\u4f60\\u6709\\u4e00\\u4e2a\\u597d\\u813e\\u6c14\\uff0c\\u4eba\\u7f18\\u4e5f\\u5f88\\u597d\\uff0c\\u5e7f\\u4ea4\\u5404\\u7c7b\\u578b\\u7684\\u670b\\u53cb\\uff0c\\u5176\\u4e2d\\u6709\\u592a\\u591a\\u628a\\u4f60\\u5f53\\u68a6\\u4e2d\\u60c5\\u4eba\\u5bf9\\u5f85\\uff0c\\u4e5f\\u6709\\u4eba\\u5bf9\\u4f60\\u8868\\u767d\\uff0c\\u751a\\u81f3\\u75af\\u72c2\\u7684\\u8ffd\\u6c42\\u4f60\\uff0c\\u4f46\\u662f\\u5982\\u679c\\u4e0d\\u662f\\u4f60\\u4e2d\\u610f\\u7684\\u7c7b\\u578b\\uff0c\\u4f60\\u5b81\\u53ef\\u4e00\\u4e2a\\u4eba\\u5403\\u996d\\u3001\\u770b\\u7535\\u5f71\\u3001\\u751f\\u6d3b\\u2026\\u2026\\u800c\\u4f60\\u5bf9\\u7231\\u60c5\\u7684\\u771f\\u631a\\u8ffd\\u6c42\\uff0c\\u8ba9\\u559c\\u6b22\\u4f60\\u7684\\u4eba\\u66f4\\u662f\\u6b7b\\u5fc3\\u584c\\u5730\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u5927\\u4f17\\u60c5\\u4eba\\u5417\\uff1f\\u6211\\u7684\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\u662f120%\\uff0c\\u662f\\u5f88\\u591a\\u4eba\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a120%br\\u88ab\\u4eba\\u7231\\u7740\\u662f\\u4f60\\u7684\\u804c\\u8d23\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a80%br\\u5927\\u4f17\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a50%br\\u8ba9\\u4eba\\u7740\\u9b54\\u7684\\u5c0f\\u5996\\u7cbe\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a30%br\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615200ZvOiv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a80%br\\u5927\\u4f17\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\",\"img\":\"quce\\/quiz-5619-3SaP8ABJEm.jpg\",\"desc\":\"\\u4f60\\u662f\\u4ee4\\u4eba\\u61a7\\u61ac\\u53c8\\u65e0\\u6cd5\\u63a5\\u8fd1\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\\uff0c\\u4f60\\u5f88\\u61c2\\u5f97\\u4fdd\\u62a4\\u81ea\\u5df1\\u7684\\u5f62\\u8c61\\uff0c\\u53c8\\u5f88\\u61c2\\u5f97\\u4f53\\u8c05\\u522b\\u4eba\\uff0c\\u6240\\u4ee5\\u4f60\\u4ece\\u4e0d\\u4f1a\\u6709\\u4ec0\\u4e48\\u7eef\\u95fb\\u4f20\\u51fa\\uff0c\\u5bf9\\u4e8e\\u4f60\\u4e0d\\u4e2d\\u610f\\u7684\\u8ffd\\u6c42\\u8005\\uff0c\\u4f60\\u751a\\u81f3\\u4f1a\\u529dta\\u653e\\u5f03\\uff0c\\u5e76\\u795d\\u798fta\\u65e9\\u65e5\\u627e\\u5230\\u66f4\\u597d\\u7684\\u5e78\\u798f\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u5927\\u4f17\\u60c5\\u4eba\\u5417\\uff1f\\u6211\\u7684\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\u662f80%\\uff0c\\u5341\\u4e2a\\u5f02\\u6027\\u516b\\u4e2a\\u90fd\\u7231\\u6211\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a120%br\\u88ab\\u4eba\\u7231\\u7740\\u662f\\u4f60\\u7684\\u804c\\u8d23\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a80%br\\u5927\\u4f17\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a50%br\\u8ba9\\u4eba\\u7740\\u9b54\\u7684\\u5c0f\\u5996\\u7cbe\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a30%br\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615200ZvOiv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a50%br\\u8ba9\\u4eba\\u7740\\u9b54\\u7684\\u5c0f\\u5996\\u7cbe\",\"img\":\"quce\\/quiz-5619-KBwJa83nWs.jpg\",\"desc\":\"\\u4f60\\u4e0d\\u662f\\u7eaf\\u7cb9\\u7684\\u5916\\u8868\\u7f8e\\uff0c\\u4f60\\u66f4\\u91cd\\u89c6\\u667a\\u6167\\u3001\\u624d\\u534e\\uff0c\\u548c\\u5185\\u5728\\u3002\\u6240\\u4ee5\\u4e00\\u65b9\\u9762\\u4f60\\u4f1a\\u7ef4\\u62a4\\u826f\\u597d\\u7684\\u5f62\\u8c61\\uff0c\\u53e6\\u4e00\\u65b9\\u9762\\u4f60\\u4f1a\\u5145\\u5b9e\\u81ea\\u5df1\\u7684\\u5927\\u8111\\uff0c\\u4e30\\u5bcc\\u81ea\\u5df1\\u7684\\u5185\\u5fc3\\u3002\\u4f60\\u4f1a\\u901a\\u8fc7\\u81ea\\u5df1\\u7684\\u8a00\\u884c\\u8ba9ta\\u4eec\\u60ca\\u8273\\uff0c\\u66f4\\u4f1a\\u901a\\u8fc7\\u4e30\\u5bcc\\u7684\\u5185\\u5728\\u4fd8\\u83b7ta\\u4eec\\u7684\\u5fc3\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u5927\\u4f17\\u60c5\\u4eba\\u5417\\uff1f\\u6211\\u7684\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\u662f50%\\uff0c\\u4e00\\u534a\\u4eba\\u4f1a\\u4e3a\\u4e86\\u6211\\u7740\\u9b54\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a120%br\\u88ab\\u4eba\\u7231\\u7740\\u662f\\u4f60\\u7684\\u804c\\u8d23\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a80%br\\u5927\\u4f17\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a50%br\\u8ba9\\u4eba\\u7740\\u9b54\\u7684\\u5c0f\\u5996\\u7cbe\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a30%br\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615200ZvOiv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a30%br\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\",\"img\":\"quce\\/quiz-5619-8NS8b4HaHn.jpg\",\"desc\":\"\\u4f60\\u4e0d\\u80fd\\u8f7b\\u6613\\u5730\\u63a5\\u53d7\\u522b\\u4eba\\u7684\\u597d\\u610f\\uff0c\\u5b81\\u53ef\\u81ea\\u5df1\\u4e00\\u4e2a\\u4eba\\u5b64\\u72ec\\u7684\\u751f\\u6d3b\\u3002\\u4f60\\u975e\\u5e38\\u660e\\u7406\\u4e5f\\u80fd\\u660e\\u8fa8\\u662f\\u975e\\uff0c\\u4f46\\u662f\\u5bf9\\u670b\\u53cb\\u7684\\u8981\\u6c42\\u592a\\u9ad8\\uff0c\\u5e38\\u4f7f\\u4f60\\u65e0\\u6cd5\\u8f7b\\u677e\\u5730\\u53bb\\u4ea4\\u670b\\u53cb\\uff01\\u5708\\u5b50\\u592a\\u5c0f\\uff0c\\u5bfc\\u81f4\\u4f60\\u6210\\u4e3a\\u5927\\u4f17\\u60c5\\u4eba\\u5927\\u5927\\u964d\\u4f4e\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u5927\\u4f17\\u60c5\\u4eba\\u5417\\uff1f\\u6211\\u7684\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\u662f30%\\uff0c\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a120%br\\u88ab\\u4eba\\u7231\\u7740\\u662f\\u4f60\\u7684\\u804c\\u8d23\"},{\"threshold\":\"B\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a80%br\\u5927\\u4f17\\u7684\\u68a6\\u4e2d\\u60c5\\u4eba\"},{\"threshold\":\"C\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a50%br\\u8ba9\\u4eba\\u7740\\u9b54\\u7684\\u5c0f\\u5996\\u7cbe\"},{\"threshold\":\"D\",\"title\":\"\\u5927\\u4f17\\u60c5\\u4eba\\u6307\\u6570\\uff1a30%br\\u61c2\\u6211\\u7684\\u4eba\\u81ea\\u7136\\u7231\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615200ZvOiv.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[3];

	} else if (_num < 21 && _num >= 15) {
		data = data1[2];

	} else if (_num < 27 && _num >= 21) {
		data = data1[1];

	} else if (_num >= 27) {
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

