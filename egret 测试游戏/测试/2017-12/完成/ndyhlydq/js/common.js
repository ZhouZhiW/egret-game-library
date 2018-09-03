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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a200%br\\u6240\\u6709\\u4eba\\u90fd\\u88ab\\u4f60\\u4fd8\\u864f\",\"img\":\"quce\\/quiz-5609-EiXbiCfxwF.jpg\",\"desc\":\"\\u5728\\u8fd9\\u4e2a\\u89c6\\u89c9\\u7b2c\\u4e00\\u7684\\u5e74\\u4ee3\\uff0c\\u8981\\u60f3\\u83b7\\u5f97\\u66f4\\u591a\\u7684\\u5173\\u6ce8\\uff0c\\u4eae\\u4e3d\\u6e29\\u5a49\\u7684\\u5916\\u8868\\u80fd\\u8ba9\\u4f60\\u7b2c\\u4e00\\u65f6\\u95f4\\u8d62\\u5f97\\u66f4\\u591a\\u7684\\u4eba\\u7f18\\u3002\\u5929\\u751f\\u4f1a\\u6253\\u626e\\u7684\\u4f60\\uff0c\\u603b\\u662f\\u5149\\u9c9c\\u4eae\\u4e3d\\u5730\\u51fa\\u73b0\\u5728\\u5927\\u4f17\\u9762\\u524d\\u3002\\u52a0\\u4e0a\\u4f60\\u662f\\u6027\\u60c5\\u4e2d\\u4eba\\u3001\\u813e\\u6c14\\u6e29\\u548c\\uff0c\\u4f7f\\u4f60\\u8eab\\u8fb9\\u6839\\u672c\\u4e0d\\u7f3a\\u670b\\u53cb\\u76f8\\u4f34\\uff0c\\u540c\\u65f6\\u8fd8\\u6709\\u5f88\\u591a\\u5f02\\u6027\\u975e\\u5e38\\u4e2d\\u610f\\u4f60\\u5462\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u8bf1\\u60d1\\u6307\\u6570\\u9ad8\\u8fbe200%\\uff0c\\u6240\\u6709\\u4eba\\u90fd\\u662f\\u6211\\u7684\\u4fd8\\u864f\\uff01\\u6d4b\\u6d4b\\u4f60\\u7684\\u8bf1\\u60d1\\u529b\\u6709\\u591a\\u5f3a\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a200%br\\u6240\\u6709\\u4eba\\u90fd\\u88ab\\u4f60\\u4fd8\\u864f\"},{\"threshold\":\"B\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a100%br\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u4f60\\u7684\\u9b45\\u529b\"},{\"threshold\":\"C\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a80%br\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\"},{\"threshold\":\"D\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a50%br\\u61f5\\u61c2\\u7684\\u7eaf\\u826f\\u5c11\\u5973\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611600jlTla.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a100%br\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u4f60\\u7684\\u9b45\\u529b\",\"img\":\"quce\\/quiz-5609-8XrSnyiHeC.jpg\",\"desc\":\"\\u4f60\\u7684\\u8bf1\\u60d1\\u529b\\u662f\\u4e0d\\u7531\\u81ea\\u4e3b\\u5c31\\u6563\\u53d1\\u51fa\\u6765\\u7684\\u3002\\u4f60\\u5728\\u4e0e\\u5f02\\u6027\\u4ea4\\u5f80\\u7684\\u65f6\\u5019\\u61c2\\u5f97\\u4fdd\\u6301\\u4e00\\u5b9a\\u7684\\u8ddd\\u79bb\\uff0c\\u6709\\u90a3\\u4e48\\u4e00\\u70b9\\u795e\\u79d8\\u611f\\uff0c\\u56e0\\u6b64\\u5f88\\u5bb9\\u6613\\u5f15\\u8d77\\u5f02\\u6027\\u7684\\u597d\\u5947\\u5fc3\\uff0c\\u4e5f\\u5c31\\u66f4\\u6709\\u5438\\u5f15\\u529b\\u4e86\\u3002\\u800c\\u4f60\\u534a\\u63a8\\u534a\\u5c31\\uff0c\\u6b32\\u62d2\\u8fd8\\u4f11\\u7684\\u611f\\u89c9\\u8d8a\\u53d1\\u5730\\u80fd\\u5f15\\u8d77\\u5f02\\u6027\\u60f3\\u9760\\u8fd1\\u7684\\u6b32\\u671b\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u8bf1\\u60d1\\u6307\\u6570\\u9ad8\\u8fbe100%\\uff0c\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u6211\\u7684\\u9b45\\u529b\\uff01\\u6d4b\\u6d4b\\u4f60\\u7684\\u8bf1\\u60d1\\u529b\\u6709\\u591a\\u5f3a\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a200%br\\u6240\\u6709\\u4eba\\u90fd\\u88ab\\u4f60\\u4fd8\\u864f\"},{\"threshold\":\"B\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a100%br\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u4f60\\u7684\\u9b45\\u529b\"},{\"threshold\":\"C\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a80%br\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\"},{\"threshold\":\"D\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a50%br\\u61f5\\u61c2\\u7684\\u7eaf\\u826f\\u5c11\\u5973\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611600jlTla.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a80%br\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\",\"img\":\"quce\\/quiz-5609-zA3AjbHQEs.jpg\",\"desc\":\"\\u4f60\\u5728\\u5bf9\\u5f85\\u5f02\\u6027\\u5173\\u7cfb\\u4e0a\\u8868\\u73b0\\u5f97\\u8c28\\u614e\\u7ec6\\u5fc3\\uff0c\\u6240\\u4ee5\\u8ddf\\u4f60\\u505a\\u670b\\u53cb\\u5f88\\u653e\\u5fc3\\uff01\\u8d34\\u5fc3\\u7684\\u4f60\\u5f88\\u591a\\u65f6\\u5019\\u90fd\\u4f1a\\u4e3a\\u522b\\u4eba\\u8003\\u8651\\uff0c\\u7167\\u987e\\u522b\\u4eba\\u7684\\u60f3\\u6cd5\\uff0c\\u5584\\u89e3\\u4eba\\u610f\\u7684\\u4f60\\u5728\\u957f\\u65f6\\u95f4\\u63a5\\u89e6\\u4e4b\\u540e\\u4f1a\\u5f97\\u5230\\u5f02\\u6027\\u7279\\u522b\\u7684\\u9752\\u7750\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u8bf1\\u60d1\\u6307\\u6570\\u9ad8\\u8fbe80%\\uff0c\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\\uff01\\u6d4b\\u6d4b\\u4f60\\u7684\\u8bf1\\u60d1\\u529b\\u6709\\u591a\\u5f3a\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a200%br\\u6240\\u6709\\u4eba\\u90fd\\u88ab\\u4f60\\u4fd8\\u864f\"},{\"threshold\":\"B\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a100%br\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u4f60\\u7684\\u9b45\\u529b\"},{\"threshold\":\"C\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a80%br\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\"},{\"threshold\":\"D\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a50%br\\u61f5\\u61c2\\u7684\\u7eaf\\u826f\\u5c11\\u5973\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611600jlTla.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a50%br\\u61f5\\u61c2\\u7684\\u7eaf\\u826f\\u5c11\\u5973\",\"img\":\"quce\\/quiz-5609-8dZ6ai7CR3.jpg\",\"desc\":\"\\u4f60\\u4e0d\\u7ba1\\u4ece\\u6027\\u683c\\u8fd8\\u662f\\u5916\\u8868\\u4e0a\\u6765\\u770b\\u90fd\\u662f\\u4e00\\u80a1\\u7eaf\\u826f\\u7684\\u611f\\u89c9\\uff0c\\u8fd9\\u6837\\u7684\\u611f\\u89c9\\u5e76\\u4e0d\\u4f1a\\u4f7f\\u5f02\\u6027\\u5bf9\\u4f60\\u6709\\u8fc7\\u591a\\u7684\\u60f3\\u6cd5\\uff0c\\u4ed6\\u4eec\\u4e00\\u822c\\u4f1a\\u628a\\u4f60\\u5f53\\u4f5c\\u5c0f\\u5b69\\u5b50\\u770b\\u5f85\\uff01\\u5982\\u679c\\u60f3\\u63d0\\u9ad8\\u8bf1\\u60d1\\u529b\\uff0c\\u4ece\\u7a7f\\u7740\\u3001\\u4e3e\\u6b62\\u7b49\\u65b9\\u9762\\u5171\\u540c\\u8c03\\u6574\\u4f1a\\u6709\\u5947\\u6548\\u54e6~\",\"sharetitle\":\"\\u6211\\u7684\\u8bf1\\u60d1\\u6307\\u6570\\u662f50%\\uff0c\\u5c5e\\u4e8e\\u7eaf\\u826f\\u5c11\\u5973\\uff01\\u6d4b\\u6d4b\\u4f60\\u7684\\u8bf1\\u60d1\\u529b\\u6709\\u591a\\u5f3a\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a200%br\\u6240\\u6709\\u4eba\\u90fd\\u88ab\\u4f60\\u4fd8\\u864f\"},{\"threshold\":\"B\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a100%br\\u6ca1\\u4eba\\u80fd\\u62b5\\u6297\\u4f60\\u7684\\u9b45\\u529b\"},{\"threshold\":\"C\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a80%br\\u7279\\u522b\\u80fd\\u5f97\\u5230\\u5f02\\u6027\\u7684\\u9752\\u7750\"},{\"threshold\":\"D\",\"title\":\"\\u8bf1\\u60d1\\u6307\\u6570\\uff1a50%br\\u61f5\\u61c2\\u7684\\u7eaf\\u826f\\u5c11\\u5973\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611600jlTla.png\",\"account\":1003}"},
	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 14) {
		data = data1[3];

	} else if (_num < 20 && _num >= 14) {
		data = data1[2];

	} else if (_num < 28 && _num >= 20) {
		data = data1[1];

	} else if (_num >= 28) {
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

