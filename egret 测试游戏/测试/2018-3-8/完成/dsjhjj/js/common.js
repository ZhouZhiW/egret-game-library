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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u6d3b\\u5230\\u5168\\u5267\\u7ec8br\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\",\"img\":\"quce\\/quiz-5599-kwDt5ZRY6d.jpg\",\"desc\":\"\\u606d\\u559c\\u4f60\\uff0c\\u4f60\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u7ec8\\u6781\\u5927boss\\uff01\\u4f60\\u529e\\u4e8b\\u679c\\u65ad\\uff0c\\u5fc3\\u601d\\u7f1c\\u5bc6\\uff0c\\u53ea\\u5728\\u4e4e\\u7ed3\\u679c\\uff0c\\u4e0d\\u5728\\u4e4e\\u8fc7\\u7a0b\\u3002\\u4f60\\u5584\\u4e8e\\u8868\\u73b0\\u4e5f\\u52c7\\u4e8e\\u8868\\u73b0\\u81ea\\u5df1\\u6700\\u7f8e\\u7684\\u4e00\\u9762\\uff0c\\u6709\\u5f88\\u5f3a\\u7684\\u793e\\u4f1a\\u9002\\u5e94\\u80fd\\u529b\\u3002\\u987a\\u6211\\u8005\\u660c\\uff0c\\u9006\\u6211\\u8005\\u4ea1\\uff0c\\u662f\\u4f60\\u7684\\u7279\\u70b9\\u3002\\u4f46\\u5b64\\u72ec\\u6c42\\u8d25\\uff0c\\u5185\\u5fc3\\u5e38\\u5e38\\u611f\\u5230\\u5bc2\\u5bde\\u548c\\u5b64\\u72ec\\u3002\",\"sharetitle\":\"\\u6211\\u5728\\u7535\\u89c6\\u5267\\u91cc\\u6700\\u591a\\u6d3b20\\u96c6\\uff0c\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\\uff01\\u6765\\u6d4b\\u6d4b\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6d3b\\u5230\\u5168\\u5267\\u7ec8br\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\"},{\"threshold\":\"B\",\"title\":\"\\u6700\\u591a\\u6d3b20\\u96c6br\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u91cd\\u8981\\u89d2\\u8272\"},{\"threshold\":\"C\",\"title\":\"\\u6700\\u591a\\u6d3b7\\u96c6br\\u6253\\u9171\\u6cb9\\u7684\\u666e\\u901a\\u914d\\u89d2\"},{\"threshold\":\"D\",\"title\":\"\\u6700\\u591a\\u6d3b2\\u96c6br\\u6700\\u65e9\\u88ab\\u5e72\\u6389\\u7684\\u70ae\\u7070\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520560800qvBmJ.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u6700\\u591a\\u6d3b20\\u96c6br\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u91cd\\u8981\\u89d2\\u8272\",\"img\":\"quce\\/quiz-5599-PFHRWmWH6e.jpg\",\"desc\":\"\\u54ce\\u5466\\uff0c\\u4e0d\\u9519\\u54e6\\uff0c\\u4f60\\u662f\\u620f\\u4efd\\u86ee\\u591a\\u7684\\u53cd\\u6d3e\\u4e8c\\u53f7\\uff01\\u4f60\\u8ffd\\u6c42\\u6210\\u529f\\uff0c\\u559c\\u6b22\\u89c2\\u5bdf\\uff0c\\u4e0d\\u5c51\\u4e0e\\u5f31\\u8005\\u4e89\\u6597\\uff0c\\u6709\\u65f6\\u6709\\u70b9\\u4e0d\\u8fd1\\u4eba\\u60c5\\u3002\\u4f60\\u7231\\u8bc9\\u8bf4\\u81ea\\u5df1\\u6210\\u5c31\\uff0c\\u9003\\u907f\\u5931\\u8d25\\u3002\\u4f60\\u6709\\u70b9\\u81ea\\u604b\\u3001\\u81ea\\u6211\\u81a8\\u80c0\\uff0c\\u5bb3\\u6015\\u88ab\\u4eba\\u770b\\u89c1\\u81ea\\u5df1\\u7684\\u771f\\u9762\\u76ee\\uff0c\\u4eb2\\u5bc6\\u5173\\u7cfb\\u4e0d\\u5bb9\\u6613\\u5efa\\u7acb\\u3002\",\"sharetitle\":\"\\u6211\\u5728\\u7535\\u89c6\\u5267\\u91cc\\u6700\\u591a\\u6d3b15\\u96c6\\uff0c\\u662f\\u620f\\u4efd\\u86ee\\u591a\\u7684\\u53cd\\u6d3e\\u4e8c\\u53f7\\uff01\\u6765\\u6d4b\\u6d4b\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6d3b\\u5230\\u5168\\u5267\\u7ec8br\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\"},{\"threshold\":\"B\",\"title\":\"\\u6700\\u591a\\u6d3b20\\u96c6br\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u91cd\\u8981\\u89d2\\u8272\"},{\"threshold\":\"C\",\"title\":\"\\u6700\\u591a\\u6d3b7\\u96c6br\\u6253\\u9171\\u6cb9\\u7684\\u666e\\u901a\\u914d\\u89d2\"},{\"threshold\":\"D\",\"title\":\"\\u6700\\u591a\\u6d3b2\\u96c6br\\u6700\\u65e9\\u88ab\\u5e72\\u6389\\u7684\\u70ae\\u7070\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520560800qvBmJ.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u6700\\u591a\\u6d3b7\\u96c6br\\u6253\\u9171\\u6cb9\\u7684\\u666e\\u901a\\u914d\\u89d2\",\"img\":\"quce\\/quiz-5599-2RF3xJQS8J.jpg\",\"desc\":\"\\u54ce\\uff0c\\u4f60\\u53ea\\u662f\\u4e00\\u4e2a\\u914d\\u89d2\\uff01\\u4e3a\\u4e86\\u886c\\u6258\\u4e3b\\u89d2\\u7684\\u7f8e\\u597d\\u800c\\u51fa\\u573a\\u7684\\uff0c\\u7eaf\\u5c5e\\u6253\\u9171\\u6cb9\\uff0c\\u6beb\\u65e0\\u7279\\u8272\\u3002\\u4f60\\u7cbe\\u529b\\u5145\\u6c9b\\uff0c\\u559c\\u6b22\\u5feb\\u4e50\\uff0c\\u603b\\u662f\\u6beb\\u65e0\\u4fdd\\u7559\\u5730\\u7ed9\\u4e88\\u522b\\u4eba\\u5e2e\\u52a9\\uff0c\\u4e0d\\u6c42\\u7269\\u8d28\\u56de\\u62a5\\u3002\\u4f60\\u4e0d\\u53c2\\u4e0e\\u4e89\\u6597\\uff0c\\u559c\\u6b22\\u4fdd\\u6301\\u4e2d\\u7acb\\uff0c\\u6ca1\\u6709\\u5b58\\u5728\\u611f\\uff0c\\u5bb9\\u6613\\u88ab\\u4eba\\u5ffd\\u7565\\u3002\",\"sharetitle\":\"\\u6211\\u5728\\u7535\\u89c6\\u5267\\u91cc\\u6700\\u591a\\u6d3b7\\u96c6\\uff0c\\u53ea\\u662f\\u4e00\\u4e2a\\u914d\\u89d2\\uff01\\u6765\\u6d4b\\u6d4b\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6d3b\\u5230\\u5168\\u5267\\u7ec8br\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\"},{\"threshold\":\"B\",\"title\":\"\\u6700\\u591a\\u6d3b20\\u96c6br\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u91cd\\u8981\\u89d2\\u8272\"},{\"threshold\":\"C\",\"title\":\"\\u6700\\u591a\\u6d3b7\\u96c6br\\u6253\\u9171\\u6cb9\\u7684\\u666e\\u901a\\u914d\\u89d2\"},{\"threshold\":\"D\",\"title\":\"\\u6700\\u591a\\u6d3b2\\u96c6br\\u6700\\u65e9\\u88ab\\u5e72\\u6389\\u7684\\u70ae\\u7070\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520560800qvBmJ.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u6700\\u591a\\u6d3b2\\u96c6br\\u6700\\u65e9\\u88ab\\u5e72\\u6389\\u7684\\u70ae\\u7070\",\"img\":\"quce\\/quiz-5599-mKtMiemcdp.jpg\",\"desc\":\"\\u5f88\\u9057\\u61be\\uff0c\\u4f60\\u521a\\u51fa\\u573a\\u5c31\\u6302\\u4e86\\uff0c\\u59a5\\u59a5\\u7684\\u70ae\\u7070\\uff01\\u4f60\\u8868\\u60c5\\u4e30\\u5bcc\\uff0c\\u5bcc\\u6709\\u671d\\u6c14\\uff0c\\u4f46\\u60c5\\u7eea\\u8106\\u5f31\\uff0c\\u754f\\u7f29\\u3001\\u987a\\u4ece\\uff0c\\u4e0d\\u61c2\\u8fc2\\u56de\\u3002\\u6613\\u6012\\u800c\\u96be\\u4ee5\\u81ea\\u5236\\uff0c\\u6613\\u968f\\u6ce2\\u9010\\u6d41\\uff0c\\u8f7b\\u7387\\u4e0d\\u8e0f\\u5b9e\\uff0c\\u7f3a\\u4e4f\\u8010\\u529b\\u4e0e\\u6bc5\\u529b\\uff0c\\u4e3b\\u89d2\\u4e00\\u6839\\u624b\\u6307\\u5934\\u5c31\\u80fd\\u6441\\u6b7b\\u4f60\\u4e86\\u3002\",\"sharetitle\":\"\\u6211\\u5728\\u7535\\u89c6\\u5267\\u91cc\\u6700\\u591a\\u6d3b2\\u96c6\\uff0c\\u59a5\\u59a5\\u7684\\u8def\\u4eba\\u7532\\uff01\\u6765\\u6d4b\\u6d4b\\u4f60\\u80fd\\u6d3b\\u51e0\\u96c6\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6d3b\\u5230\\u5168\\u5267\\u7ec8br\\u662f\\u6df1\\u85cf\\u4e0d\\u9732\\u7684\\u5927boss\"},{\"threshold\":\"B\",\"title\":\"\\u6700\\u591a\\u6d3b20\\u96c6br\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u91cd\\u8981\\u89d2\\u8272\"},{\"threshold\":\"C\",\"title\":\"\\u6700\\u591a\\u6d3b7\\u96c6br\\u6253\\u9171\\u6cb9\\u7684\\u666e\\u901a\\u914d\\u89d2\"},{\"threshold\":\"D\",\"title\":\"\\u6700\\u591a\\u6d3b2\\u96c6br\\u6700\\u65e9\\u88ab\\u5e72\\u6389\\u7684\\u70ae\\u7070\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520560800qvBmJ.png\",\"account\":1003}"},
	];

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 12) {
		data = data1[3];
	} else if (_num < 16 && _num >= 12) {
		data = data1[2];
	} else if (_num < 20 && _num >= 16) {
		data = data1[1];
	} else if (_num >= 20) {
		data = data1[0];
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

