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
		{"content":"{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\",\"img\":\"quce\\/quiz-5536-RZtKbRZmtj.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u6709\\u70b9\\u5b64\\u50fb\\u4e86\\uff0c\\u4f60\\u597d\\u50cf\\u66f4\\u4eab\\u53d7\\u4e00\\u4e2a\\u4eba\\u7684\\u72b6\\u6001\\u3002\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u5728\\u4eba\\u9645\\u4ea4\\u5f80\\u65b9\\u9762\\u5e76\\u4e0d\\u64c5\\u957f\\uff0c\\u603b\\u662f\\u8ba9\\u522b\\u4eba\\u770b\\u4e0d\\u61c2\\u3002\\u5176\\u5b9e\\uff0c\\u4f60\\u5fc3\\u91cc\\u662f\\u5f88\\u671f\\u5f85\\u522b\\u4eba\\u5bf9\\u4f60\\u7684\\u5173\\u6ce8\\uff0c\\u4f46\\u662f\\u5374\\u53c8\\u96be\\u4ee5\\u62c9\\u4e0b\\u9762\\u5b50\\u4e3b\\u52a8\\u7ed3\\u8bc6\\uff0c\\u6700\\u7ec8\\u80fd\\u6210\\u4e3a\\u4f60\\u670b\\u53cb\\u7684\\u4eba\\u5e76\\u4e0d\\u591a\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53d7\\u6b22\\u8fce\\u7684\\u4eba\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u7684\\u7a0b\\u5ea6\\uff1a22\\uff05\\uff0c\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\"},{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515409200ComUm.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\",\"img\":\"quce\\/quiz-5536-wHEdtxd7F8.jpg\",\"desc\":\"\\u4f60\\u5916\\u8868\\u603b\\u7ed9\\u4eba\\u4e00\\u79cd\\u6709\\u70b9\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\\u7684\\u6837\\u5b50\\uff0c\\u6216\\u8bb8\\u4e0e\\u4f60\\u6210\\u957f\\u4e2d\\u6240\\u7ecf\\u5386\\u7684\\u79cd\\u79cd\\u4e8b\\u8ff9\\u6709\\u5173\\u5427\\uff0c\\u4f60\\u4e60\\u60ef\\u4e8e\\u7528\\u51b7\\u9177\\u7684\\u4e00\\u9762\\u6b66\\u88c5\\u81ea\\u5df1\\uff0c\\u8fd9\\u662f\\u4e00\\u79cd\\u81ea\\u6211\\u4fdd\\u62a4\\u7684\\u624b\\u6bb5\\u3002\\u7565\\u5e26\\u795e\\u79d8\\u611f\\u7684\\u4e2a\\u6027\\u53cd\\u800c\\u4f1a\\u5438\\u5f15\\u4e00\\u90e8\\u5206\\u4eba\\u60f3\\u8981\\u53bb\\u63a2\\u7d22\\u4f60\\uff0c\\u800c\\u4e14\\u5728\\u76f8\\u5904\\u8fc7\\u540e\\u5bf9\\u65b9\\u4e5f\\u4f1a\\u53d1\\u73b0\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u771f\\u8bda\\u7684\\u597d\\u670b\\u53cb\\u5462\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53d7\\u6b22\\u8fce\\u7684\\u4eba\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u7684\\u7a0b\\u5ea6\\uff1a50\\uff05\\uff0c\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\"},{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515409200ComUm.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\",\"img\":\"quce\\/quiz-5536-cKw4bBAaDF.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u6bd4\\u8f83\\u968f\\u6027\\u7684\\u4eba\\uff0c\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u5728\\u4e3a\\u4eba\\u5904\\u4e8b\\u65b9\\u9762\\u5e76\\u4e0d\\u4f1a\\u6709\\u592a\\u591a\\u7684\\u5f3a\\u6c42\\uff0c\\u4f60\\u8ffd\\u6c42\\u7684\\u662f\\u987a\\u5176\\u81ea\\u7136\\uff0c\\u4e00\\u5207\\u968f\\u7f18\\u3002\\u8fd9\\u79cd\\u968f\\u6027\\u7684\\u6001\\u5ea6\\u4e5f\\u603b\\u662f\\u4f1a\\u5438\\u5f15\\u5230\\u4e0d\\u5c11\\u4eba\\u60f3\\u8981\\u548c\\u4f60\\u76f8\\u8bc6\\u4ea4\\u5f80\\u5427\\uff0c\\u800c\\u4f60\\u5076\\u5c14\\u8868\\u73b0\\u51fa\\u7684\\u5b69\\u5b50\\u6c14\\uff0c\\u662f\\u4f60\\u4e2a\\u6027\\u4e2d\\u6700\\u7eaf\\u771f\\u7684\\u4e00\\u90e8\\u5206\\uff0c\\u5927\\u5bb6\\u4e5f\\u5f88\\u4e50\\u4e8e\\u63a5\\u53d7\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53d7\\u6b22\\u8fce\\u7684\\u4eba\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u7684\\u7a0b\\u5ea6\\uff1a99.99\\uff05\\uff0c\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\"},{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515409200ComUm.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\",\"img\":\"quce\\/quiz-5536-t4GThpk7Bp.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u603b\\u7ed9\\u4eba\\u4e00\\u79cd\\u5927\\u5927\\u54a7\\u54a7\\u65e0\\u70e6\\u607c\\u7684\\u6837\\u5b50\\uff0c\\u800c\\u4f60\\u7684\\u8a00\\u884c\\u4e3e\\u6b62\\u53c8\\u603b\\u662f\\u4f1a\\u5728\\u65e0\\u610f\\u95f4\\u6fc0\\u53d1\\u8d77\\u4eba\\u5185\\u5fc3\\u6df1\\u5904\\u6700\\u67d4\\u8f6f\\u7684\\u5730\\u65b9\\uff0c\\u8ba9\\u4eba\\u770b\\u5230\\u4f60\\u5c31\\u60f3\\u8981\\u548c\\u4f60\\u5728\\u4e00\\u8d77\\uff0c\\u56e0\\u4e3a\\u548c\\u4f60\\u5728\\u4e00\\u8d77\\u65f6\\u80fd\\u591f\\u4eab\\u53d7\\u90a3\\u79cd\\u65e2\\u8212\\u670d\\u53c8\\u81ea\\u7136\\u7684\\u76f8\\u5904\\u611f\\u89c9\\u5427\\uff0c\\u6240\\u4ee5\\u4eba\\u6c14\\u4e5f\\u662f\\u4e00\\u76f4\\u5c45\\u9ad8\\u4e0d\\u4e0b\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53d7\\u6b22\\u8fce\\u7684\\u4eba\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u7684\\u7a0b\\u5ea6\\uff1a180\\uff05\\uff0c\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\"},{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515409200ComUm.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\",\"img\":\"quce\\/quiz-5536-EnsjhcYnH6.jpg\",\"desc\":\"\\u54c7\\u54e6\\uff0c\\u4f60\\u7684\\u4eba\\u6c14\\u5f88\\u9ad8\\u5462\\uff0c\\u6211\\u60f3\\u8fd9\\u4e00\\u5b9a\\u662f\\u8ddf\\u4f60\\u7684\\u597d\\u6027\\u683c\\u6709\\u5173\\u7cfb\\u5427\\u3002\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u70ed\\u60c5\\u5f00\\u6717\\u53c8\\u5927\\u65b9\\uff0c \\u4eba\\u7f18\\u4e00\\u76f4\\u5f88\\u4e0d\\u9519\\uff0c\\u4e5f\\u7ed3\\u8bc6\\u4e86\\u4e0d\\u5c11\\u4ea4\\u5fc3\\u7684\\u597d\\u53cb\\uff0c\\u6bd5\\u7adf\\u50cf\\u4f60\\u8fd9\\u6837\\u7387\\u771f\\u53ef\\u7231\\u4e0d\\u505a\\u4f5c\\u7684\\u670b\\u53cb\\uff0c\\u8c01\\u53c8\\u4f1a\\u4e0d\\u559c\\u6b22\\u5462\\uff1f\",\"sharetitle\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53d7\\u6b22\\u8fce\\u7684\\u4eba\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u7684\\u7a0b\\u5ea6\\uff1a300\\uff05\\uff0c\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a300\\uff05br\\u6c5f\\u6e56\\u5230\\u5904\\u662f\\u670b\\u53cb\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a180\\uff05br\\u4eba\\u6c14\\u5c45\\u9ad8\\u4e0d\\u4e0b\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a99.99\\uff05br\\u6027\\u683c\\u68d2\\u4eba\\u7f18\\u597d\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a50\\uff05br\\u9ad8\\u51b7\\u96be\\u4ee5\\u4eb2\\u8fd1\"},{\"threshold\":\"E\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u7a0b\\u5ea6\\uff1a22\\uff05br\\u592a\\u8fc7\\u5b64\\u50fb\\u5c01\\u95ed\\u81ea\\u6211\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515409200ComUm.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 13) {
		data = data1[0];

	} else if (_num < 17 && _num >= 13) {
		data = data1[1];

	} else if (_num < 21 && _num >= 17) {
		data = data1[2];

	} else if (_num < 24 &&_num >= 21) {
		data = data1[3];
	}else if (_num >= 24) {
		data = data1[4];
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

