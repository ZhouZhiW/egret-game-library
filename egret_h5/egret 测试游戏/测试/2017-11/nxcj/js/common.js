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
		{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a54%br\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\",\"img\":\"quce\\/quiz-5328-jWDXRMpDEC.jpg\",\"desc\":\"\\u4f60\\u66fe\\u7ecf\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u7eaf\\u6d01\\u7684\\u4eba\\uff0c\\u4f46\\u540e\\u6765\\u4f60\\u53d1\\u73b0\\u5468\\u56f4\\u7684\\u4eba\\u90fd\\u53d8\\u6210\\u4e86\\u8001\\u53f8\\u673a\\uff0c\\u7eaf\\u6d01\\u7684\\u4f60\\u65e0\\u6cd5\\u9002\\u5e94\\u8fd9\\u79cd\\u53d8\\u5316\\uff0c\\u4e8e\\u662f\\u6162\\u6162\\u7684\\u4f60\\u4e5f\\u5f00\\u59cb\\u88ab\\u4ed6\\u4eec\\u540c\\u5316\\u3002\\u73b0\\u5728\\u7684\\u4f60\\u9009\\u62e9\\u5c06\\u90a3\\u4efd\\u7eaf\\u6d01\\u57cb\\u85cf\\u5728\\u5fc3\\u5e95\\uff0c\\u4ee5\\u4e00\\u526f\\u8001\\u53f8\\u673a\\u7684\\u6a21\\u6837\\u9762\\u5bf9\\u4e16\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u6709\\u591a\\u7eaf\\u6d01\\uff1f\\u6211\\u7684\\u7eaf\\u6d01\\u6307\\u657054%\\uff0c\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a500%br\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\"},{\"threshold\":\"B\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a320%br\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a101%br\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\"},{\"threshold\":\"D\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a54%br\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513325083bEHan.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a101%br\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\",\"img\":\"quce\\/quiz-5328-zEAYsdG5wb.jpg\",\"desc\":\"\\u4f60\\u5185\\u5fc3\\u8fd8\\u662f\\u4e00\\u4e2a\\u5f88\\u7eaf\\u6d01\\u7684\\u4eba\\uff0c\\u5373\\u4f7f\\u88ab\\u73b0\\u5b9e\\u6240\\u8feb\\uff0c\\u5b66\\u4f1a\\u4e86\\u4f2a\\u88c5\\u81ea\\u5df1\\uff0c\\u4f46\\u4f60\\u5e76\\u4e0d\\u4e60\\u60ef\\u53bb\\u8fd9\\u6837\\u505a\\uff0c\\u5c3d\\u7ba1\\u8868\\u9762\\u770b\\u8d77\\u6765\\u4f60\\u4e5f\\u5df2\\u7ecf\\u662f\\u4e00\\u4e2a\\u6c61\\u6c61\\u7684\\u4eba\\u4e86\\uff0c\\u800c\\u5b9e\\u9645\\u4e0a\\u4f60\\u7684\\u5185\\u5fc3\\u4e00\\u76f4\\u90fd\\u5f88\\u7eaf\\u6d01\\uff0c\\u4f60\\u4e0d\\u4f1a\\u8ba9\\u5916\\u754c\\u7684\\u4e16\\u4fd7\\u4fb5\\u72af\\u4e86\\u4f60\\u81ea\\u5df1\\u7684\\u5185\\u5fc3\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u6709\\u591a\\u7eaf\\u6d01\\uff1f\\u6211\\u7684\\u7eaf\\u6d01\\u6307\\u6570101%\\uff0c\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\\uff01\"}", "status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a500%br\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\"},{\"threshold\":\"B\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a320%br\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a101%br\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\"},{\"threshold\":\"D\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a54%br\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513325083bEHan.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a320%br\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\",\"img\":\"quce\\/quiz-5328-AX44d3mpRC.jpg\",\"desc\":\"\\u4f60\\u662f\\u7531\\u5185\\u800c\\u5916\\u7684\\u7eaf\\u6d01\\uff0c\\u4f60\\u603b\\u662f\\u4ee5\\u81ea\\u5df1\\u6700\\u5927\\u7684\\u5584\\u610f\\u6765\\u5bf9\\u5f85\\u8eab\\u8fb9\\u7684\\u4eba\\uff0c\\u5c3d\\u7ba1\\u8eab\\u8fb9\\u7684\\u8001\\u53f8\\u673a\\u4eec\\u603b\\u60f3\\u540c\\u5316\\u4f60\\uff0c\\u4f60\\u4e5f\\u5076\\u5c14\\u56de\\u5e94\\u4ed6\\u4eec\\uff0c\\u4f46\\u4f60\\u90fd\\u80fd\\u5728\\u5386\\u5c3d\\u6d6e\\u534e\\u540e\\u56de\\u5f52\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\\uff0c\\u6ca1\\u6709\\u4ec0\\u4e48\\u53ef\\u4ee5\\u6c61\\u67d3\\u5230\\u4f60\\u5185\\u5fc3\\u7684\\u7eaf\\u6d01\\uff0c\\u4f60\\u8fd8\\u662f\\u4e00\\u4e2a\\u7eaf\\u6d01\\u7684\\u4eba\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u6709\\u591a\\u7eaf\\u6d01\\uff1f\\u6211\\u7684\\u7eaf\\u6d01\\u6307\\u6570320%\\uff0c\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\\uff01\"}", "status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a500%br\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\"},{\"threshold\":\"B\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a320%br\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a101%br\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\"},{\"threshold\":\"D\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a54%br\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513325083bEHan.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a500%br\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\",\"img\":\"quce\\/quiz-5328-ER4wx3J5z8.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u5b8c\\u5b8c\\u5168\\u5168\\u5185\\u5fc3\\u7eaf\\u6d01\\u7684\\u4eba\\uff0c\\u4f60\\u603b\\u662f\\u6e29\\u67d4\\u7684\\u5bf9\\u5f85\\u5168\\u4e16\\u754c\\uff0c\\u4ece\\u4e0d\\u53c2\\u4e0e\\u4ec0\\u4e48\\u52fe\\u5fc3\\u6597\\u89d2\\u7684\\u4e8b\\u60c5\\uff0c\\u4e0d\\u7ba1\\u4e16\\u754c\\u53d8\\u6210\\u4ec0\\u4e48\\u6837\\u5b50\\uff0c\\u4f60\\u90fd\\u4f1a\\u5b88\\u4f4f\\u5fc3\\u4e2d\\u7684\\u4e00\\u7247\\u51c0\\u571f\\uff0c\\u5728\\u8fd9\\u4e2a\\u6c61\\u6d4a\\u7684\\u4e16\\u754c\\u91cc\\uff0c\\u4f60\\u5c31\\u662f\\u4e00\\u80a1\\u6e05\\u6d41\\uff0c\\u518d\\u4e5f\\u627e\\u4e0d\\u5230\\u6bd4\\u4f60\\u66f4\\u7eaf\\u6d01\\u7684\\u4eba\\u4e86\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u6709\\u591a\\u7eaf\\u6d01\\uff1f\\u6211\\u7684\\u7eaf\\u6d01\\u6307\\u6570500%\\uff0c\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a500%br\\u5185\\u5fc3\\u6d01\\u767d\\u65e0\\u7455\"},{\"threshold\":\"B\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a320%br\\u575a\\u5b88\\u7eaf\\u6d01\\u7684\\u672c\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a101%br\\u5185\\u5fc3\\u7eaf\\u6d01\\u8868\\u9762\\u6c61\"},{\"threshold\":\"D\",\"title\":\"\\u7eaf\\u6d01\\u6307\\u6570\\uff1a54%br\\u8fdb\\u9636\\u7684\\u8001\\u53f8\\u673a\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513325083bEHan.png\",\"account\":1003}"
		}
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 15 && _num >= 10) {
		data = data1[1];

	} else if (_num < 25 && _num >= 15) {
		data = data1[2];

	} else if (_num >= 25) {
		data = data1[3];

	}
	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		// clearInterval(getTimer);
		// if(timerCnt < waitTime){
			// waitTime -= timerCnt;
			callback(result, JSON.parse(data['total']), 3);
		// }else{
		// 	callback(result, JSON.parse(data['total']), 0);
		// }
	}
	
}

