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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\",\"img\":\"quce\\/quiz-5022-iSC2NBBEP4.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u6bd4\\u8f83\\u614e\\u91cd\\u7684\\u4eba\\uff0c\\u5728\\u7231\\u60c5\\u4e2d\\u7684\\u6001\\u5ea6\\u662f\\u8ba4\\u771f\\u4e14\\u8bda\\u6073\\u5730\\u3002\\u4f60\\u5f88\\u5728\\u610f\\u611f\\u60c5\\u7684\\u5fe0\\u8bda\\u5ea6\\uff0c\\u6240\\u4ee5\\u5728\\u672a\\u6765\\u7684\\u65e5\\u5b50\\u91cc\\uff0c\\u4e0d\\u7ba1\\u662f\\u51fa\\u73b0\\u4e86\\u8c01\\uff0c\\u4e0d\\u7ba1\\u6709\\u4ec0\\u4e48\\u6837\\u7684\\u8bf1\\u60d1\\u6446\\u5728\\u4f60\\u9762\\u524d\\uff0c\\u4f60\\u90fd\\u4e0d\\u4f1a\\u5fc3\\u52a8\\uff0c\\u56e0\\u4e3a\\u4f60\\u4e0d\\u4f1a\\u8f7b\\u6613\\u6539\\u53d8\\u81ea\\u5df1\\u7684\\u4e16\\u754c\\u89c2\\u3001\\u4eba\\u751f\\u89c2\\u548c\\u4ef7\\u503c\\u89c2\\u3002\",\"sharetitle\":\"\\u6211\\u51fa\\u8f68\\u7684\\u673a\\u7387\\uff1a0.01%\\uff0c\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\\uff01\\u6562\\u4e0d\\u6562\\u770b\\u770b\\u4f60\\u51fa\\u8f68\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\"},{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\"},{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\"},{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515380435grPr3.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\",\"img\":\"quce\\/quiz-5022-AEZ22cmJxY.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u77db\\u76fe\\u7684\\u4eba\\uff0c\\u8868\\u9762\\u4e0a\\u770b\\u8d77\\u6765\\u5b89\\u5206\\u5b88\\u5df1\\uff0c\\u5185\\u5fc3\\u5374\\u65e9\\u5df2\\u6ce2\\u6d9b\\u6c79\\u6d8c\\u3002\\u4f60\\u4e0d\\u7518\\u4e8e\\u5e73\\u51e1\\uff0c\\u60f3\\u8981\\u8ffd\\u5bfb\\u523a\\u6fc0\\uff0c\\u4f46\\u8fd9\\u79cd\\u5fc3\\u7406\\u66f4\\u591a\\u7684\\u65f6\\u5019\\u90fd\\u53ea\\u4f1a\\u85cf\\u5728\\u5fc3\\u4e2d\\uff0c\\u6781\\u5c11\\u4f1a\\u4e3b\\u52a8\\u5730\\u4ed8\\u51fa\\u73b0\\u5b9e\\u3002\\u7136\\u800c\\uff0c\\u5f53\\u5916\\u754c\\u4e3b\\u52a8\\u51fa\\u73b0\\u79cd\\u79cd\\u8bf1\\u60d1\\u65f6\\uff0c\\u4f60\\u4fbf\\u53ef\\u80fd\\u4f1a\\u5f00\\u59cb\\u6709\\u4e9b\\u52a8\\u6447\\u4e86\\u3002\",\"sharetitle\":\"\\u6211\\u51fa\\u8f68\\u7684\\u673a\\u7387\\uff1a64%\\uff0c\\u4e3a\\u4e86\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\\uff0c\\u6562\\u4e0d\\u6562\\u770b\\u770b\\u4f60\\u51fa\\u8f68\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\"},{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\"},{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\"},{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515380435grPr3.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\",\"img\":\"quce\\/quiz-5022-EDQWY3Jy6B.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u6d3b\\u5f97\\u660e\\u767d\\u7684\\u4eba\\uff0c\\u4f60\\u5f88\\u6e05\\u695a\\u81ea\\u5df1\\u7684\\u6b7b\\u7a74\\u5728\\u54ea\\u91cc\\uff0c\\u5c24\\u5176\\u662f\\u9762\\u5bf9\\u611f\\u60c5\\u65f6\\uff0c\\u4f60\\u66f4\\u50cf\\u662f\\u4e00\\u4e2a\\u667a\\u8005\\uff0c\\u80fd\\u770b\\u7a7f\\u4e00\\u5207\\u3002\\u5f53\\u4f60\\u9677\\u5165\\u8bf1\\u60d1\\u7684\\u5371\\u673a\\u4e2d\\u65f6\\uff0c\\u4f60\\u5e38\\u5e38\\u4f1a\\u91c7\\u53d6\\u589e\\u5f3a\\u81ea\\u6211\\u62b5\\u6297\\u529b\\u7684\\u7b56\\u7565\\uff0c\\u65e0\\u8bba\\u4ed6\\u4eba\\u7528\\u591a\\u5927\\u7684\\u5229\\u76ca\\u6765\\u8bf1\\u60d1\\u4f60\\uff0c\\u4f60\\u90fd\\u53ef\\u4ee5\\u8f7b\\u6613\\u62d2\\u7edd\\uff01\",\"sharetitle\":\"\\u6211\\u51fa\\u8f68\\u7684\\u673a\\u7387\\uff1a20%\\uff0c\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\\uff01\\u6562\\u4e0d\\u6562\\u770b\\u770b\\u4f60\\u51fa\\u8f68\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\"},{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\"},{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\"},{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515380435grPr3.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\",\"img\":\"quce\\/quiz-5022-TAbSSTh56E.jpg\",\"desc\":\"\\u4f60\\u62e5\\u6709\\u4e00\\u4e2a\\u968f\\u6027\\u7684\\u6027\\u683c\\uff0c\\u5bf9\\u5f85\\u611f\\u60c5\\u4e5f\\u662f\\u5982\\u6b64\\u3002\\u4f60\\u4e0d\\u559c\\u6b22\\u5728\\u7231\\u60c5\\u4e2d\\u627f\\u8bfa\\u4ec0\\u4e48\\uff0c\\u5012\\u4e0d\\u662f\\u6ca1\\u6709\\u8d23\\u4efb\\u5fc3\\uff0c\\u800c\\u662f\\u4f60\\u89c9\\u5f97\\u4e16\\u4e8b\\u65e0\\u5e38\\uff0c\\u4e0e\\u5176\\u6700\\u540e\\u505a\\u4e0d\\u5230\\uff0c\\u4e0d\\u5982\\u4e00\\u5f00\\u59cb\\u5c31\\u4e0d\\u8981\\u628a\\u8bdd\\u8bf4\\u592a\\u7edd\\u3002\\u5373\\u4f7f\\u4f60\\u5728\\u7231\\u60c5\\u4e2d\\u51fa\\u8f68\\uff0c\\u4e5f\\u8ba4\\u4e3a\\u81ea\\u5df1\\u53ea\\u662f\\u5728\\u8ffd\\u6c42\\u771f\\u7231\\uff0c\\u624d\\u4e0d\\u7ba1\\u522b\\u4eba\\u600e\\u4e48\\u60f3\\u3002\",\"sharetitle\":\"\\u6211\\u51fa\\u8f68\\u7684\\u673a\\u7387\\uff1a98%\\uff0c\\u8086\\u610f\\u7684\\u4eba\\u751f\\uff0c\\u6562\\u4e0d\\u6562\\u770b\\u770b\\u4f60\\u51fa\\u8f68\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\"},{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\"},{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\"},{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515380435grPr3.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\",\"img\":\"quce\\/quiz-5022-KaAPYaMJBR.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u7406\\u6027\\u7684\\u4eba\\uff0c\\u7231\\u60c5\\u4e0e\\u5a5a\\u59fb\\u5728\\u4f60\\u770b\\u6765\\u90fd\\u53ea\\u662f\\u5408\\u540c\\u5173\\u7cfb\\uff0c\\u4e00\\u65e6\\u611f\\u60c5\\u53d1\\u751f\\u4e86\\u6539\\u53d8\\uff0c\\u5408\\u540c\\u6709\\u6548\\u671f\\u4e5f\\u5c31\\u81ea\\u52a8\\u7ec8\\u6b62\\u3002\\u6240\\u4ee5\\u5bf9\\u4f60\\u6765\\u8bf4\\uff0c\\u7ea2\\u674f\\u51fa\\u5899\\u4ec0\\u4e48\\u7684\\u90fd\\u518d\\u6b63\\u5e38\\u4e0d\\u8fc7\\uff0c\\u6ca1\\u6709\\u4ec0\\u4e48\\u53ef\\u503c\\u5f97\\u6279\\u5224\\u7684\\u3002\\u4e0d\\u80fd\\u8bf4\\u4f60\\u6bd4\\u8f83\\u73b0\\u5b9e\\uff0c\\u4f46\\u8fd9\\u5c31\\u662f\\u6211\\u4eec\\u751f\\u6d3b\\u7684\\u793e\\u4f1a\\u3002\",\"sharetitle\":\"\\u6211\\u51fa\\u8f68\\u7684\\u673a\\u7387\\uff1a76%\\uff0c\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\\uff0c\\u6562\\u4e0d\\u6562\\u770b\\u770b\\u4f60\\u51fa\\u8f68\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a0.01\\uff05br\\u4e00\\u751f\\u4e00\\u4e16\\u4e00\\u53cc\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a20\\uff05br\\u80fd\\u591f\\u5750\\u6000\\u4e0d\\u4e71\"},{\"threshold\":\"C\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a64\\uff05br\\u60f3\\u8981\\u5bfb\\u627e\\u523a\\u6fc0\\u611f\"},{\"threshold\":\"D\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a76\\uff05br\\u4e16\\u4e8b\\u65e0\\u7edd\\u5bf9\"},{\"threshold\":\"E\",\"title\":\"\\u51fa\\u8f68\\u673a\\u7387\\uff1a98\\uff05br\\u8086\\u610f\\u6b22\\u8131\\u7684\\u4eba\\u751f\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515380435grPr3.png\",\"account\":1003}" }
	]

	var data;
	var _Array=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","k"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1])
		if(_num!=-1){
			data=data1[_num];
		}
	}

/* hasContent */

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

