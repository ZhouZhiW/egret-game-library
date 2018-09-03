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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\",\"img\":\"quce\\/quiz-3154-wkM3pZxRQT.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\\u3002\\u4f60\\u62e5\\u6709\\u4e00\\u9897\\u7ae5\\u771f\\u5584\\u826f\\u7684\\u5185\\u5fc3\\uff01\\u4f60\\u7ecf\\u5e38\\u5728\\u5f00\\u5fc3\\u7684\\u65f6\\u5019\\u5927\\u7b11\\uff0c\\u9047\\u5230\\u4e0d\\u5f00\\u5fc3\\u7684\\u65f6\\u5019\\u4e5f\\u4f1a\\u4e0d\\u987e\\u65c1\\u4eba\\u5730\\u5927\\u58f0\\u54ed\\u6ce3\\u3002\\u5728\\u8bf4\\u8c0e\\u65f6\\u5f88\\u5bb9\\u6613\\u5c31\\u4f1a\\u9732\\u51fa\\u9a6c\\u811a\\u88ab\\u4eba\\u63ed\\u7a7f\\u3002\\u7136\\u800c\\uff0c\\u6709\\u7684\\u65f6\\u5019\\u4f60\\u4f1a\\u60f3\\u8981\\u5468\\u56f4\\u7684\\u4eba\\u90fd\\u8ffd\\u968f\\u4f60\\uff0c\\u7231\\u4f60\\u3002\\u8fd9\\u6837\\u76f4\\u63a5\\u7684\\u6001\\u5ea6\\u4e5f\\u662f\\u5e26\\u7ed9\\u4f60\\u597d\\u4eba\\u7f18\\u7684\\u539f\\u56e0\\u4e4b\\u4e00\\u5427\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\",\"img\":\"quce\\/quiz-3154-M5pRmy2sDC.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\\u3002\\u5e74\\u5c11\\u8f7b\\u72c2\\u7684\\u82b1\\u5b63\\uff01\\u611f\\u60c5\\u8d77\\u4f0f\\u5f88\\u5927\\uff0c\\u4e5f\\u6709\\u81ea\\u5df1\\u65e0\\u6cd5\\u63a7\\u5236\\u7684\\u65f6\\u5019\\u3002\\u8fd8\\u6709\\u6709\\u7684\\u65f6\\u5019\\u4f1a\\u601d\\u8003\\u8fc7\\u591a\\uff0c\\u6ca1\\u529e\\u6cd5\\u771f\\u7684\\u653e\\u677e\\u3002\\u7136\\u800c\\u4f60\\u5bf9\\u4ed6\\u4eba\\u7684\\u5fc3\\u60c5\\u5f88\\u654f\\u611f\\uff0c\\u5f88\\u5bb9\\u6613\\u8bfb\\u5230\\u522b\\u4eba\\u5185\\u5fc3\\u771f\\u6b63\\u60f3\\u8bf4\\u7684\\u8bdd\\uff0c\\u4f1a\\u8ba9\\u4eba\\u89c9\\u5f97\\u7279\\u522b\\u6e29\\u6696\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\",\"img\":\"quce\\/quiz-3154-HPS2bWHziN.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\\u3002\\u71c3\\u70e7\\u6fc0\\u60c5\\u7684\\u5c81\\u6708\\uff01\\u6709\\u50cf\\u5c0f\\u5b69\\u4e5f\\u6709\\u50cf\\u5927\\u4eba\\u7684\\u65f6\\u5019\\uff0c\\u5145\\u6ee1\\u4e86\\u9b45\\u529b\\u3002\\u8fd8\\u6709\\uff0c\\u4f60\\u662f\\u4e2a\\u5f88\\u6709\\u4e3b\\u89c1\\u53c8\\u6709\\u4e0a\\u8fdb\\u5fc3\\u7684\\u4eba\\u3002\\u559c\\u6b22\\u5b66\\u4e60\\uff0c\\u4e3a\\u4e86\\u81ea\\u6211\\u6210\\u957f\\u4e5f\\u5f88\\u559c\\u6b22\\u5192\\u9669\\u3002\\u6709\\u7740\\u575a\\u5f3a\\u7684\\u610f\\u5fd7\\u529b\\uff0c\\u8ba9\\u5468\\u56f4\\u7684\\u4eba\\u90fd\\u4e0d\\u77e5\\u89c9\\u5730\\u60f3\\u6765\\u5e2e\\u52a9\\u4f60\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\",\"img\":\"quce\\/quiz-3154-RYA6AcJzyQ.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\\u3002\\u6210\\u719f\\u53c8\\u4e0d\\u5931\\u70ed\\u60c5 \\uff01\\u6240\\u4ee5\\u5f88\\u5c11\\u6709\\u72b9\\u8c6b\\u4e0d\\u51b3\\u7684\\u65f6\\u5019\\uff0c\\u5f88\\u591a\\u4e8b\\u60c5\\u90fd\\u4f1a\\u4e00\\u5934\\u683d\\u8fdb\\u53bb\\u5427~\\u7136\\u800c\\uff0c\\u81ea\\u5df1\\u4e5f\\u5f88\\u6e05\\u695a\\u77e5\\u9053\\u600e\\u4e48\\u63a7\\u5236\\u81ea\\u5df1\\u7684\\u60c5\\u7eea\\uff0c\\u9047\\u5230\\u4e8b\\u60c5\\u51e0\\u4e4e\\u90fd\\u80fd\\u5927\\u4e8b\\u5316\\u5c0f\\uff0c\\u5c0f\\u4e8b\\u5316\\u65e0\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\",\"img\":\"quce\\/quiz-3154-8dC7iPARaP.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\\u3002\\u62e5\\u6709\\u4e00\\u4efd\\u770b\\u7834\\u6eda\\u6eda\\u7ea2\\u5c18\\u7684\\u6f47\\u6d12\\uff0c\\u60f3\\u8981\\u523a\\u6fc0\\u5230\\u4f60\\u7684\\u5185\\u5fc3\\u662f\\u975e\\u5e38\\u4e0d\\u7b80\\u5355\\u7684\\u4e8b\\u60c5\\u3002\\u8fd8\\u6709\\uff0c\\u5982\\u679c\\u662f\\u4f60\\u81ea\\u5df1\\u975e\\u505a\\u4e0d\\u53ef\\u7684\\u4e8b\\u60c5\\uff0c\\u4e5f\\u7edd\\u5bf9\\u4e0d\\u4f1a\\u9003\\u907f\\uff0c\\u4f1a\\u5f7b\\u5e95\\u7684\\u6267\\u884c\\u3002\\u6240\\u4ee5\\u5468\\u56f4\\u7684\\u4eba\\u90fd\\u5f88\\u5c0a\\u656c\\u4f60\\uff0c\\u60f3\\u8ffd\\u968f\\u7740\\u4f60\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\",\"img\":\"quce\\/quiz-3154-ixWJKTCf5r.jpg\",\"desc\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\\u3002\\u62e5\\u6709\\u4e00\\u4efd\\u9759\\u89c2\\u5176\\u53d8\\u7684\\u6de1\\u7136\\uff0c\\u603b\\u662f\\u7528\\u5bbd\\u5927\\u7684\\u5fc3\\u770b\\u5f85\\u8fd9\\u4e2a\\u4e16\\u754c\\u3002\\u5728\\u522b\\u4eba\\u4f1a\\u751f\\u6c14\\u7684\\u60c5\\u51b5\\u4e0b\\u4f60\\u5374\\u80fd\\u51b7\\u9759\\u7684\\u56de\\u5e94\\uff0c\\u91cd\\u6574\\u81ea\\u5df1\\u7684\\u611f\\u60c5\\u3002\\u5728\\u4f60\\u7684\\u5b57\\u5178\\u88e1\\u6ca1\\u6709\\u300c\\u51b2\\u52a8\\u300d\\u8fd9\\u4e2a\\u8bcd\\u7684\\u5b58\\u5728\\u3002\\u4f60\\u603b\\u662f\\u6df1\\u601d\\u719f\\u8651\\u540e\\u624d\\u5f00\\u59cb\\u884c\\u52a8\\uff0c\\u4e5f\\u56e0\\u6b64\\u5728\\u5de5\\u4f5c\\u4e0a\\u7684\\u901f\\u5ea6\\u6ca1\\u90a3\\u4e48\\u5feb\\u3002\\u4e0d\\u8fc7\\u56e0\\u4e3a\\u51e0\\u4e4e\\u4e0d\\u4f1a\\u51fa\\u9519\\u6240\\u4ee5\\u5468\\u56f4\\u7684\\u4eba\\u90fd\\u5f88\\u559c\\u6b22\\u628a\\u4e8b\\u60c5\\u4ea4\\u7ed9\\u4f60\\u5904\\u7406\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\\u3002\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u662f\\u51e0\\u5c81\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f8\\u5c81\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f15\\u5c81\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f22\\u5c81\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f32\\u5c81\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f52\\u5c81\"},{\"threshold\":\"F\",\"title\":\"\\u4f60\\u7684\\u5167\\u5fc3\\u5e74\\u9f84\\u662f80\\u5c81\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151391422872dgM.png\",\"account\":1003}" },
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}

	if (_num < 6) {
		data = data1[5];

	} else if (_num < 8 && _num >= 6) {
		data = data1[4];

	} else if (_num < 10 && _num >= 8) {
		data = data1[3];

	} else if (_num < 12 && _num >= 10) {
		data = data1[2];

	}else if (_num < 14 && _num >= 12) {
		data = data1[1];

	} else if (_num >= 14) {
		data = data1[0];
	}

	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}

		callback(result, JSON.parse(data['total']), 3);

	}

}

