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
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\",\"img\":\"quce\\/quiz-5968-H6hcrE6pnP.jpg\",\"desc\":\"\\u4e5f\\u8bb8\\u4f60\\u76842017\\u8fc7\\u4e8e\\u75b2\\u60eb\\u52b3\\u7d2f\\uff0c2018\\u5bf9\\u4f60\\u6765\\u8bf4\\u662f\\u4f11\\u6574\\u7684\\u4e00\\u5e74\\uff0c\\u4f60\\u5e94\\u8be5\\u4eab\\u53d7\\u81ea\\u7531\\u7efd\\u653e\\u3002\\u8fd9\\u4e00\\u5e74\\u4f60\\u9700\\u8981\\u82b1\\u8d39\\u66f4\\u591a\\u7684\\u65f6\\u95f4\\u53bb\\u5173\\u5fc3\\u4e0b\\u7231\\u62a4\\u4e0b\\u81ea\\u5df1\\uff0c\\u5efa\\u8bae\\u4f60\\u591a\\u51fa\\u53bb\\u8d70\\u8d70\\uff0c\\u7ed3\\u4ea4\\u4e00\\u4e9b\\u65b0\\u7684\\u670b\\u53cb\\uff0c\\u6362\\u4e2a\\u751f\\u6d3b\\u73af\\u5883\\u53bb\\u91ca\\u653e\\u4e00\\u4e0b\\u73b0\\u5728\\u8eab\\u5fc3\\u7684\\u538b\\u529b\\uff0c\\u7ed9\\u81ea\\u5df1\\u4e00\\u4e2a\\u66f4\\u597d\\u7684\\u72b6\\u6001\\u7528\\u6765\\u56de\\u5f52\\uff01\",\"sharetitle\":\"\\u4f60\\u76842018\\u5173\\u952e\\u8bcd\\u662f\\u4ec0\\u4e48\\uff1f\\u5feb\\u6765\\u770b\\u770b\\u5427~\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\"},{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\"},{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\"},{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/15154020083HG4p.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\",\"img\":\"quce\\/quiz-5968-TwCTRwexFA.jpg\",\"desc\":\"2018\\u5bf9\\u4f60\\u6765\\u8bf4\\u662f\\u6536\\u83b7\\u7684\\u4e00\\u5e74\\uff0c\\u4e0d\\u7ba1\\u662f\\u60c5\\u611f\\u4e0a\\u8fd8\\u662f\\u4e8b\\u4e1a\\u751f\\u6d3b\\u4e2d\\uff0c\\u4f60\\u90fd\\u4f1a\\u6709\\u6240\\u6210\\u5c31\\u3002\\u65b0\\u7684\\u4e00\\u5e74\\u91cc\\u4f60\\u4f1a\\u6709\\u7740\\u7528\\u4e0d\\u5b8c\\u7684\\u65fa\\u76db\\u7cbe\\u529b\\uff0c\\u8ba9\\u4f60\\u5bf9\\u751f\\u6d3b\\u5de5\\u4f5c\\u66f4\\u6709\\u70ed\\u60c5\\uff0c\\u800c\\u547d\\u8fd0\\u4e5f\\u4f1a\\u56de\\u9988\\u7ed9\\u4f60\\u66f4\\u597d\\u7684\\u751f\\u6d3b\\u3002\\u4f46\\u5207\\u8bb0\\uff1a\\u52ff\\u4ee5\\u6076\\u5c0f\\u800c\\u4e3a\\u4e4b\\uff0c\\u56e0\\u4e3a\\u574f\\u7684\\u4e60\\u60ef\\u4f1a\\u8ba9\\u4f60\\u7684\\u597d\\u8fd0\\u90fd\\u8dd1\\u6389\\u54e6~\",\"sharetitle\":\"\\u4f60\\u76842018\\u5173\\u952e\\u8bcd\\u662f\\u4ec0\\u4e48\\uff1f\\u5feb\\u6765\\u770b\\u770b\\u5427~\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\"},{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\"},{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\"},{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/15154020083HG4p.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\",\"img\":\"quce\\/quiz-5968-6TDTMnPCWb.jpg\",\"desc\":\"2018\\u5e74\\u7684\\u4f60\\uff0c\\u6574\\u4f53\\u8fd0\\u52bf\\u90fd\\u662f\\u6bd4\\u8f83\\u5e73\\u7a33\\u7684\\uff0c\\u5728\\u8fd9\\u4e00\\u5e74\\u4f60\\u5e76\\u4e0d\\u4f1a\\u51fa\\u73b0\\u4ec0\\u4e48\\u592a\\u5927\\u7684\\u5012\\u9709\\u4e8b\\uff0c\\u4f46\\u4e5f\\u6ca1\\u6709\\u7279\\u522b\\u5e78\\u8fd0\\u7684\\u4e8b\\u964d\\u4e34\\uff0c\\u5404\\u65b9\\u9762\\u90fd\\u4e0d\\u4f1a\\u6709\\u5927\\u7684\\u53d8\\u52a8\\uff0c\\u79f0\\u5f97\\u4e0a\\u662f\\u4e0d\\u597d\\u4e0d\\u574f\\u3002\\u6240\\u4ee5\\u5728\\u8fd9\\u79cd\\u65f6\\u5019\\uff0c\\u4e0d\\u5982\\u81ea\\u5df1\\u4e3b\\u52a8\\u4e00\\u70b9\\uff0c\\u52aa\\u529b\\u7684\\u8fc7\\u7a0b\\u4e5f\\u662f\\u53ef\\u4ee5\\u6539\\u53d8\\u4f60\\u73b0\\u6709\\u7684\\u8fd0\\u52bf\\u8f68\\u8ff9\\u54e6~\",\"sharetitle\":\"\\u4f60\\u76842018\\u5173\\u952e\\u8bcd\\u662f\\u4ec0\\u4e48\\uff1f\\u5feb\\u6765\\u770b\\u770b\\u5427~\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\"},{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\"},{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\"},{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/15154020083HG4p.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\",\"img\":\"quce\\/quiz-5968-sWYspmAa7X.jpg\",\"desc\":\"\\u8fd9\\u4e00\\u5e74\\u7684\\u4f60\\u662f\\u5e78\\u8fd0\\u7684\\uff0c\\u5728\\u5404\\u65b9\\u9762\\u7684\\u8fd0\\u52bf\\u90fd\\u6781\\u4f73\\u3002\\u4e0e\\u5176\\u8bf4\\u4f60\\u662f\\u88ab\\u4e0a\\u5929\\u7737\\u987e\\u7684\\u4eba\\uff0c\\u4e0d\\u5982\\u8bf4\\u4f60\\u662f\\u505a\\u597d\\u51c6\\u5907\\u8fce\\u63a5\\u5e78\\u8fd0\\u7684\\u4eba\\uff0c\\u4f60\\u505a\\u4e8b\\u4e60\\u60ef\\u8ba1\\u5212\\u5728\\u5148\\uff0c\\u6709\\u5907\\u65e0\\u60a3\\uff0c\\u800c\\u522b\\u4eba\\u53ea\\u770b\\u5230\\u4f60\\u8fd0\\u6c14\\u597d\\uff0c\\u5374\\u5ffd\\u89c6\\u4e86\\u4f60\\u7684\\u52aa\\u529b\\u548c\\u80fd\\u529b\\uff0c\\u5176\\u5b9e\\u8d8a\\u52aa\\u529b\\u624d\\u80fd\\u8d8a\\u5e78\\u8fd0\\u7684\",\"sharetitle\":\"\\u4f60\\u76842018\\u5173\\u952e\\u8bcd\\u662f\\u4ec0\\u4e48\\uff1f\\u5feb\\u6765\\u770b\\u770b\\u5427~\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\"},{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\"},{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\"},{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/15154020083HG4p.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\",\"img\":\"quce\\/quiz-5968-kKaH5SzyMZ.jpg\",\"desc\":\"\\u4f60\\u76842018\\u582a\\u79f0\\u5b8c\\u7f8e\\uff01\\u8fd9\\u4e00\\u5e74\\u7684\\u4f60\\u7b80\\u76f4\\u5c31\\u50cf\\u5f00\\u4e86\\u6302\\uff0c\\u88ab\\u4e0a\\u5929\\u6240\\u7737\\u987e\\uff0c\\u4e00\\u5207\\u90fd\\u662f\\u90a3\\u4e48\\u7684\\u987a\\u987a\\u5229\\u5229\\uff0c\\u5e78\\u8fd0\\u5230\\u906d\\u4eba\\u5ac9\\u5992\\u3002\\u6240\\u4ee5\\u5982\\u679c\\u4f60\\u6709\\u5927\\u7684\\u51b3\\u5b9a\\u548c\\u60f3\\u8981\\u6539\\u53d8\\u7684\\u4e8b\\u60c5\\uff0c\\u4e00\\u5b9a\\u8981\\u653e\\u5230\\u4eca\\u5e74\\u53bb\\u5b8c\\u6210\\uff0c\\u4f1a\\u6709\\u4e0d\\u9519\\u7684\\u6210\\u679c\\u548c\\u6536\\u83b7\\u5462\\uff01\",\"sharetitle\":\"\\u4f60\\u76842018\\u5173\\u952e\\u8bcd\\u662f\\u4ec0\\u4e48\\uff1f\\u5feb\\u6765\\u770b\\u770b\\u5427~\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b8c\\u7f8ebr\\u4eba\\u751f\\u5c31\\u50cf\\u662f\\u5f00\\u4e86\\u6302\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u5e78\\u8fd0br\\u5907\\u53d7\\u7737\\u987e\\uff0c\\u6709\\u6240\\u6536\\u83b7\"},{\"threshold\":\"C\",\"title\":\"\\u7a33\\u5b9abr\\u5e73\\u5e73\\u6de1\\u6de1\\u5c31\\u662f\\u771f\"},{\"threshold\":\"D\",\"title\":\"\\u6536\\u83b7br\\u811a\\u8e0f\\u5b9e\\u5730\\uff0c\\u5c0f\\u6709\\u6210\\u5c31\"},{\"threshold\":\"E\",\"title\":\"\\u81ea\\u7531br\\u653e\\u677e\\u8eab\\u5fc3\\uff0c\\u5173\\u7231\\u81ea\\u6211\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/15154020083HG4p.png\",\"account\":1003}" },

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 13 && _num >= 10) {
		data = data1[1];

	} else if (_num < 18 && _num >= 14) {
		data = data1[2];

	} else if (_num < 20 &&_num >= 18) {
		data = data1[3];
	}else if (_num >= 20) {
		data = data1[4];
	}
	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), waitTime);
	}

}

