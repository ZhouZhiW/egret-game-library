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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a500%\",\"img\":\"quce\\/quiz-3374-mfCPPHHt4j.jpg\",\"desc\":\"\\u4f60\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f500%\\uff01\\u77a7\\u4f60\\u90a3\\u66b4\\u813e\\u6c14\\uff0c\\u813e\\u6c14\\u4e0a\\u5934\\u4e86\\uff0c\\u4f60\\u780d\\u4eba\\u7684\\u5fc3\\u90fd\\u6709\\u4e86\\u3002\\u4f60\\u6700\\u6068\\u6b3a\\u9a97\\u548c\\u80cc\\u53db\\uff0c\\u5982\\u679c\\u6709\\u4eba\\u72af\\u4e86\\u5176\\u4e00\\uff0c\\u4f60\\u662f\\u7edd\\u5bf9\\u4e0d\\u4f1a\\u539f\\u8c05ta\\u7684\\uff1b\\u82e5\\u662f\\u4e24\\u4e2a\\u90fd\\u72af\\u4e86\\uff0c\\u5c31\\u7b97\\u5c06ta\\u7f6e\\u4e4b\\u6b7b\\u5730\\u4e5f\\u89c9\\u5f97\\u4e0d\\u89e3\\u6068\\u3002\\u867d\\u8bf4\\u4f60\\u813e\\u6c14\\u706b\\u7206\\uff0c\\u4f46\\u7edd\\u5bf9\\u662f\\u6ca1\\u6709\\u574f\\u5fc3\\u773c\\u513f\\u7684\\uff0c\\u5176\\u5b9e\\u5f88\\u591a\\u65f6\\u5019\\uff0c\\u813e\\u6c14\\u8fc7\\u53bb\\u4e86\\u8fd9\\u4e8b\\u4e5f\\u5c31\\u8fc7\\u53bb\\u4e86\\uff0c\\u4f60\\u4e0d\\u50cf\\u90a3\\u79cd\\u5634\\u4e0a\\u8bf4\\u6ca1\\u4e8b\\u6ca1\\u4e8b\\uff0c\\u5374\\u5728\\u80cc\\u540e\\u6345\\u5200\\u5b50\\u7684\\u4eba\\uff0c\\u6240\\u4ee5\\u8fd9\\u6837\\u7684\\u4f60\\u591a\\u662f\\u76f4\\u723d\\u3001\\u5766\\u8bda\\u7684\\u4eba\\uff0c\\u5982\\u679c\\u6709\\u4eba\\u4e0d\\u80fd\\u5305\\u5bb9\\u4f60\\u7684\\u813e\\u6c14\\uff0c\\u90a3\\u4e48\\u548cta\\u4e00\\u8d77\\u73a9\\u4e5f\\u6ca1\\u4ec0\\u4e48\\u610f\\u601d\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f500%\\uff0c\\u6700\\u6068\\u6b3a\\u9a97\\u4e0e\\u80cc\\u53db\\uff0c\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a500%\"},{\"threshold\":\"B\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a200%\"},{\"threshold\":\"C\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a80%\"},{\"threshold\":\"D\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a30%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513931402LuFQR.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a200%\",\"img\":\"quce\\/quiz-3374-wGPdp6G5Jf.jpg\",\"desc\":\"\\u4f60\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f200%\\uff01\\u4f60\\u7684\\u813e\\u6c14\\u5c5e\\u4e8e\\u6025\\u8e81+\\u706b\\u7206\\uff0c\\u5e72\\u4ec0\\u4e48\\u4e8b\\u90fd\\u98ce\\u98ce\\u706b\\u706b\\u7684\\uff0c\\u597d\\u50cf\\u540e\\u9762\\u6709\\u72fc\\u8ffd\\u7740\\uff0c\\u4e00\\u65e6\\u4e8b\\u60c5\\u6ca1\\u6709\\u6309\\u7167\\u4f60\\u7684\\u9884\\u671f\\u53d1\\u5c55\\u4f60\\u5c31\\u66f4\\u7740\\u6025\\uff0c\\u4e00\\u7740\\u6025\\u4f60\\u5c31\\u50cf\\u4e00\\u4e2a\\u70e7\\u7ea2\\u7684\\u706b\\u7403\\uff0c\\u8c01\\u78b0\\u8c01\\u84b8\\u53d1\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u6709\\u5f88\\u5f3a\\u7684\\u884c\\u52a8\\u529b\\uff0c\\u6240\\u4ee5\\u5373\\u4f7f\\u4f60\\u7684\\u813e\\u6c14\\u7b97\\u4e0d\\u4e0a\\u597d\\uff0c\\u4f60\\u4e5f\\u662f\\u5bf9\\u4e8b\\u4e0d\\u5bf9\\u4eba\\uff0c\\u5f88\\u591a\\u65f6\\u5019\\u4f60\\u53ea\\u662f\\u60f3\\u628a\\u4e8b\\u60c5\\u505a\\u597d\\uff0c\\u5e76\\u4e0d\\u662f\\u9488\\u5bf9\\u522b\\u4eba\\u3002\\u719f\\u6089\\u4f60\\u7684\\u4eba\\u90fd\\u77e5\\u9053\\u4f60\\u662f\\u4ec0\\u4e48\\u6837\\u7684\\u4eba\\uff0c\\u81f3\\u4e8e\\u90a3\\u4e9b\\u4e0d\\u4e86\\u89e3\\u4f60\\u7684\\u4eba\\uff0c\\u4f60\\u5c31\\u8ba9ta\\u4eec\\u8bf4\\u53bb\\u5427\\uff0c\\u53cd\\u6b63\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u5728\\u610f\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f200%\\uff0c\\u5bf9\\u4e8b\\u4e0d\\u5bf9\\u4eba\\uff0c\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a500%\"},{\"threshold\":\"B\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a200%\"},{\"threshold\":\"C\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a80%\"},{\"threshold\":\"D\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a30%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513931402LuFQR.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a80%\",\"img\":\"quce\\/quiz-3374-X326wwsEGW.jpg\",\"desc\":\"\\u4f60\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f80%\\uff01\\u4f60\\u4e00\\u76f4\\u77e5\\u9053\\u81ea\\u5df1\\u6709\\u4e2a\\u5c0f\\u66b4\\u813e\\u6c14\\uff0c\\u4f46\\u662f\\u4f60\\u4e5f\\u4e0d\\u8ba4\\u4e3a\\u90a3\\u662f\\u5f88\\u5927\\u7684\\u7f3a\\u70b9\\u3002\\u56e0\\u4e3a\\u66b4\\u813e\\u6c14\\u7684\\u4f60\\u4ece\\u6765\\u90fd\\u662f\\u5766\\u5766\\u8361\\u8361\\u3001\\u660e\\u4eba\\u4e0d\\u505a\\u6697\\u4e8b\\u7684\\uff0c\\u6240\\u4ee5\\u813e\\u6c14\\u4e0a\\u6765\\u7684\\u65f6\\u5019\\u5927\\u4e0d\\u4e86\\u6253\\u4e00\\u67b6\\uff0c\\u4f60\\u662f\\u4e0d\\u5c51\\u53bb\\u505a\\u80cc\\u540e\\u653e\\u51b7\\u7bad\\u7684\\u4e8b\\u7684\\u3002\\u800c\\u4f60\\u7684\\u670b\\u53cb\\u4e2d\\u4e5f\\u8bb8\\u5c31\\u6709\\u6253\\u51fa\\u6765\\u7684\\u597d\\u4ea4\\u60c5\\uff0c\\u56e0\\u4e3a\\u4f60\\u4eec\\u53cc\\u65b9\\u90fd\\u662f\\u90a3\\u4e48\\u76f4\\u63a5\\u3001\\u75db\\u5feb\\uff0c\\u6240\\u4ee5\\u60f3\\u8ba9\\u53cb\\u8c0a\\u5929\\u957f\\u5730\\u4e45\\u4e5f\\u4e0d\\u662f\\u4ec0\\u4e48\\u96be\\u4e8b\\u3002\\u53ea\\u662f\\u5fc3\\u91cc\\u4ece\\u6765\\u6ca1\\u6709\\u5c0f\\u4e5d\\u4e5d\\u7684\\u4f60\\uff0c\\u6709\\u4e9b\\u5bb9\\u6613\\u88ab\\u57ce\\u5e9c\\u5f88\\u6df1\\u7684\\u4eba\\u5229\\u7528\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f80%\\uff0c\\u4e0d\\u670d\\u6253\\u4e00\\u67b6\\uff0c\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a500%\"},{\"threshold\":\"B\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a200%\"},{\"threshold\":\"C\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a80%\"},{\"threshold\":\"D\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a30%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513931402LuFQR.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a30%\",\"img\":\"quce\\/quiz-3374-QjnzEjYsbK.jpg\",\"desc\":\"\\u4f60\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f30%\\uff01\\u76f8\\u5bf9\\u6765\\u8bf4\\u4f60\\u7684\\u813e\\u6c14\\u8fd8\\u7b97\\u6e29\\u6da6\\uff0c\\u5e73\\u65f6\\u7684\\u4f60\\u5949\\u884c\\u4e2d\\u5eb8\\u4e4b\\u9053\\uff0c\\u64c5\\u4e8e\\u63a5\\u7eb3\\u4ed6\\u4eba\\u610f\\u89c1\\uff0c\\u662f\\u6700\\u4f73\\u7684\\u503e\\u542c\\u8005\\uff0c\\u4e5f\\u6781\\u5177\\u8010\\u5fc3\\u3002\\u867d\\u7136\\u4f60\\u4e00\\u5411\\u90fd\\u662f\\u4e00\\u5fcd\\u518d\\u5fcd\\uff0c\\u4f46\\u662f\\u8fd9\\u6837\\u7684\\u4f60\\u5e76\\u4e0d\\u662f\\u5b8c\\u5168\\u6ca1\\u6709\\u813e\\u6c14\\u7684\\uff0c\\u5f53\\u67d0\\u4e9b\\u4e8b\\u5b8c\\u5168\\u8fdd\\u80cc\\u4e86\\u4f60\\u7684\\u5e95\\u7ebf\\uff0c\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u9ed8\\u4e0d\\u4f5c\\u58f0\\uff0c\\u800c\\u8fd9\\u65f6\\u7684\\u4f60\\u53ea\\u8981\\u4e00\\u53d1\\u529f\\uff0c\\u7edd\\u5bf9\\u80fd\\u8ba9\\u4eba\\u8dcc\\u7834\\u773c\\u955c\\uff0c\\u6bd5\\u7adf\\u53d1\\u813e\\u6c14\\u548c\\u4e0d\\u53d1\\u813e\\u6c14\\u7684\\u4f60\\u662f\\u5b8c\\u5168\\u4e0d\\u4e00\\u6837\\u7684\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u66b4\\u813e\\u6c14\\u6307\\u6570\\u662f30%\\uff0c\\u4e0d\\u8981\\u89e6\\u78b0\\u6211\\u7684\\u5e95\\u7ebf\\uff0c\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a500%\"},{\"threshold\":\"B\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a200%\"},{\"threshold\":\"C\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a80%\"},{\"threshold\":\"D\",\"title\":\"\\u66b4\\u813e\\u6c14\\u6307\\u6570\\uff1a30%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513931402LuFQR.png\",\"account\":1003}" },
	];
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[3];

	} else if (_num < 20 && _num >= 15) {
		data = data1[2];

	} else if (_num < 27 && _num >= 20) {
		data = data1[1];

	} else if (_num >= 27) {
		data = data1[0];
	}

	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 2);

	}

}

