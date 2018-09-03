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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a50%br\\u5fc3\\u91cc\\u7684\\u82e6\\u53ea\\u6709\\u81ea\\u5df1\\u77e5\\u9053\",\"img\":\"quce\\/quiz-4902-B2Nd2yazjy.png\",\"desc\":\"\\u4f60\\u770b\\u4f3c\\u6709\\u5f88\\u591a\\u670b\\u53cb\\uff0c\\u770b\\u4f3c\\u5728\\u4eba\\u7fa4\\u4e2d\\u7b11\\u7684\\u5f88\\u5f00\\u5fc3\\uff0c\\u4f46\\u90a3\\u4e9b\\u6b22\\u7b11\\u70ed\\u95f9\\u4e0d\\u8fc7\\u662f\\u4f60\\u7684\\u4f2a\\u88c5\\uff0c\\u53ea\\u6709\\u5fc3\\u5934\\u7a81\\u7136\\u6d8c\\u4e0a\\u6765\\u7684\\u5b64\\u5355\\u611f\\u548c\\u65e0\\u529b\\u611f\\u662f\\u771f\\u5b9e\\u7684\\u3002\\u4f60\\u77e5\\u9053\\u5750\\u5728\\u4f60\\u5bf9\\u9762\\u7684\\u4eba\\u5176\\u5b9e\\u6839\\u672c\\u4e0d\\u60f3\\u4e0e\\u4f60\\u8c08\\u5fc3\\uff0c\\u5927\\u5bb6\\u4e0d\\u8fc7\\u90fd\\u662f\\u68a6\\u4e00\\u573a\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u6709\\u591a\\u5b64\\u5355\\uff1f\\u6211\\u7684\\u5b64\\u5355\\u6307\\u6570\\u662f50%\\uff0c\\u5fc3\\u4e2d\\u7684\\u5b64\\u82e6\\u81ea\\u5df1\\u77e5\\uff01\",\"oldimg\":\"quce\\/1463124947aRX4X.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a500%br\\u5df2\\u7ecf\\u5fd8\\u8bb0\\u4e86\\u5b64\\u5355\",\"oldimg\":\"quce\\/1463124706fHKrI.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a300%br\\u88ab\\u5168\\u4e16\\u754c\\u9057\\u5fd8\",\"oldimg\":\"quce\\/1463124719FEMNI.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a100%br\\u9700\\u8981\\u4e00\\u4e2a\\u62e5\\u62b1\",\"oldimg\":\"quce\\/1463124840PQVdL.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a50%br\\u5fc3\\u91cc\\u7684\\u82e6\\u53ea\\u6709\\u81ea\\u5df1\\u77e5\\u9053\",\"oldimg\":\"quce\\/1463124947aRX4X.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520236805ZwxUH.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a100%br\\u9700\\u8981\\u4e00\\u4e2a\\u62e5\\u62b1\",\"img\":\"quce\\/quiz-4902-DTdYsb6dRA.png\",\"desc\":\"\\u5f88\\u591a\\u65f6\\u5019\\u4f60\\u60f3\\u627e\\u4e2a\\u670b\\u53cb\\u4e00\\u8d77\\u5f85\\u4e00\\u4f1a\\uff0c\\u5374\\u53d1\\u73b0\\u4e0d\\u77e5\\u9053\\u8be5\\u627e\\u8c01\\uff1b\\u7535\\u8bdd\\u7a81\\u7136\\u54cd\\u4e86\\uff0c\\u770b\\u90fd\\u4e0d\\u7528\\u770b\\u80af\\u5b9a\\u662f\\u670d\\u52a1\\u53f0\\uff1b\\u4f60\\u6d4f\\u89c8\\u4e86\\u6240\\u6709\\u793e\\u4ea4\\u8f6f\\u4ef6\\u90fd\\u6ca1\\u6709\\u4e00\\u4e2a\\u5173\\u4e8e\\u4f60\\u7684\\u5c0f\\u7ea2\\u70b9......\\u6240\\u4ee5\\u4f60\\u65e0\\u6cd5\\u4f53\\u4f1a\\u5f00\\u6000\\u5927\\u7b11\\u7684\\u611f\\u89c9\\uff0c\\u53ea\\u80fd\\u770b\\u89c1\\u90a3\\u4e2a\\u6df1\\u85cf\\u4e8e\\u5185\\u5fc3\\u7684\\u81ea\\u5df1\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u6709\\u591a\\u5b64\\u5355\\uff1f\\u6211\\u7684\\u5b64\\u5355\\u6307\\u6570\\u662f100%\\uff0c\\u771f\\u60f3\\u7ed9\\u81ea\\u5df1\\u4e00\\u4e2a\\u62e5\\u62b1\\uff01\",\"oldimg\":\"quce\\/1463124840PQVdL.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a500%br\\u5df2\\u7ecf\\u5fd8\\u8bb0\\u4e86\\u5b64\\u5355\",\"oldimg\":\"quce\\/1463124706fHKrI.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a300%br\\u88ab\\u5168\\u4e16\\u754c\\u9057\\u5fd8\",\"oldimg\":\"quce\\/1463124719FEMNI.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a100%br\\u9700\\u8981\\u4e00\\u4e2a\\u62e5\\u62b1\",\"oldimg\":\"quce\\/1463124840PQVdL.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a50%br\\u5fc3\\u91cc\\u7684\\u82e6\\u53ea\\u6709\\u81ea\\u5df1\\u77e5\\u9053\",\"oldimg\":\"quce\\/1463124947aRX4X.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520236805ZwxUH.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a300%br\\u88ab\\u5168\\u4e16\\u754c\\u9057\\u5fd8\",\"img\":\"quce\\/quiz-4902-X2jJrfGbah.png\",\"desc\":\"\\u4f60\\u7684\\u5fc3\\u5982\\u540c\\u770b\\u7834\\u7ea2\\u5c18\\u822c\\u7a7a\\u7a7a\\u5982\\u4e5f\\uff0c\\u65e0\\u559c\\u65e0\\u60b2\\u3002\\u6bcf\\u5929\\u628a\\u65f6\\u95f4\\u5b89\\u6392\\u5f97\\u6ee1\\u6ee1\\u7684\\uff0c\\u597d\\u4f3c\\u8fd9\\u6837\\u5c31\\u80fd\\u56de\\u907f\\u7a7a\\u6c14\\u4e2d\\u7684\\u5bc2\\u5bde\\u3002\\u6709\\u65f6\\u5019\\u60f3\\u4e0e\\u4eba\\u8bf4\\u8bdd\\u7684\\u65f6\\u5019\\uff0c\\u5374\\u53d1\\u73b0\\u6ca1\\u4eba\\u80fd\\u8bfb\\u61c2\\u4f60\\u7684\\u5fc3\\u58f0\\uff0c\\u6240\\u4ee5\\u4f60\\u5c31\\u5f00\\u59cb\\u6162\\u6162\\u4eab\\u53d7\\u8fd9\\u79cd\\u5b64\\u5355\\u7684\\u5fc3\\u60c5\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u6709\\u591a\\u5b64\\u5355\\uff1f\\u6211\\u7684\\u5b64\\u5355\\u6307\\u6570\\u662f300%\\uff0c\\u5168\\u4e16\\u754c\\u90fd\\u628a\\u6211\\u5fd8\\u4e86\\uff01\",\"oldimg\":\"quce\\/1463124719FEMNI.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a500%br\\u5df2\\u7ecf\\u5fd8\\u8bb0\\u4e86\\u5b64\\u5355\",\"oldimg\":\"quce\\/1463124706fHKrI.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a300%br\\u88ab\\u5168\\u4e16\\u754c\\u9057\\u5fd8\",\"oldimg\":\"quce\\/1463124719FEMNI.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a100%br\\u9700\\u8981\\u4e00\\u4e2a\\u62e5\\u62b1\",\"oldimg\":\"quce\\/1463124840PQVdL.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a50%br\\u5fc3\\u91cc\\u7684\\u82e6\\u53ea\\u6709\\u81ea\\u5df1\\u77e5\\u9053\",\"oldimg\":\"quce\\/1463124947aRX4X.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520236805ZwxUH.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a500%br\\u5df2\\u7ecf\\u5fd8\\u8bb0\\u4e86\\u5b64\\u5355\",\"img\":\"quce\\/quiz-4902-wmWasYDaWj.png\",\"desc\":\"\\u73b0\\u5728\\u7684\\u4f60\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u5403\\u996d\\u3001\\u505a\\u4e8b\\u3001\\u751f\\u6d3b......\\u95f2\\u6687\\u65f6\\u95f4\\u4f60\\u4f1a\\u81ea\\u5a31\\u81ea\\u4e50\\uff0c\\u53ea\\u662f\\u4e00\\u4e2a\\u4eba\\u5728\\u4eba\\u5c71\\u4eba\\u6d77\\u4e2d\\u4e5f\\u4e0d\\u4f1a\\u611f\\u5230\\u96be\\u8fc7\\u4e86\\u3002\\u539f\\u672c\\u4f60\\u4ee5\\u4e3a\\u4e00\\u4e2a\\u4eba\\u65e0\\u6cd5\\u5b8c\\u6210\\u7684\\u4e8b\\u60c5\\uff0c\\u73b0\\u5982\\u4eca\\u4f60\\u4e00\\u4e2a\\u4eba\\u90fd\\u5c1d\\u8bd5\\u4e86\\u4e00\\u904d\\uff0c\\u56e0\\u4e3a\\u6ca1\\u6709\\u4eba\\u53ef\\u4ee5\\u8ba9\\u4f60\\u5206\\u4eab\\u5feb\\u4e50\\u4e0e\\u60b2\\u4f24\\uff01\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u6709\\u591a\\u5b64\\u5355\\uff1f\\u6211\\u7684\\u5b64\\u5355\\u6307\\u6570\\u662f500%\\uff0c\\u5df2\\u7ecf\\u5fd8\\u4e86\\u81ea\\u5df1\\u5f88\\u5b64\\u5355\\uff01\",\"oldimg\":\"quce\\/1463124706fHKrI.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a500%br\\u5df2\\u7ecf\\u5fd8\\u8bb0\\u4e86\\u5b64\\u5355\",\"oldimg\":\"quce\\/1463124706fHKrI.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a300%br\\u88ab\\u5168\\u4e16\\u754c\\u9057\\u5fd8\",\"oldimg\":\"quce\\/1463124719FEMNI.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a100%br\\u9700\\u8981\\u4e00\\u4e2a\\u62e5\\u62b1\",\"oldimg\":\"quce\\/1463124840PQVdL.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5b64\\u5355\\u6307\\u6570\\uff1a50%br\\u5fc3\\u91cc\\u7684\\u82e6\\u53ea\\u6709\\u81ea\\u5df1\\u77e5\\u9053\",\"oldimg\":\"quce\\/1463124947aRX4X.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520236805ZwxUH.png\",\"account\":1003}"},
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[0];

	} else if (_num < 24 && _num >= 15) {
		data = data1[1];

	} else if (_num < 28 && _num >= 24) {
		data = data1[2];

	}else if (_num >= 28) {
		data = data1[3];
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

