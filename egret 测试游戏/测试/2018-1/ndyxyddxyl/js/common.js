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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a46%br\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\",\"img\":\"quce\\/quiz-5409-y83mFwy8Wd.jpg\",\"desc\":\"\\u4f60\\u7684\\u4e2a\\u6027\\u5341\\u5206\\u968f\\u548c\\uff0c\\u4e0d\\u7ba1\\u9047\\u5230\\u4ec0\\u4e48\\u4e8b\\u60c5\\u90fd\\u5f88\\u6de1\\u5b9a\\uff0c\\u8fd9\\u6837\\u7684\\u4f60\\u5e26\\u7ed9\\u8eab\\u8fb9\\u7684\\u4eba\\u5f88\\u591a\\u5b89\\u5168\\u611f\\uff0c\\u5bf9\\u5f02\\u6027\\u6765\\u8bf4\\uff0c\\u4ed6\\u4eec\\u66f4\\u613f\\u610f\\u548c\\u4f60\\u5f53\\u597d\\u54e5\\u4eec\\u3002\\u4e0d\\u8fc7\\u5f02\\u6027\\u7f18\\u867d\\u7136\\u5dee\\u4e00\\u70b9\\uff0c\\u4f60\\u7684\\u540c\\u6027\\u7f18\\u5374\\u662f\\u597d\\u5230\\u7206\\uff01\\u8eab\\u8fb9\\u5c0f\\u59d0\\u59d0\\u73af\\u7ed5\\u7684\\u573a\\u666f\\u662f\\u7537\\u751f\\u7fa1\\u6155\\u4e0d\\u6765\\u7684\\uff01\\n<br>\",\"sharetitle\":\"\\u4f60\\u5bf9\\u5f02\\u6027\\u6709\\u591a\\u5927\\u5438\\u5f15\\u529b\\uff1f\\u6211\\u7684\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a66%\\uff0c\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%br\\u7537\\u5973\\u901a\\u5403\\u7684\\u4e07\\u4eba\\u8ff7\"},{\"threshold\":\"B\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%br\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%br\\u4e2a\\u6027\\u6d3b\\u6cfc\\u7684\\u5c0f\\u592a\\u9633\"},{\"threshold\":\"D\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a46%br\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515463806IL8kp.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%br\\u4e2a\\u6027\\u6d3b\\u6cfc\\u7684\\u5c0f\\u592a\\u9633\",\"img\":\"quce\\/quiz-5409-pW3BYTCzEh.jpg\",\"desc\":\"\\u6027\\u683c\\u4e0a\\u4f60\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u6d3b\\u6cfc\\u53ef\\u7231\\u7684\\u4eba\\uff0c\\u5916\\u5411\\u4e50\\u89c2\\u7684\\u4f60\\u53ef\\u4ee5\\u548c\\u8eab\\u8fb9\\u7684\\u6bcf\\u4e00\\u4e2a\\u4eba\\u90fd\\u76f8\\u5904\\u7684\\u5f88\\u597d\\uff0c\\u56e0\\u6b64\\u5f88\\u591a\\u4eba\\u90fd\\u60f3\\u548c\\u4f60\\u505a\\u670b\\u53cb\\uff0c\\u65f6\\u95f4\\u4e45\\u4e86\\u4ed6\\u4eec\\u4e5f\\u4f1a\\u4e0d\\u81ea\\u89c9\\u7684\\u88ab\\u4f60\\u5438\\u5f15\\uff0c\\u8bf4\\u4e0d\\u5b9a\\u5728\\u8fd9\\u4e9b\\u4eba\\u4e4b\\u4e2d\\uff0c\\u5c31\\u6709\\u4f60\\u7684\\u767d\\u9a6c\\u738b\\u5b50\\u3002\",\"sharetitle\":\"\\u4f60\\u5bf9\\u5f02\\u6027\\u6709\\u591a\\u5927\\u5438\\u5f15\\u529b\\uff1f\\u6211\\u7684\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%br\\u7537\\u5973\\u901a\\u5403\\u7684\\u4e07\\u4eba\\u8ff7\"},{\"threshold\":\"B\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%br\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%br\\u4e2a\\u6027\\u6d3b\\u6cfc\\u7684\\u5c0f\\u592a\\u9633\"},{\"threshold\":\"D\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a46%br\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515463806IL8kp.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%br\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\",\"img\":\"quce\\/quiz-5409-yFKF5HcSfw.jpg\",\"desc\":\"\\u4f60\\u7684\\u4e3e\\u624b\\u6295\\u8db3\\u4e4b\\u95f4\\u603b\\u662f\\u6563\\u53d1\\u51fa\\u4e0d\\u51e1\\u7684\\u6c14\\u606f\\uff0c\\u603b\\u80fd\\u5728\\u4eba\\u7fa4\\u4e2d\\u6210\\u4e3a\\u7126\\u70b9\\uff0c\\u8fd9\\u4e0d\\u4ec5\\u662f\\u56e0\\u4e3a\\u4f60\\u7684\\u6c14\\u573a\\u548c\\u989c\\u503c\\uff0c\\u66f4\\u662f\\u56e0\\u4e3a\\u4f60\\u672c\\u8eab\\u4e5f\\u662f\\u5341\\u5206\\u4f18\\u79c0\\u7684\\uff0c\\u4e0d\\u8fc7\\u4f60\\u603b\\u5bf9\\u81ea\\u5df1\\u6709\\u4e9b\\u6000\\u7591\\uff0c\\u4e0d\\u76f8\\u4fe1\\u81ea\\u5df1\\u4f1a\\u6709\\u4ee4\\u4eba\\u4e00\\u89c1\\u503e\\u5fc3\\u7684\\u9b45\\u529b\\uff0c\\u8fd9\\u6837\\u53ef\\u4ee5\\u5bb9\\u6613\\u9519\\u8fc7\\u5e78\\u798f\\u5466~\",\"sharetitle\":\"\\u4f60\\u5bf9\\u5f02\\u6027\\u6709\\u591a\\u5927\\u5438\\u5f15\\u529b\\uff1f\\u6211\\u7684\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%\\uff0c\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%br\\u7537\\u5973\\u901a\\u5403\\u7684\\u4e07\\u4eba\\u8ff7\"},{\"threshold\":\"B\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%br\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%br\\u4e2a\\u6027\\u6d3b\\u6cfc\\u7684\\u5c0f\\u592a\\u9633\"},{\"threshold\":\"D\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a46%br\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515463806IL8kp.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%br\\u7537\\u5973\\u901a\\u5403\\u7684\\u4e07\\u4eba\\u8ff7\",\"img\":\"quce\\/quiz-5409-ZDc8QDKx7X.jpg\",\"desc\":\"\\u4f20\\u8bf4\\u4e2d\\u7684\\u4e07\\u4eba\\u8ff7\\u5c31\\u662f\\u4f60\\u8fd9\\u6837\\u7684\\uff0c\\u4f60\\u65e0\\u65f6\\u65e0\\u523b\\u90fd\\u5728\\u6563\\u53d1\\u7740\\u81f4\\u547d\\u7684\\u5438\\u5f15\\u529b\\uff0c\\u4e0d\\u4ec5\\u4ec5\\u662f\\u5f02\\u6027\\uff0c\\u6709\\u65f6\\u5019\\u540c\\u6027\\u90fd\\u4f1a\\u88ab\\u4f60\\u5438\\u5f15\\uff01\\u4f60\\u8fd9\\u79cd\\u4eba\\u6027\\u683c\\u4e0a\\u6f47\\u6d12\\u81ea\\u5982\\uff0c\\u6709\\u989c\\u53c8\\u6709\\u624d\\uff0c\\u5f88\\u5bb9\\u6613\\u8ba9\\u522b\\u4eba\\u5bf9\\u4f60\\u5fc3\\u751f\\u7231\\u6155\\uff0c\\u4e3a\\u4f60\\u7740\\u8ff7\\u3002\",\"sharetitle\":\"\\u4f60\\u5bf9\\u5f02\\u6027\\u6709\\u591a\\u5927\\u5438\\u5f15\\u529b\\uff1f\\u6211\\u7684\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%\\uff0c\\u9b45\\u529b\\u56db\\u5c04\\u7684\\u4e07\\u4eba\\u8ff7\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a366%br\\u7537\\u5973\\u901a\\u5403\\u7684\\u4e07\\u4eba\\u8ff7\"},{\"threshold\":\"B\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a206%br\\u6843\\u82b1\\u8fd0\\u65fa\\u5230\\u7206\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a99%br\\u4e2a\\u6027\\u6d3b\\u6cfc\\u7684\\u5c0f\\u592a\\u9633\"},{\"threshold\":\"D\",\"title\":\"\\u5438\\u5f15\\u529b\\u6307\\u6570\\uff1a46%br\\u540c\\u6027\\u76f8\\u5438\\uff0c\\u5f02\\u6027\\u76f8\\u65a5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515463806IL8kp.png\",\"account\":1003}"}

	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 12) {
		data = data1[0];

	} else if (_num < 17 && _num >= 12) {
		data = data1[1];

	} else if (_num < 20 && _num >= 17) {
		data = data1[2];
	}
	else if (_num >= 20) {
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

