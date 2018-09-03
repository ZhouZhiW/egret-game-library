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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a1\\u4e2abr\\u60c5\\u6709\\u72ec\\u949f\\u3001\\u4e00\\u5fc3\\u4e00\\u610f\",\"img\":\"quce\\/quiz-5412-JYEPTFDSH5.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u6027\\u683c\\u5185\\u5411\\uff0c\\u817c\\u8146\\u5bb3\\u7f9e\\u7684\\u4eba\\uff0c\\u7231\\u60c5\\u4e0a\\u5f88\\u5c11\\u4e3b\\u52a8\\uff0c\\u5341\\u5206\\u5185\\u655b\\uff0c\\u8fd9\\u8ba9\\u522b\\u4eba\\u5f88\\u96be\\u53d1\\u73b0\\u4f60\\u7684\\u95ea\\u5149\\u70b9\\u3002\\u53ea\\u6709\\u5bf9\\u4f60\\u60c5\\u6709\\u72ec\\u949f\\u7684\\u4eba\\uff0c\\u5728\\u6df1\\u5165\\u7684\\u4e86\\u89e3\\u4e86\\u4f60\\u4e4b\\u540e\\uff0c\\u624d\\u80fd\\u8d70\\u5165\\u4f60\\u7684\\u5185\\u5fc3\\uff0c\\u5e76\\u4e14\\u4e00\\u5fc3\\u4e00\\u610f\\u5730\\u5bf9\\u4f60\\u597d\\u3002\",\"sharetitle\":\"\\u6697\\u604b\\u6211\\u7684\\u4eba\\u7adf\\u7136\\u6709\\uff1a1\\u4e2a\\uff0c\\u5feb\\u6765\\u6d4b\\u6d4b\\u6709\\u591a\\u5c11\\u4eba\\u6697\\u604b\\u4f60\\u5427\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0abr\\u4f17\\u661f\\u6367\\u6708\\u3001\\u5149\\u8292\\u56db\\u5c04\"},{\"threshold\":\"B\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a4\\u30015\\u4e2abr\\u4eba\\u89c1\\u4eba\\u7231\\u3001\\u82b1\\u89c1\\u82b1\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a2\\u30013\\u4e2abr\\u9b45\\u529b\\u56db\\u5c04\\u3001\\u52bf\\u4e0d\\u53ef\\u6321\"},{\"threshold\":\"D\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a1\\u4e2abr\\u60c5\\u6709\\u72ec\\u949f\\u3001\\u4e00\\u5fc3\\u4e00\\u610f\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515477785TQDp0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a2\\u30013\\u4e2abr\\u9b45\\u529b\\u56db\\u5c04\\u3001\\u52bf\\u4e0d\\u53ef\\u6321\",\"img\":\"quce\\/quiz-5412-bPcaR2nHHW.jpg\",\"desc\":\"\\u4f60\\u6c14\\u8d28\\u4f18\\u96c5\\uff0c\\u8c08\\u5410\\u6587\\u96c5\\uff0c\\u54c1\\u5473\\u51fa\\u4f17\\uff0c\\u7231\\u8c08\\u7b11\\u98ce\\u751f\\uff0c\\u8bf4\\u8bdd\\u505a\\u4e8b\\u90fd\\u662f\\u6709\\u6761\\u6709\\u7406\\u3002\\u4f60\\u5728\\u4f60\\u670b\\u53cb\\u5708\\u91cc\\u662f\\u5f88\\u6709\\u9b45\\u529b\\u7684\\uff0c\\u8eab\\u8fb9\\u53ef\\u80fd\\u6709\\u4e24\\u4e09\\u4e2a\\u5f02\\u6027\\u6b63\\u8ddf\\u4f60\\u8054\\u7cfb\\u9891\\u7e41\\uff0c\\u5bf9\\u4f60\\u7279\\u522b\\u5173\\u5fc3\\u548c\\u7167\\u987e\\uff0c\\u8bf4\\u4e0d\\u5b9a\\u5c31\\u662f\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u5662\\uff01\",\"sharetitle\":\"\\u6697\\u604b\\u6211\\u7684\\u4eba\\u7adf\\u7136\\u6709\\uff1a2\\u30013\\u4e2a\\uff0c\\u5feb\\u6765\\u6d4b\\u6d4b\\u6709\\u591a\\u5c11\\u4eba\\u6697\\u604b\\u4f60\\u5427\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0abr\\u4f17\\u661f\\u6367\\u6708\\u3001\\u5149\\u8292\\u56db\\u5c04\"},{\"threshold\":\"B\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a4\\u30015\\u4e2abr\\u4eba\\u89c1\\u4eba\\u7231\\u3001\\u82b1\\u89c1\\u82b1\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a2\\u30013\\u4e2abr\\u9b45\\u529b\\u56db\\u5c04\\u3001\\u52bf\\u4e0d\\u53ef\\u6321\"},{\"threshold\":\"D\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a1\\u4e2abr\\u60c5\\u6709\\u72ec\\u949f\\u3001\\u4e00\\u5fc3\\u4e00\\u610f\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515477785TQDp0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a4\\u30015\\u4e2abr\\u4eba\\u89c1\\u4eba\\u7231\\u3001\\u82b1\\u89c1\\u82b1\\u5f00\",\"img\":\"quce\\/quiz-5412-dfrMMf62xn.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u53ef\\u7231\\u5584\\u826f\\u7684\\u4eba\\uff0c\\u5916\\u5411\\u5f00\\u6717\\uff0c\\u6d3b\\u6cfc\\u597d\\u52a8\\uff0c\\u662f\\u670b\\u53cb\\u773c\\u4e2d\\u7684\\u5f00\\u5fc3\\u679c\\u3002\\u540c\\u65f6\\u5fc3\\u601d\\u5355\\u7eaf\\uff0c\\u9047\\u5230\\u9700\\u8981\\u5e2e\\u52a9\\u7684\\u4eba\\u90fd\\u4f1a\\u6beb\\u4e0d\\u72b9\\u8c6b\\u5730\\u65bd\\u4ee5\\u63f4\\u624b\\uff0c\\u662f\\u4e00\\u4e2a\\u540d\\u526f\\u5176\\u5b9e\\u7684\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u82b1\\u89c1\\u82b1\\u5f00\\u7684\\u5c0f\\u53ef\\u7231\\u3002\",\"sharetitle\":\"\\u6697\\u604b\\u6211\\u7684\\u4eba\\u7adf\\u7136\\u6709\\uff1a4\\u30015\\u4e2a\\uff0c\\u5feb\\u6765\\u6d4b\\u6d4b\\u6709\\u591a\\u5c11\\u4eba\\u6697\\u604b\\u4f60\\u5427\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0abr\\u4f17\\u661f\\u6367\\u6708\\u3001\\u5149\\u8292\\u56db\\u5c04\"},{\"threshold\":\"B\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a4\\u30015\\u4e2abr\\u4eba\\u89c1\\u4eba\\u7231\\u3001\\u82b1\\u89c1\\u82b1\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a2\\u30013\\u4e2abr\\u9b45\\u529b\\u56db\\u5c04\\u3001\\u52bf\\u4e0d\\u53ef\\u6321\"},{\"threshold\":\"D\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a1\\u4e2abr\\u60c5\\u6709\\u72ec\\u949f\\u3001\\u4e00\\u5fc3\\u4e00\\u610f\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515477785TQDp0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0abr\\u4f17\\u661f\\u6367\\u6708\\u3001\\u5149\\u8292\\u56db\\u5c04\",\"img\":\"quce\\/quiz-5412-KEZQKABjGk.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u70ed\\u70c8\\u800c\\u6709\\u6fc0\\u60c5\\u7684\\u4eba\\uff0c\\u4f60\\u723d\\u6717\\u9633\\u5149\\u7684\\u6027\\u683c\\uff0c\\u5f88\\u6709\\u5438\\u5f15\\u529b\\uff0c\\u8ba9\\u5f88\\u591a\\u4eba\\u90fd\\u559c\\u6b22\\u548c\\u4f60\\u76f8\\u5904\\u3002\\u9b45\\u529b\\u56db\\u5c04\\u662f\\u4e0d\\u7528\\u8bf4\\u7684\\uff0c\\u4f60\\u7684\\u5149\\u8292\\u662f\\u65e0\\u6cd5\\u88ab\\u522b\\u4eba\\u76d6\\u4f4f\\u7684\\uff0c\\u518d\\u52a0\\u4e0a\\u4f60\\u51fa\\u4f17\\u7684\\u5916\\u8868\\uff0c\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u80af\\u5b9a\\u662f\\u7edc\\u7ece\\u4e0d\\u7edd\\u7684\\u3002\",\"sharetitle\":\"\\u6697\\u604b\\u6211\\u7684\\u4eba\\u7adf\\u7136\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0a\\uff0c\\u5feb\\u6765\\u6d4b\\u6d4b\\u6709\\u591a\\u5c11\\u4eba\\u6697\\u604b\\u4f60\\u5427\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a5\\u4e2a\\u4ee5\\u4e0abr\\u4f17\\u661f\\u6367\\u6708\\u3001\\u5149\\u8292\\u56db\\u5c04\"},{\"threshold\":\"B\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a4\\u30015\\u4e2abr\\u4eba\\u89c1\\u4eba\\u7231\\u3001\\u82b1\\u89c1\\u82b1\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a2\\u30013\\u4e2abr\\u9b45\\u529b\\u56db\\u5c04\\u3001\\u52bf\\u4e0d\\u53ef\\u6321\"},{\"threshold\":\"D\",\"title\":\"\\u6697\\u604b\\u4f60\\u7684\\u4eba\\u6709\\uff1a1\\u4e2abr\\u60c5\\u6709\\u72ec\\u949f\\u3001\\u4e00\\u5fc3\\u4e00\\u610f\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515477785TQDp0.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 11) {
		data = data1[0];

	} else if (_num < 17 && _num >= 11) {
		data = data1[1];

	} else if (_num < 21 && _num >= 17) {
		data = data1[2];

	} else if (_num >= 21) {
		data = data1[3];
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

