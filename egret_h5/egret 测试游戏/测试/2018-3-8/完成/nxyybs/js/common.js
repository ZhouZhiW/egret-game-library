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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05br\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"img\":\"quce\\/quiz-6015-nDfEarJDEN.png\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u4e2d\\u6709\\u4e00\\u4e2a\\u5f88\\u5927\\u7684\\u6709\\u70b9\\uff0c\\u5c31\\u662f\\u6293\\u4f4f\\u73b0\\u4e16\\u7684\\u611f\\u53d7\\uff0c\\u4e0d\\u4e3a\\u8fc7\\u53bb\\u7684\\u70e6\\u607c\\u800c\\u7ea0\\u7ed3\\uff0c\\u4e07\\u4e8b\\u5728\\u4f60\\u8fd9\\u513f\\u9047\\u5230\\u4e86\\u5c31\\u89e3\\u51b3\\uff0c\\u8fc7\\u53bb\\u4e86\\u5c31\\u8fc7\\u53bb\\uff0c\\u4f60\\u4f1a\\u60f3\\u65b9\\u8bbe\\u6cd5\\u8ba9\\u81ea\\u5df1\\u8df3\\u8131\\u75db\\u82e6\\u7684\\u7262\\u7b3c\\uff0c\\u6709\\u65f6\\u5b81\\u53ef\\u9009\\u62e9\\u628a\\u60c5\\u7eea\\u8868\\u9732\\uff0c\\u4e5f\\u4e0d\\u4f1a\\u5168\\u90e8\\u538b\\u5728\\u5fc3\\u5934\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u538b\\u6291\\u4e86\\u591a\\u5c11\\u60b2\\u4f24\\uff1f\\u6211\\u5185\\u5fc3\\u7684\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05\\uff0c\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"oldimg\":\"quce\\/quiz-6015-nDfEarJDEN.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05br\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u575a\\u5f3a\",\"oldimg\":\"quce\\/quiz-6015-TtrbGJkfZr.png\"},{\"threshold\":\"B\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05br\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"oldimg\":\"quce\\/quiz-6015-rBJKcnWyMW.png\"},{\"threshold\":\"C\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\\u60c5\\u7eea\\u826f\\u597d\\uff0c\\u5b66\\u4f1a\\u81ea\\u6211\\u6d88\\u5316\",\"oldimg\":\"quce\\/quiz-6015-aK3WtH8QWX.png\"},{\"threshold\":\"D\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05br\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"oldimg\":\"quce\\/quiz-6015-nDfEarJDEN.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520575242bYwm1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\\u60c5\\u7eea\\u826f\\u597d\\uff0c\\u5b66\\u4f1a\\u81ea\\u6211\\u6d88\\u5316\",\"img\":\"quce\\/quiz-6015-aK3WtH8QWX.png\",\"desc\":\"\\u4f60\\u7684\\u5fc3\\u7406\\u5e74\\u9f84\\u53ef\\u4e0d\\u662f\\u90a3\\u79cd\\u60f3\\u54ed\\u5c31\\u54ed\\uff0c\\u60f3\\u7b11\\u5c31\\u7b11\\u7684\\u5341\\u591a\\u5c81\\u5c0f\\u5b69\\uff0c\\u80fd\\u81ea\\u5df1\\u6d88\\u5316\\u7684\\u60c5\\u7eea\\u4f60\\u4f1a\\u5f88\\u5feb\\u627e\\u5230\\u51fa\\u53e3\\uff0c\\u4e0d\\u80fd\\u89e3\\u51b3\\u7684\\u95ee\\u9898\\u4f60\\u4e5f\\u80fd\\u53ca\\u65f6\\u627e\\u5230\\u53ef\\u4ee5\\u6258\\u4ed8\\u7684\\u4eba\\uff0c\\u5fe7\\u4f24\\u4e5f\\u8bb8\\u80fd\\u56f0\\u6270\\u4f60\\u4e00\\u65f6\\uff0c\\u4f46\\u5f7b\\u5e95\\u51fb\\u57ae\\u4f60\\u57fa\\u672c\\u662f\\u4e0d\\u53ef\\u80fd\\u7684\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u538b\\u6291\\u4e86\\u591a\\u5c11\\u60b2\\u4f24\\uff1f\\u6211\\u5185\\u5fc3\\u7684\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\",\"oldimg\":\"quce\\/quiz-6015-aK3WtH8QWX.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05br\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u575a\\u5f3a\",\"oldimg\":\"quce\\/quiz-6015-TtrbGJkfZr.png\"},{\"threshold\":\"B\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05br\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"oldimg\":\"quce\\/quiz-6015-rBJKcnWyMW.png\"},{\"threshold\":\"C\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\\u60c5\\u7eea\\u826f\\u597d\\uff0c\\u5b66\\u4f1a\\u81ea\\u6211\\u6d88\\u5316\",\"oldimg\":\"quce\\/quiz-6015-aK3WtH8QWX.png\"},{\"threshold\":\"D\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05br\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"oldimg\":\"quce\\/quiz-6015-nDfEarJDEN.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520575242bYwm1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05br\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"img\":\"quce\\/quiz-6015-rBJKcnWyMW.png\",\"desc\":\"\\u4f60\\u6bd4\\u522b\\u4eba\\u66f4\\u591a\\u51e0\\u5206\\u654f\\u611f\\u7ec6\\u817b\\uff0c\\u4f60\\u662f\\u4e0d\\u80af\\u653e\\u4efb\\u81ea\\u5df1\\u7684\\u4eba\\uff0c\\u5bf9\\u81ea\\u5df1\\u8f83\\u9ad8\\u7684\\u8981\\u6c42\\u4f7f\\u5f97\\u4f60\\u7684\\u574f\\u60c5\\u7eea\\u53d1\\u6cc4\\u7684\\u51fa\\u53e3\\u6bd4\\u8f83\\u5c11\\uff0c\\u65e0\\u8bba\\u9762\\u5bf9\\u591a\\u5927\\u7684\\u56f0\\u96be\\u548c\\u610f\\u5916\\uff0c\\u4f60\\u4f1a\\u6c38\\u8fdc\\u4fdd\\u7559\\u4e00\\u4efd\\u6700\\u57fa\\u672c\\u7684\\u51b7\\u9759\\uff0c\\u4f60\\u662f\\u80af\\u627f\\u62c5\\uff0c\\u6709\\u8d23\\u4efb\\u611f\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u538b\\u6291\\u4e86\\u591a\\u5c11\\u60b2\\u4f24\\uff1f\\u6211\\u5185\\u5fc3\\u7684\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05\\uff0c\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"oldimg\":\"quce\\/quiz-6015-rBJKcnWyMW.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05br\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u575a\\u5f3a\",\"oldimg\":\"quce\\/quiz-6015-TtrbGJkfZr.png\"},{\"threshold\":\"B\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05br\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"oldimg\":\"quce\\/quiz-6015-rBJKcnWyMW.png\"},{\"threshold\":\"C\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\\u60c5\\u7eea\\u826f\\u597d\\uff0c\\u5b66\\u4f1a\\u81ea\\u6211\\u6d88\\u5316\",\"oldimg\":\"quce\\/quiz-6015-aK3WtH8QWX.png\"},{\"threshold\":\"D\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05br\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"oldimg\":\"quce\\/quiz-6015-nDfEarJDEN.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520575242bYwm1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05br\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u575a\\u5f3a\",\"img\":\"quce\\/quiz-6015-TtrbGJkfZr.png\",\"desc\":\"\\u4f60\\u975e\\u5e38\\u5584\\u4e8e\\u9690\\u85cf\\u81ea\\u5df1\\u5185\\u5fc3\\u7684\\u771f\\u5b9e\\u60c5\\u611f\\uff0c\\u4e0d\\u613f\\u610f\\u56e0\\u81ea\\u5df1\\u7684\\u8106\\u5f31\\u5f71\\u54cd\\u5468\\u56f4\\u4eba\\u7684\\u60c5\\u7eea\\uff0c\\u4f60\\u4e0d\\u4f1a\\u968f\\u4fbf\\u76f8\\u4fe1\\u4ec0\\u4e48\\u4eba\\uff0c\\u66f4\\u591a\\u65f6\\u5019\\u4f60\\u66f4\\u76f8\\u4fe1\\u81ea\\u5df1\\u7684\\u5224\\u65ad\\uff0c\\u4f60\\u8fc7\\u4e8e\\u72ec\\u7acb\\u575a\\u5f3a\\u7684\\u4e2a\\u6027\\u4f7f\\u5f97\\u5f88\\u591a\\u60b2\\u4f24\\u7684\\u60c5\\u7eea\\u79ef\\u6512\\u5728\\u4f60\\u7684\\u5185\\u5fc3\\u6df1\\u5904\\uff0c\\u957f\\u4e45\\u96be\\u4ee5\\u91ca\\u7136\\u3002\",\"sharetitle\":\"\\u4f60\\u5185\\u5fc3\\u538b\\u6291\\u4e86\\u591a\\u5c11\\u60b2\\u4f24\\uff1f\\u6211\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05\\uff0c\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u88c5\\u575a\\u5f3a\",\"oldimg\":\"quce\\/quiz-6015-TtrbGJkfZr.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a99\\uff05br\\u4e0d\\u88ab\\u770b\\u900f\\u7684\\u4f2a\\u575a\\u5f3a\",\"oldimg\":\"quce\\/quiz-6015-TtrbGJkfZr.png\"},{\"threshold\":\"B\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a88\\uff05br\\u4e3a\\u4eba\\u611f\\u6027\\uff0c\\u654f\\u611f\\u7ec6\\u817b\",\"oldimg\":\"quce\\/quiz-6015-rBJKcnWyMW.png\"},{\"threshold\":\"C\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a60\\uff05br\\u60c5\\u7eea\\u826f\\u597d\\uff0c\\u5b66\\u4f1a\\u81ea\\u6211\\u6d88\\u5316\",\"oldimg\":\"quce\\/quiz-6015-aK3WtH8QWX.png\"},{\"threshold\":\"D\",\"title\":\"\\u5185\\u5fc3\\u60b2\\u4f24\\u6307\\u6570\\uff1a8\\uff05br\\u77e5\\u8db3\\u5e38\\u4e50\\uff0c\\u6ca1\\u4ec0\\u4e48\\u5927\\u4e0d\\u4e86\",\"oldimg\":\"quce\\/quiz-6015-nDfEarJDEN.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520575242bYwm1.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 9) {
		data = data1[0];

	} else if (_num < 11 && _num >= 9) {
		data = data1[1];

	} else if (_num < 13 && _num >= 11) {
		data = data1[2];

	} else if (_num >= 13) {
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

