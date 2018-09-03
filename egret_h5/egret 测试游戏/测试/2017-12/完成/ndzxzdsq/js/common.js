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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u65e0\\u4ef7\\u4e4b\\u5b9dbr\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\",\"img\":\"quce\\/quiz-5983-wsXbSaHjCF.png\",\"desc\":\"\\u4f60\\u7684\\u771f\\u5fc3\\u53ea\\u80fd\\u8bf4\\u662f\\u6709\\u4e00\\u5b9a\\u4ef7\\u503c\\uff0c\\u6ca1\\u6709\\u529e\\u6cd5\\u7528\\u4ef7\\u683c\\u6765\\u8861\\u91cf\\u3002\\u4f60\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u771f\\u8bda\\u81f3\\u6781\\uff0c\\u5bf9\\u4e8e\\u4f60\\u6765\\u8bf4\\uff0c\\u53ea\\u8981\\u4f60\\u559c\\u6b22\\u4e0a\\u4e00\\u4e2a\\u4eba\\uff0c\\u4f60\\u5c31\\u4f1a\\u503e\\u5c3d\\u6240\\u6709\\u5bf9ta\\u597d\\uff0c\\u4e5f\\u8bb8\\u6ca1\\u6709\\u534e\\u4e3d\\u7684\\u8a00\\u8bed\\uff0c\\u6ca1\\u6709\\u6d6a\\u6f2b\\u7684\\u60ca\\u559c\\uff0c\\u4f46\\u4f60\\u5374\\u6709\\u4e00\\u5fc3\\u4e00\\u610f\\u53ea\\u4e3a\\u4e00\\u4eba\\u7684\\u771f\\u5fc3\\uff0c\\u8fd9\\u4efd\\u771f\\u5fc3\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u771f\\u5fc3\\u503c\\u591a\\u5c11\\u94b1\\uff1f\\u6211\\u7684\\u771f\\u5fc3\\u662f\\u65e0\\u4ef7\\u4e4b\\u5b9d\\uff0c\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\\u3002\",\"oldimg\":\"quce\\/1516269477Q2tRw.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u65e0\\u4ef7\\u4e4b\\u5b9dbr\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\",\"oldimg\":\"quce\\/1516269477Q2tRw.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e00\\u4e2a\\u4ebfbr\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\",\"oldimg\":\"quce\\/1516269481GGfEF.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u4e00\\u5343\\u4e07br\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\",\"oldimg\":\"quce\\/1516269486tNniN.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u4e00\\u767e\\u5757br\\u7406\\u6027\\u53c8\\u56fa\\u6267\",\"oldimg\":\"quce\\/1516269492WEAja.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611609V8nIV.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u4e00\\u4e2a\\u4ebfbr\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\",\"img\":\"quce\\/quiz-5983-CmNQX3YTZa.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u7406\\u6027\\u7684\\u4eba\\uff0c\\u5728\\u611f\\u60c5\\u4e2d\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u61c2\\u5f97\\u4ed8\\u51fa\\u5374\\u4e5f\\u4e0d\\u4f1a\\u76f2\\u76ee\\u4ed8\\u51fa\\u7684\\u4eba\\u3002\\u5f97\\u5230\\u4f60\\u771f\\u5fc3\\u5bf9\\u5f85\\u7684\\u4eba\\uff0c\\u5c31\\u50cf\\u662f\\u5f97\\u5230\\u4e86\\u8fd9\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\\u3002\\u7231\\u60c5\\u8fd9\\u6761\\u8def\\u5f88\\u96be\\u4e00\\u5e06\\u98ce\\u987a\\uff0c\\u5373\\u4f7f\\u6709\\u8270\\u96be\\u9669\\u963b\\uff0c\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u754f\\u60e7\\uff0c\\u4f46\\u5982\\u679c\\u5bf9\\u65b9\\u6ca1\\u6709\\u7ed9\\u4f60\\u540c\\u7b49\\u7684\\u7231\\uff0c\\u4f60\\u4e5f\\u4f1a\\u6beb\\u4e0d\\u72b9\\u8c6b\\u7684\\u6536\\u56de\\u81ea\\u5df1\\u7684\\u771f\\u5fc3\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u591a\\u5c11\\uff1f\\u6211\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u4e00\\u4e2a\\u4ebf\\uff0c\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\\u3002\",\"oldimg\":\"quce\\/1516269481GGfEF.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u65e0\\u4ef7\\u4e4b\\u5b9dbr\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\",\"oldimg\":\"quce\\/1516269477Q2tRw.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e00\\u4e2a\\u4ebfbr\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\",\"oldimg\":\"quce\\/1516269481GGfEF.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u4e00\\u5343\\u4e07br\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\",\"oldimg\":\"quce\\/1516269486tNniN.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u4e00\\u767e\\u5757br\\u7406\\u6027\\u53c8\\u56fa\\u6267\",\"oldimg\":\"quce\\/1516269492WEAja.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611609V8nIV.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u4e00\\u5343\\u4e07br\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\",\"img\":\"quce\\/quiz-5983-kGWpPkzn6r.png\",\"desc\":\"\\u4f60\\u4e3a\\u4eba\\u5341\\u5206\\u771f\\u8bda\\uff0c\\u5fc3\\u601d\\u7ec6\\u817b\\uff0c\\u662f\\u4e2a\\u5341\\u8db3\\u7684\\u6696\\u5fc3\\u4eba\\u3002\\u5bf9\\u4f60\\u6765\\u8bf4\\u5e73\\u5e73\\u6de1\\u6de1\\u624d\\u662f\\u771f\\uff0c\\u4e00\\u65e6\\u5bf9\\u65b9\\u8fbe\\u4e0d\\u5230\\u4f60\\u7684\\u8981\\u6c42\\uff0c\\u4f60\\u7edd\\u4e0d\\u4f1a\\u8fdd\\u5fc3\\u7684\\u201c\\u5c06\\u5c31\\u201d\\uff0c\\u6b3a\\u9a97\\u522b\\u4eba\\uff0c\\u4e5f\\u5bb3\\u4e86\\u81ea\\u5df1\\u3002\\u4eba\\u4e0e\\u4eba\\u90fd\\u662f\\u76f8\\u4e92\\u7684\\uff0c\\u7528\\u771f\\u60c5\\u6362\\u771f\\u5fc3\\uff0c\\u8981\\u5f97\\u5230\\u4f60\\u7684\\u771f\\u5fc3\\u5e76\\u4e0d\\u5bb9\\u6613\\uff0c\\u5174\\u8bb8\\u662f\\u5bb3\\u6015\\u53d7\\u5230\\u4f24\\u5bb3\\uff0c\\u4f60\\u4e0d\\u613f\\u5c06\\u5fc3\\u968f\\u610f\\u4ea4\\u4ed8\\u7ed9\\u522b\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u591a\\u5c11\\uff1f\\u6211\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u4e00\\u767e\\u4e07\\uff0c\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\\u3002\",\"oldimg\":\"quce\\/1516269486tNniN.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u65e0\\u4ef7\\u4e4b\\u5b9dbr\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\",\"oldimg\":\"quce\\/1516269477Q2tRw.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e00\\u4e2a\\u4ebfbr\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\",\"oldimg\":\"quce\\/1516269481GGfEF.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u4e00\\u5343\\u4e07br\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\",\"oldimg\":\"quce\\/1516269486tNniN.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u4e00\\u767e\\u5757br\\u7406\\u6027\\u53c8\\u56fa\\u6267\",\"oldimg\":\"quce\\/1516269492WEAja.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611609V8nIV.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u4e00\\u767e\\u5757br\\u7406\\u6027\\u53c8\\u56fa\\u6267\",\"img\":\"quce\\/quiz-5983-aPKCpnmaDs.png\",\"desc\":\"\\u4f60\\u7684\\u4ed8\\u51fa\\u90fd\\u662f\\u660e\\u7801\\u6807\\u4ef7\\u7684\\uff0c\\u4f60\\u6240\\u6709\\u7684\\u4ed8\\u51fa\\u90fd\\u6e34\\u671b\\u5f97\\u5230\\u56de\\u62a5\\uff0c\\u5982\\u679c\\u5bf9\\u65b9\\u53ea\\u662f\\u4e00\\u5473\\u7684\\u7d22\\u53d6\\u800c\\u5fd8\\u8bb0\\u4e86\\u56de\\u62a5\\uff0c\\u4f60\\u4fbf\\u4f1a\\u653e\\u624b\\u3002\\u4f60\\u4e0d\\u4f1a\\u8f7b\\u6613\\u76f8\\u4fe1\\u522b\\u4eba\\uff0c\\u5bf9\\u5f85\\u7231\\u60c5\\u7406\\u6027\\u53c8\\u56fa\\u6267\\u3002\\u4e3a\\u4eba\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u4e0d\\u4f1a\\u523b\\u610f\\u5f3a\\u6c42\\uff0c\\u4f60\\u89c9\\u5f97\\u88ab\\u52c9\\u5f3a\\u7684\\u90fd\\u4e0d\\u662f\\u5e78\\u798f\\uff0c\\u53ef\\u4ee5\\u5c06\\u5c31\\u7684\\u4fbf\\u4e0d\\u662f\\u771f\\u7231\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u591a\\u5c11\\uff1f\\u6211\\u7684\\u771f\\u5fc3\\u4ef7\\u503c\\u4e00\\u767e\\u5757\\uff0c\\u7406\\u6027\\u53c8\\u56fa\\u6267\\u3002\",\"oldimg\":\"quce\\/1516269492WEAja.jpeg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u65e0\\u4ef7\\u4e4b\\u5b9dbr\\u7528\\u60c5\\u81f3\\u6df1\\uff0c\\u5343\\u91d1\\u4e0d\\u6362\",\"oldimg\":\"quce\\/1516269477Q2tRw.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e00\\u4e2a\\u4ebfbr\\u662f\\u4e16\\u95f4\\u6700\\u73cd\\u8d35\\u7684\\u4e1c\\u897f\",\"oldimg\":\"quce\\/1516269481GGfEF.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u4e00\\u5343\\u4e07br\\u7edd\\u4e0d\\u613f\\u5c06\\u5c31\",\"oldimg\":\"quce\\/1516269486tNniN.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u4e00\\u767e\\u5757br\\u7406\\u6027\\u53c8\\u56fa\\u6267\",\"oldimg\":\"quce\\/1516269492WEAja.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516611609V8nIV.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 8) {
		data = data1[3];

	} else if (_num < 13 && _num >= 8) {
		data = data1[2];

	} else if (_num < 19 && _num >= 13) {
		data = data1[1];

	} else if (_num >= 19) {
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

