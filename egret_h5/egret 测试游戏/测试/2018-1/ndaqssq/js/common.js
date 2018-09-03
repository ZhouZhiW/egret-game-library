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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dcbr\\u73cd\\u60dc\\u773c\\u524d\\u4eba\",\"img\":\"quce\\/quiz-5299-MQWenTxz45.jpg\",\"desc\":\"\\u4f60\\u8fd9\\u652f\\u7b7e\\u7684\\u5bc4\\u8bed\\u662f\\u201c\\u73cd\\u60dc\\u201d\\uff0c\\u610f\\u601d\\u662f\\u8981\\u60dc\\u7f18\\u3002\\u4e0d\\u8981\\u89c9\\u5f97\\u81ea\\u5df1\\u4ee5\\u540e\\u8fd8\\u6709\\u5f88\\u591a\\u5f88\\u591a\\u7684\\u53ef\\u80fd\\uff0c\\u5176\\u5b9e\\u6700\\u597d\\u7684\\u7231\\u60c5\\u5c31\\u5728\\u773c\\u524d\\uff0c\\u5982\\u679c\\u90a3\\u4e2a\\u4eba\\u51fa\\u73b0\\u4e86\\uff0c\\u5c31\\u597d\\u597d\\u6293\\u4f4f\\uff0c\\u5343\\u4e07\\u522b\\u518d\\u9519\\u8fc7\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\u662f\\u4ec0\\u4e48\\uff1f\\u6211\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dc\\uff0c\\u73cd\\u60dc\\u773c\\u524d\\u4eba\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dcbr\\u73cd\\u60dc\\u773c\\u524d\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934br\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\"},{\"threshold\":\"C\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5br\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\"},{\"threshold\":\"D\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0bbr\\u653e\\u751f\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515488406bBAan.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934br\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\",\"img\":\"quce\\/quiz-5299-tPHMnaYtrR.jpg\",\"desc\":\"\\u4f60\\u8fd9\\u652f\\u7b7e\\u7684\\u5bc4\\u8bed\\u662f\\u201c\\u56de\\u5934\\u201d\\uff0c\\u610f\\u601d\\u5c31\\u662f\\u8ba9\\u4f60\\u56de\\u5934\\u770b\\u770b\\uff0c\\u770b\\u770b\\u4e00\\u76f4\\u4ee5\\u6765\\u9ed8\\u9ed8\\u5728\\u80cc\\u540e\\u652f\\u6301\\u81ea\\u5df1\\u7684\\u4eba\\u662f\\u8c01\\uff0c\\u53ef\\u80fdta\\u4e0d\\u662f\\u4f60\\u7684\\u7406\\u60f3\\u578b\\uff0c\\u4f46\\u662fta\\u4e00\\u5b9a\\u662f\\u6700\\u9002\\u5408\\u4f60\\u7684\\u4eba\\uff0c\\u7ed9\\u5bf9\\u65b9\\u4e00\\u4e2a\\u673a\\u4f1a\\uff0c\\u4e5f\\u7ed9\\u81ea\\u5df1\\u4e00\\u4e2a\\u673a\\u4f1a\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\u662f\\u4ec0\\u4e48\\uff1f\\u6211\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934\\uff0c\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dcbr\\u73cd\\u60dc\\u773c\\u524d\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934br\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\"},{\"threshold\":\"C\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5br\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\"},{\"threshold\":\"D\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0bbr\\u653e\\u751f\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515488406bBAan.png\",\"account\":1003}"},

		{"content":"{\"threshold\":\"C\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5br\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\",\"img\":\"quce\\/quiz-5299-KFTReAseb6.jpg\",\"desc\":\"\\u4f60\\u8fd9\\u652f\\u7b7e\\u7684\\u5bc4\\u8bed\\u662f\\u201c\\u8fce\\u63a5\\u201d\\uff0c\\u8bf4\\u660e\\u4f60\\u6700\\u597d\\u7684\\u8fd9\\u6bb5\\u7231\\u60c5\\u5c31\\u5728\\u4e0d\\u8fdc\\u5904\\u4e86\\u3002\\u4e0d\\u8981\\u88ab\\u73b0\\u5728\\u6240\\u8ff7\\u60d1\\uff0c\\u4e0d\\u8981\\u5c06\\u5c31\\u4e5f\\u4e0d\\u8981\\u51d1\\u5408\\uff0c\\u575a\\u6301\\u4f60\\u7684\\u5fc3\\uff0c\\u7136\\u540e\\u4ee5\\u4e00\\u4e2a\\u6700\\u597d\\u7684\\u81ea\\u5df1\\u53bb\\u8fce\\u63a5\\u4e0b\\u4e00\\u6bb5\\u7f8e\\u597d\\u5427\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\u662f\\u4ec0\\u4e48\\uff1f\\u6211\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5\\uff0c\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dcbr\\u73cd\\u60dc\\u773c\\u524d\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934br\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\"},{\"threshold\":\"C\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5br\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\"},{\"threshold\":\"D\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0bbr\\u653e\\u751f\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515488406bBAan.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0bbr\\u653e\\u751f\\u81ea\\u5df1\",\"img\":\"quce\\/quiz-5299-M7G6BdXe4s.jpg\",\"desc\":\"\\u4f60\\u8fd9\\u652f\\u7b7e\\u7684\\u5bc4\\u8bed\\u662f\\u201c\\u653e\\u4e0b\\u201d\\uff0c\\u4e5f\\u8bb8\\u4f60\\u5fc3\\u4e2d\\u6709\\u592a\\u591a\\u7684\\u6267\\u5ff5\\uff0c\\u8fd8\\u4e0d\\u820d\\u5f97\\u653e\\u4e0b\\u3002\\u4f46\\u662f\\u5bf9\\u4e8e\\u6b64\\u65f6\\u7684\\u4f60\\u6765\\u8bf4\\uff0c\\u5e72\\u8017\\u7740\\u6ca1\\u6709\\u4efb\\u4f55\\u76ca\\u5904\\uff0c\\u4e0d\\u5982\\u5c31\\u6b64\\u544a\\u522b\\u8fc7\\u53bb\\uff0c\\u662f\\u65f6\\u5019\\u6574\\u88c5\\u5f85\\u53d1\\u6362\\u6362\\u5fc3\\u60c5\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\u662f\\u4ec0\\u4e48\\uff1f\\u6211\\u7684\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0b\\uff0c\\u653e\\u751f\\u81ea\\u5df1\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u73cd\\u60dcbr\\u73cd\\u60dc\\u773c\\u524d\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u56de\\u5934br\\u6700\\u7231\\u7684\\u4eba\\u5728\\u8eab\\u540e\"},{\"threshold\":\"C\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u8fce\\u63a5br\\u7ee7\\u7eed\\u5f80\\u524d\\u8d70\"},{\"threshold\":\"D\",\"title\":\"\\u7231\\u60c5\\u4e0a\\u4e0a\\u7b7e\\uff1a\\u653e\\u4e0bbr\\u653e\\u751f\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515488406bBAan.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[3];

	} else if (_num < 15 && _num >= 10) {
		data = data1[2];

	} else if (_num < 20 && _num >= 15) {
		data = data1[1];

	} else if (_num >= 20) {
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

