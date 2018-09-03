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
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a120%br\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\",\"img\":\"quce\\/quiz-6057-QDBG2KBiRC.png\",\"desc\":\"\\u4f60\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u8fd8\\u662f\\u86ee\\u4e25\\u91cd\\u7684\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\u7684\\u4eba\\uff0c\\u505a\\u4e8b\\u603b\\u662f\\u8bf4\\u4e00\\u4e0d\\u4e8c\\uff0c\\u4e0d\\u63a5\\u53d7\\u4efb\\u4f55\\u4eba\\u7684\\u8d28\\u7591\\u3002\\u5728\\u611f\\u60c5\\u65b9\\u9762\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u8c28\\u614e\\u7684\\u4eba\\uff0c\\u518d\\u51b3\\u5b9a\\u8981\\u5f00\\u59cb\\u4e00\\u6bb5\\u611f\\u60c5\\u4e4b\\u524d\\uff0c\\u4f60\\u53ef\\u80fd\\u4f1a\\u7528\\u5f88\\u957f\\u4e00\\u6bb5\\u65f6\\u95f4\\u6765\\u9a8c\\u8bc1\\u5bf9\\u65b9\\u5bf9\\u4f60\\u662f\\u5426\\u8ba4\\u771f\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u7cbe\\u795e\\u6d01\\u7656\\u5417\\uff1f\\u6211\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570120%\\uff0c\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\\u3002\",\"oldimg\":\"quce\\/1519784954gYoE5.jpg\"}","status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a200%br\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\",\"oldimg\":\"quce\\/1519784930fVxEQ.png\"},{\"threshold\":\"B\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a120%br\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\",\"oldimg\":\"quce\\/1519784954gYoE5.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a79%br\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\",\"oldimg\":\"quce\\/1519784951EdH5w.png\"},{\"threshold\":\"D\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a30%br\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\",\"oldimg\":\"quce\\/151978494475RJy.jpg\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/152024403734jVS.png\",\"account\":1003}" },
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a79%br\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\",\"img\":\"quce\\/quiz-6057-jzPGRnebfi.png\",\"desc\":\"\\u4f60\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u5e76\\u4e0d\\u662f\\u5f88\\u4e25\\u91cd\\uff0c\\u5927\\u90e8\\u5206\\u65f6\\u95f4\\u90fd\\u4e0d\\u4f1a\\u8868\\u73b0\\u51fa\\u6765\\uff0c\\u5076\\u5c14\\u6709\\u4e00\\u4e9b\\u5c0f\\u4e8b\\u60c5\\u89e6\\u78b0\\u5230\\u4f60\\u7684\\u6d01\\u7656\\u795e\\u7ecf\\uff0c\\u4f60\\u90fd\\u4f1a\\u5c3d\\u91cf\\u53bb\\u5fcd\\u53d7\\uff0c\\u4f46\\u8fd9\\u4ec5\\u9650\\u4e00\\u4e9b\\u4e0d\\u75db\\u4e0d\\u75d2\\u7684\\u5c0f\\u4e8b\\uff0c\\u5982\\u679c\\u53d1\\u751f\\u4f60\\u4e0d\\u80fd\\u5fcd\\u7684\\u4e8b\\u60c5\\uff0c\\u4f60\\u53ef\\u662f\\u4f1a\\u6beb\\u4e0d\\u63a9\\u9970\\u5730\\u8868\\u73b0\\u51fa\\u81ea\\u5df1\\u7684\\u538c\\u6076\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u7cbe\\u795e\\u6d01\\u7656\\u5417\\uff1f\\u6211\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u657089%\\uff0c\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\\u3002\",\"oldimg\":\"quce\\/1519784951EdH5w.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a200%br\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\",\"oldimg\":\"quce\\/1519784930fVxEQ.png\"},{\"threshold\":\"B\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a120%br\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\",\"oldimg\":\"quce\\/1519784954gYoE5.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a79%br\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\",\"oldimg\":\"quce\\/1519784951EdH5w.png\"},{\"threshold\":\"D\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a30%br\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\",\"oldimg\":\"quce\\/151978494475RJy.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/152024403734jVS.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a200%br\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\",\"img\":\"quce\\/quiz-6057-NNYc34CGMe.png\",\"desc\":\"\\u4f5c\\u4e3a\\u4e00\\u540d\\u91cd\\u5ea6\\u7cbe\\u795e\\u6d01\\u7656\\u8005\\uff0c\\u4f60\\u7684\\u5185\\u5fc3\\u975e\\u5e38\\u654f\\u611f\\uff0c\\u5bf9\\u5f85\\u4efb\\u4f55\\u4e8b\\u60c5\\u90fd\\u5341\\u5206\\u7684\\u4e25\\u8c28\\uff0c\\u5c24\\u5176\\u662f\\u5728\\u611f\\u60c5\\u65b9\\u4fbf\\uff0c\\u4e0d\\u7ba1\\u662f\\u7231\\u60c5\\u4e5f\\u597d\\uff0c\\u53cb\\u60c5\\u4e5f\\u597d\\uff0c\\u4f60\\u90fd\\u662f\\u773c\\u91cc\\u5bb9\\u4e0d\\u5f97\\u4e00\\u70b9\\u6c99\\u5b50\\u7684\\uff0c\\u7231\\u618e\\u5206\\u660e\\u7684\\u4f60\\u603b\\u662f\\u4f1a\\u628a\\u662f\\u975e\\u66f2\\u76f4\\u5206\\u7684\\u6e05\\u6e05\\u695a\\u695a\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u7cbe\\u795e\\u6d01\\u7656\\u5417\\uff1f\\u6211\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570200%\\uff0c\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\\u3002\",\"oldimg\":\"quce\\/1519784930fVxEQ.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a200%br\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\",\"oldimg\":\"quce\\/1519784930fVxEQ.png\"},{\"threshold\":\"B\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a120%br\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\",\"oldimg\":\"quce\\/1519784954gYoE5.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a79%br\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\",\"oldimg\":\"quce\\/1519784951EdH5w.png\"},{\"threshold\":\"D\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a30%br\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\",\"oldimg\":\"quce\\/151978494475RJy.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/152024403734jVS.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a30%br\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\",\"img\":\"quce\\/quiz-6057-e7Q88RmQdi.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u968f\\u6027\\u7684\\u4eba\\uff0c\\u51e0\\u4e4e\\u6ca1\\u6709\\u4ec0\\u4e48\\u7cbe\\u795e\\u6d01\\u7656\\uff0c\\u4f60\\u5bf9\\u8eab\\u8fb9\\u7684\\u670b\\u53cb\\u603b\\u662f\\u65e0\\u9650\\u7684\\u5305\\u5bb9\\uff0c\\u5fc3\\u80a0\\u5f88\\u8f6f\\u7684\\u4f60\\u4e5f\\u603b\\u662f\\u5f88\\u4e50\\u4e8e\\u53bb\\u5e2e\\u52a9\\u670b\\u53cb\\uff0c\\u4f60\\u5927\\u5927\\u54a7\\u54a7\\u7684\\u6027\\u683c\\u5341\\u5206\\u53d7\\u5927\\u5bb6\\u6b22\\u8fce\\uff0c\\u4f46\\u4f60\\u4e5f\\u5e76\\u4e0d\\u662f\\u65e0\\u5e95\\u7ebf\\u7684\\u5723\\u6bcd\\uff0c\\u53ea\\u662f\\u90a3\\u4e9b\\u201c\\u80ae\\u810f\\u201d\\u7684\\u4eba\\u548c\\u4e8b\\u5df2\\u7ecf\\u88ab\\u4f60\\u5ffd\\u7565\\u4e0d\\u8ba1\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u6709\\u7cbe\\u795e\\u6d01\\u7656\\u5417\\uff1f\\u6211\\u7684\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u657060%\\uff0c\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\\u3002\",\"oldimg\":\"quce\\/151978494475RJy.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a200%br\\u5185\\u5fc3\\u654f\\u611f\\uff0c\\u7231\\u618e\\u5206\\u660e\",\"oldimg\":\"quce\\/1519784930fVxEQ.png\"},{\"threshold\":\"B\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a120%br\\u539f\\u5219\\u6027\\u5f88\\u5f3a\\uff0c\\u8bf4\\u4e00\\u4e0d\\u4e8c\",\"oldimg\":\"quce\\/1519784954gYoE5.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a79%br\\u52c9\\u5f3a\\u53ef\\u4ee5\\u5fcd\\u53d7\",\"oldimg\":\"quce\\/1519784951EdH5w.png\"},{\"threshold\":\"D\",\"title\":\"\\u7cbe\\u795e\\u6d01\\u7656\\u6307\\u6570\\uff1a30%br\\u4e2a\\u6027\\u968f\\u548c\\uff0c\\u5305\\u5bb9\\u4e07\\u7269\",\"oldimg\":\"quce\\/151978494475RJy.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/152024403734jVS.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 14 && _num >= 10) {
		data = data1[1];

	} else if (_num < 19 && _num >= 14) {
		data = data1[2];

	} else if (_num >= 19) {
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

