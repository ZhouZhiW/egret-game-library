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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a2\\u7ea7br\\u611f\\u89c9\\u88ab\\u5168\\u4e16\\u754c\\u7968\\u629b\\u5f03\",\"img\":\"quce\\/quiz-6042-fhHA4pnz5y.png\",\"desc\":\"\\u5bc2\\u5bde\\u88ad\\u6765\\u4f1a\\u8ba9\\u4f60\\u89c9\\u5f97\\u81ea\\u5df1\\u88ab\\u5168\\u4e16\\u754c\\u629b\\u5f03\\u4e86\\uff0c\\u90a3\\u662f\\u4e00\\u79cd\\u6df1\\u5165\\u9aa8\\u9ad3\\u7684\\u7a7a\\u865a\\uff0c\\u8dd7\\u9aa8\\u4e4b\\u86c6\\uff0c\\u5982\\u5f71\\u968f\\u5f62\\uff0c\\u6325\\u4e4b\\u4e0d\\u53bb\\u3002\\u4f60\\u72ec\\u81ea\\u4e00\\u4eba\\u5728\\u591c\\u91cc\\u770b\\u98ce\\u666f\\u3001\\u60f3\\u4e0e\\u522b\\u4eba\\u5206\\u4eab\\u559c\\u60a6\\u65f6\\u8eab\\u65c1\\u5374\\u6ca1\\u6709\\u4eba\\u3001\\u522b\\u4eba\\u90fd\\u662f\\u4e09\\u4e94\\u6210\\u7fa4\\u4f60\\u5374\\u4e00\\u4e2a\\u4eba\\uff0c\\u9047\\u5230\\u8fd9\\u4e9b\\u60c5\\u51b5\\u65f6\\u4f60\\u90fd\\u4f1a\\u5f88\\u96be\\u8fc7\\uff0c\\u4f46\\u4f60\\u8981\\u660e\\u767d\\uff0c\\u5b66\\u4f1a\\u4eab\\u53d7\\u5bc2\\u5bde\\u4f60\\u624d\\u80fd\\u66f4\\u597d\\u7684\\u878d\\u5165\\u793e\\u4f1a\\uff01\",\"sharetitle\":\"\\u6211\\u80fd\\u627f\\u53d72\\u7ea7\\u5bc2\\u5bde\\uff0c\\u957f\\u65f6\\u95f4\\u72ec\\u5904\\u4f1a\\u8ba9\\u6211\\u60c5\\u7eea\\u5931\\u63a7\\uff01\\u4f60\\u6765\\u6d4b\\u6d4b\\uff1f\",\"oldimg\":\"quce\\/quiz-3482-14924334179d9SxGh5E0.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a9\\u7ea7br\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\",\"oldimg\":\"quce\\/quiz-3482-1492433414KyG1LYZSbT.png\"},{\"threshold\":\"B\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\",\"oldimg\":\"quce\\/quiz-3482-1492433419tvkq5D0T1M.png\"},{\"threshold\":\"C\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5bc2\\u5bde\\u8ba9\\u4eba\\u4e0d\\u77e5\\u6240\\u63aa\",\"oldimg\":\"quce\\/quiz-3482-1492433421WlxD5VlNOu.png\"},{\"threshold\":\"D\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a2\\u7ea7br\\u611f\\u89c9\\u88ab\\u5168\\u4e16\\u754c\\u7968\\u629b\\u5f03\",\"oldimg\":\"quce\\/quiz-3482-14924334179d9SxGh5E0.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520233228Af7PN.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5bc2\\u5bde\\u8ba9\\u4eba\\u4e0d\\u77e5\\u6240\\u63aa\",\"img\":\"quce\\/quiz-6042-2sh4cQKcmY.png\",\"desc\":\"\\u5bc2\\u5bde\\u5982\\u4f60\\uff0c\\u7a81\\u7136\\u60f3\\u4e0e\\u4eba\\u8bf4\\u8bf4\\u8bdd\\u5374\\u53d1\\u73b0\\u65e0\\u4eba\\u53ef\\u4ee5\\u8054\\u7cfb\\uff1b\\u597d\\u770b\\u7684\\u98ce\\u666f\\u60f3\\u4e0eta\\u5206\\u4eab\\uff0cta\\u5374\\u5728\\u522b\\u4eba\\u8eab\\u8fb9\\uff1b\\u8fd9\\u65f6\\u5019\\uff0c\\u4f60\\u7a81\\u7136\\u89c9\\u5f97\\u5fc3\\u91cc\\u6709\\u4e9b\\u7a7a\\u843d\\u843d\\u7684\\uff0c\\u90a3\\u79cd\\u8bf4\\u4e0d\\u51fa\\u53e3\\u7684\\u611f\\u89c9\\u5c31\\u5835\\u5728\\u4f60\\u7684\\u55d3\\u5b50\\u773c\\uff0c\\u54bd\\u90fd\\u54bd\\u4e0d\\u4e0b\\u53bb\\uff0c\\u5fc3\\u91cc\\u7684\\u987f\\u611f\\u5bc2\\u5bde\\uff0c\\u8eab\\u4f53\\u50cf\\u5931\\u53bb\\u4e86\\u652f\\u6491\\u7684\\u529b\\u6c14\\uff0c\\u60f3\\u54ed\\u5374\\u53c8\\u4e0d\\u6562\\u54ed\\u3002\",\"sharetitle\":\"\\u6211\\u80fd\\u627f\\u53d74\\u7ea7\\u5bc2\\u5bde\\uff0c\\u5bc2\\u5bde\\u88ad\\u6765\\u4f1a\\u8ba9\\u6211\\u6709\\u70b9\\u4e0d\\u77e5\\u6240\\u63aa\\uff01\\u4f60\\u6765\\u6d4b\\u6d4b\\uff1f\",\"oldimg\":\"quce\\/quiz-3482-1492433421WlxD5VlNOu.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a9\\u7ea7br\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\",\"oldimg\":\"quce\\/quiz-3482-1492433414KyG1LYZSbT.png\"},{\"threshold\":\"B\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\",\"oldimg\":\"quce\\/quiz-3482-1492433419tvkq5D0T1M.png\"},{\"threshold\":\"C\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5bc2\\u5bde\\u8ba9\\u4eba\\u4e0d\\u77e5\\u6240\\u63aa\",\"oldimg\":\"quce\\/quiz-3482-1492433421WlxD5VlNOu.png\"},{\"threshold\":\"D\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a2\\u7ea7br\\u611f\\u89c9\\u88ab\\u5168\\u4e16\\u754c\\u7968\\u629b\\u5f03\",\"oldimg\":\"quce\\/quiz-3482-14924334179d9SxGh5E0.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520233228Af7PN.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\",\"img\":\"quce\\/quiz-6042-jwfMiknGff.png\",\"desc\":\"\\u522b\\u4eba\\u4f1a\\u56e0\\u4e3a\\u60b2\\u4f24\\u548c\\u5feb\\u4e50\\u4e0d\\u80fd\\u4e0e\\u4eba\\u5206\\u4eab\\u800c\\u89c9\\u5f97\\u5bc2\\u5bde\\uff0c\\u53ef\\u4f60\\u5374\\u5b66\\u4f1a\\u4e86\\u81ea\\u5f97\\u5176\\u4e50\\uff0c\\u4f60\\u80fd\\u6d88\\u5316\\u4f60\\u6240\\u6709\\u7684\\u60c5\\u7eea\\uff0c\\u4f60\\u89c9\\u5f97\\u4e0e\\u5176\\u53e8\\u6270\\u522b\\u4eba\\uff0c\\u8fd8\\u4e0d\\u5982\\u81ea\\u5df1\\u6162\\u6162\\u54c1\\u5473\\u3002\\u6240\\u4ee5\\u5728\\u5bc2\\u5bde\\u9762\\u524d\\u4f60\\u662f\\u80dc\\u8005\\uff0c\\u4f60\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\\uff0c\\u56e0\\u4e3a\\u4f60\\u61c2\\u5f97\\u4eba\\u6d3b\\u7740\\uff0c\\u6709\\u4e9b\\u4e8b\\u60c5\\u5c31\\u662f\\u9700\\u8981\\u81ea\\u5df1\\u4e00\\u4e2a\\u4eba\\u53bb\\u6297\\u7684\\uff01\",\"sharetitle\":\"\\u6211\\u80fd\\u627f\\u53d77\\u7ea7\\u5bc2\\u5bde\\uff0c\\u72ec\\u5904\\u5bf9\\u6211\\u6765\\u8bf4\\u5c31\\u662f\\u5c0f\\u513f\\u79d1\\uff01\\u4f60\\u6765\\u6d4b\\u6d4b\\uff1f\",\"oldimg\":\"quce\\/quiz-3482-1492433419tvkq5D0T1M.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a9\\u7ea7br\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\",\"oldimg\":\"quce\\/quiz-3482-1492433414KyG1LYZSbT.png\"},{\"threshold\":\"B\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\",\"oldimg\":\"quce\\/quiz-3482-1492433419tvkq5D0T1M.png\"},{\"threshold\":\"C\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5bc2\\u5bde\\u8ba9\\u4eba\\u4e0d\\u77e5\\u6240\\u63aa\",\"oldimg\":\"quce\\/quiz-3482-1492433421WlxD5VlNOu.png\"},{\"threshold\":\"D\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a2\\u7ea7br\\u611f\\u89c9\\u88ab\\u5168\\u4e16\\u754c\\u7968\\u629b\\u5f03\",\"oldimg\":\"quce\\/quiz-3482-14924334179d9SxGh5E0.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520233228Af7PN.png\",\"account\":1003}"},

		{"content":"{\"threshold\":\"A\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a9\\u7ea7br\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\",\"img\":\"quce\\/quiz-6042-SXdzCdRfxZ.png\",\"desc\":\"\\u6050\\u6015\\u6b64\\u523b\\u7684\\u4f60\\u5e76\\u4e0d\\u89c9\\u5f97\\u81ea\\u5df1\\u5f88\\u5bc2\\u5bde\\uff0c\\u56e0\\u4e3a\\u4f60\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\\uff0c\\u800c\\u8fd9\\u79cd\\u79bb\\u4e86\\u4efb\\u4f55\\u4eba\\u90fd\\u80fd\\u6d3b\\u7684\\u611f\\u89c9\\uff0c\\u4f60\\u8ba4\\u4e3a\\u8fd8\\u4e0d\\u9519\\u3002\\u6240\\u4ee5\\u4f60\\u6ca1\\u6709\\u8f93\\u7ed9\\u90a3\\u4e9b\\u5bc2\\u5bde\\u7684\\u591c\\u665a\\uff0c\\u56e0\\u4e3a\\u4f60\\u7684\\u5185\\u5fc3\\u662f\\u6c89\\u9759\\u7684\\uff0c\\u4e5f\\u662f\\u4e30\\u6ee1\\u7684\\u3002\\u5047\\u5982\\u4e16\\u754c\\u771f\\u7684\\u6709\\u672b\\u65e5\\uff0c\\u5174\\u8bb8\\u4f60\\u5c31\\u662f\\u6700\\u6709\\u5e0c\\u671b\\u6d3b\\u4e0b\\u53bb\\u7684\\u4eba\\uff01\",\"sharetitle\":\"\\u6211\\u80fd\\u627f\\u53d79\\u7ea7\\u5bc2\\u5bde\\uff0c\\u4e16\\u4e0a\\u53ea\\u5269\\u6211\\u4e00\\u4eba\\u4e5f\\u80fd\\u6d3b\\u4e0b\\u53bb\\uff01\\u4f60\\u6765\\u6d4b\\u6d4b\\uff1f\",\"oldimg\":\"quce\\/quiz-3482-1492433414KyG1LYZSbT.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a9\\u7ea7br\\u4e60\\u60ef\\u4e86\\u4e00\\u4e2a\\u4eba\\u7684\\u751f\\u6d3b\",\"oldimg\":\"quce\\/quiz-3482-1492433414KyG1LYZSbT.png\"},{\"threshold\":\"B\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u5bc2\\u5bde\\u6253\\u8d25\",\"oldimg\":\"quce\\/quiz-3482-1492433419tvkq5D0T1M.png\"},{\"threshold\":\"C\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5bc2\\u5bde\\u8ba9\\u4eba\\u4e0d\\u77e5\\u6240\\u63aa\",\"oldimg\":\"quce\\/quiz-3482-1492433421WlxD5VlNOu.png\"},{\"threshold\":\"D\",\"title\":\"\\u627f\\u53d7\\u5bc2\\u5bde\\u7b49\\u7ea7\\uff1a2\\u7ea7br\\u611f\\u89c9\\u88ab\\u5168\\u4e16\\u754c\\u7968\\u629b\\u5f03\",\"oldimg\":\"quce\\/quiz-3482-14924334179d9SxGh5E0.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520233228Af7PN.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[0];

	} else if (_num < 23 && _num >= 15) {
		data = data1[1];

	} else if (_num < 30 && _num >= 23) {
		data = data1[2];

	} else if (_num < 36 &&_num >= 30) {
		data = data1[3];
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

