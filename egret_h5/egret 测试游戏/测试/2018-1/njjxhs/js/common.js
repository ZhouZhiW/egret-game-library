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
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4ebabr\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\",\"img\":\"quce\\/quiz-5248-825xGBjceP.jpg\",\"desc\":\"\\u4f60\\u5f88\\u5bb9\\u6613\\u62db\\u6765\\u522b\\u4eba\\u7684\\u559c\\u6b22\\uff0c\\u5728\\u4f60\\u8eab\\u8fb9\\u4e5f\\u6f5c\\u4f0f\\u7740\\u5f88\\u591a\\u6709\\u7f18\\u4eba\\uff0c\\u6240\\u4ee5\\u4e0d\\u7ba1\\u4f60\\u662f\\u5426\\u5355\\u8eab\\uff0c\\u4f60\\u559c\\u6b22\\u7684\\u4eba\\u5fc5\\u5b9a\\u79bb\\u4f60\\u4e0d\\u8fdc\\uff0c\\u5bf9\\u65b9\\u4e5f\\u5728\\u8ffd\\u968f\\u4f60\\u7684\\u78c1\\u573a\\uff0c\\u5728\\u6697\\u4e2d\\u9ed8\\u9ed8\\u5b88\\u62a4\\u7740\\u4f60\\uff0c\\u5e0c\\u671b\\u4f60\\u80fd\\u53ca\\u65e9\\u53d1\\u73b0\\u3002\",\"sharetitle\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\u4f60\\u7a76\\u7adf\\u559c\\u6b22\\u8c01\\uff1f\\u6211\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4eba\\uff0c\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u60c5\\u654cbr\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u81ea\\u5df1br\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4ebabr\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4ebabr\\u65e7\\u60c5\\u96be\\u5fd8\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515484895PmEVs.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u81ea\\u5df1br\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\",\"img\":\"quce\\/quiz-5248-KCPMXeBtaZ.jpg\",\"desc\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\uff0c\\u4f60\\u5c45\\u7136\\u559c\\u6b22\\u81ea\\u5df1\\uff0c\\u771f\\u662f\\u81ea\\u604b\\u5450\\u3002\\u5176\\u5b9e\\u662f\\u56e0\\u4e3a\\u4f60\\u5f88\\u6ce8\\u91cd\\u81ea\\u5df1\\u5185\\u5fc3\\u7684\\u611f\\u53d7\\uff0c\\u662f\\u4e2a\\u611f\\u6027\\u7684\\u4eba\\uff0c\\u505a\\u4ec0\\u4e48\\u4e8b\\u60c5\\u90fd\\u4ee5\\u5185\\u5fc3\\u7684\\u8212\\u9002\\u4e3a\\u76ee\\u7684\\uff0c\\u6240\\u4ee5\\uff0c\\u4e5f\\u53ea\\u6709\\u4f60\\u81ea\\u5df1\\u80fd\\u8ba9\\u81ea\\u5df1\\u5f00\\u5fc3\\u4e86\\u3002\",\"sharetitle\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\u4f60\\u7a76\\u7adf\\u559c\\u6b22\\u8c01\\uff1f\\u6211\\u559c\\u6b22\\uff1a\\u81ea\\u5df1\\uff0c\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u60c5\\u654cbr\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u81ea\\u5df1br\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4ebabr\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4ebabr\\u65e7\\u60c5\\u96be\\u5fd8\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515484895PmEVs.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4ebabr\\u65e7\\u60c5\\u96be\\u5fd8\",\"img\":\"quce\\/quiz-5248-FyXn4iPftm.jpg\",\"desc\":\"\\u8ba9\\u4f60\\u5ff5\\u5ff5\\u4e0d\\u5fd8\\u7684\\uff0c\\u7ec8\\u7a76\\u8fd8\\u662f\\u90a3\\u4e00\\u6bb5\\u6709\\u4e9b\\u9057\\u61be\\u7684\\u66fe\\u7ecf\\u3002\\u4f60\\u5bb9\\u6613\\u5ff5\\u65e7\\uff0c\\u4ec0\\u4e48\\u4e1c\\u897f\\u76f8\\u5904\\u4e45\\u4e86\\u5c31\\u4f1a\\u6709\\u611f\\u60c5\\uff0c\\u4f55\\u51b5\\u662f\\u4eba\\u5462\\uff1f\\u65e7\\u4eba\\u5bf9\\u4f60\\u7684\\u5f71\\u54cd\\u5df2\\u7ecf\\u5341\\u5206\\u6df1\\u523b\\u4e86\\uff0c\\u53ea\\u662f\\u4f60\\u81ea\\u5df1\\u8fd8\\u6ca1\\u89c9\\u5bdf\\u5230\\u800c\\u5df2\\u3002\",\"sharetitle\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\u4f60\\u7a76\\u7adf\\u559c\\u6b22\\u8c01\\uff1f\\u6211\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4eba\\uff0c\\u65e7\\u60c5\\u96be\\u5fd8\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u60c5\\u654cbr\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u81ea\\u5df1br\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4ebabr\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4ebabr\\u65e7\\u60c5\\u96be\\u5fd8\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515484895PmEVs.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u60c5\\u654cbr\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\",\"img\":\"quce\\/quiz-5248-PECkie6DZd.jpg\",\"desc\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\uff0c\\u4f60\\u4f1a\\u559c\\u6b22\\u4e0a\\u81ea\\u5df1\\u7684\\u60c5\\u654c\\u3002\\u4f60\\u80c6\\u5b50\\u5927\\u6027\\u5b50\\u76f4\\uff0c\\u5728\\u7231\\u60c5\\u91cc\\u5bf9\\u53e6\\u4e00\\u534a\\u8981\\u6c42\\u5f88\\u9ad8\\uff0c\\u4f60\\u53d7\\u4e0d\\u4e86\\u5e73\\u6de1\\u65e0\\u5473\\u7684\\u751f\\u6d3b\\uff0c\\u5bb9\\u6613\\u88ab\\u4e2a\\u6027\\u5f3a\\u70c8\\u7684\\u4eba\\u6240\\u5438\\u5f15\\uff0c\\u5c24\\u5176\\u662f\\u610f\\u6599\\u4e4b\\u5916\\u7684\\u4eba\\u6700\\u80fd\\u64a9\\u62e8\\u4f60\\u7684\\u5fc3\\u3002\",\"sharetitle\":\"\\u6f5c\\u610f\\u8bc6\\u91cc\\u4f60\\u7a76\\u7adf\\u559c\\u6b22\\u8c01\\uff1f\\u6211\\u559c\\u6b22\\uff1a\\u60c5\\u654c\\uff0c\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u60c5\\u654cbr\\u4e0d\\u662f\\u51a4\\u5bb6\\u4e0d\\u805a\\u9996\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u81ea\\u5df1br\\u5b64\\u82b3\\u81ea\\u8d4f\\u6700\\u5f00\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u8eab\\u8fb9\\u7684\\u67d0\\u4e2a\\u4ebabr\\u7f18\\u5206\\u8fd1\\u5728\\u773c\\u524d\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u559c\\u6b22\\uff1a\\u66fe\\u7ecf\\u559c\\u6b22\\u8fc7\\u7684\\u90a3\\u4e2a\\u4ebabr\\u65e7\\u60c5\\u96be\\u5fd8\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515484895PmEVs.png\",\"account\":1003}" }
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 5) {
		data = data1[0];
	} else if (_num < 9&& _num >=5) {
		data = data1[1];
	} else if (_num < 11 && _num >= 9) {
		data = data1[2];
	}else if (_num >= 11) {
		data = data1[3];
	}


	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] =  "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 2);
	}
}

