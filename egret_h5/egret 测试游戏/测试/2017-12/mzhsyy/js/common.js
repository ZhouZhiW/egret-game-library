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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\",\"img\":\"quce\\/quiz-5315-Q2YRDikHpj.jpg\",\"desc\":\"\\u540d\\u5b57\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u3001\\u201c\\u5609\\u201d\\u5b57\\u7684\\u4eba\\u548c\\u4f60\\u7684\\u6027\\u683c\\u6bd4\\u8f83\\u76f8\\u5408\\u3002\\u8fd9\\u7c7b\\u4eba\\u591a\\u534a\\u6027\\u683c\\u6e29\\u548c\\uff0c\\u8111\\u5b50\\u7075\\u6d3b\\uff0c\\u4e3a\\u4eba\\u6709\\u8da3\\uff0c\\u4f60\\u662f\\u4e2a\\u4e0d\\u7518\\u5e73\\u6de1\\u7684\\u4eba\\uff0c\\u5f88\\u6709\\u60f3\\u6cd5\\uff0c\\u5fc3\\u80f8\\u5f00\\u9614\\uff0c\\u6240\\u4ee5\\u4f60\\u4eec\\u5728\\u4e00\\u8d77\\u4f1a\\u5f88\\u6295\\u7f18\\u3002\",\"sharetitle\":\"\\u4f60\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u4ec0\\u4e48\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\uff1f\\u6211\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u4f73\\u201d\\u3001\\u201c\\u5609\\u201d\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\"},{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\"},{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\"},{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\"},{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513911604PamKS.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\",\"img\":\"quce\\/quiz-5315-xpb7Hw4RMw.jpg\",\"desc\":\"\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u9633\\u201d\\u3001\\u201c\\u6d0b\\u201d\\u5b57\\u7684\\u4eba\\u548c\\u4f60\\u5f88\\u76f8\\u5408\\uff0c\\u4f60\\u662f\\u4e2a\\u6709\\u813e\\u6c14\\u7684\\u4eba\\uff0c\\u4f46\\u6027\\u683c\\u5c5e\\u9634\\uff0c\\u6709\\u65f6\\u5019\\u6709\\u4e9b\\u591a\\u6101\\u4f24\\u611f\\uff0c\\u6240\\u4ee5\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u9633\\u201d\\u5b57\\u7684\\u4eba\\u80fd\\u548c\\u4f60\\u4e92\\u8865\\uff0c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u6d0b\\u201d\\u5b57\\u7684\\u4eba\\u53ef\\u4ee5\\u4efb\\u4f60\\u503e\\u8bc9\\u3002\",\"sharetitle\":\"\\u4f60\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u4ec0\\u4e48\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\uff1f\\u6211\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u9633\\u201d\\u3001\\u201c\\u6d0b\\u201d\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\"},{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\"},{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\"},{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\"},{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513911604PamKS.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\",\"img\":\"quce\\/quiz-5315-DCM46bQZDx.jpg\",\"desc\":\"\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u5929\\u201d\\u7684\\u4eba\\u4e00\\u822c\\u4eba\\u7f18\\u5f88\\u597d\\uff0c\\u4eba\\u8109\\u5e7f\\u800c\\u4e14\\u591f\\u4e49\\u6c14\\u3002\\u4f60\\u91cd\\u611f\\u60c5\\uff0c\\u5c24\\u5176\\u628a\\u670b\\u53cb\\u770b\\u5f97\\u5f88\\u91cd\\uff0c\\u4ece\\u4e0d\\u5728\\u80cc\\u540e\\u8bf4\\u4eba\\u574f\\u8bdd\\uff0c\\u6240\\u4ee5\\u4f60\\u548c\\u8fd9\\u7c7b\\u4eba\\u5728\\u4e00\\u8d77\\u5fd7\\u8da3\\u76f8\\u6295\\uff0c\\u53cc\\u65b9\\u90fd\\u6253\\u5f00\\u5929\\u7a97\\u8bf4\\u4eae\\u8bdd\\uff0c\\u5f88\\u771f\\u8bda\\u3002\",\"sharetitle\":\"\\u4f60\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u4ec0\\u4e48\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\uff1f\\u6211\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u5929\\u201d\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\"},{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\"},{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\"},{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\"},{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513911604PamKS.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\",\"img\":\"quce\\/quiz-5315-MrwWfYWNkj.jpg\",\"desc\":\"\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u6653\\u201d\\u5b57\\u7684\\u4eba\\u4e00\\u822c\\u90fd\\u5f88\\u7cbe\\u795e\\uff0c\\u5c31\\u50cf\\u6709\\u6d3b\\u529b\\u7684\\u4f60\\u4e00\\u6837\\uff0c\\u4f60\\u4eec\\u7684\\u8111\\u5b50\\u90fd\\u5f88\\u7075\\u6d3b\\uff0c\\u7231\\u73a9\\uff0c\\u4f46\\u80fd\\u7ecf\\u5e38\\u73a9\\u5230\\u70b9\\u5b50\\u4e0a\\uff0c\\u8fd9\\u7c7b\\u4eba\\u662f\\u4f60\\u6700\\u9ed8\\u5951\\u7684\\u642d\\u6863\\u548c\\u6700\\u6709\\u610f\\u601d\\u7684\\u73a9\\u4f34\\uff0c\\u4f60\\u4eec\\u5728\\u4e00\\u8d77\\u4f1a\\u5f88\\u5f00\\u5fc3\\u3002\",\"sharetitle\":\"\\u4f60\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u4ec0\\u4e48\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\uff1f\\u6211\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u6653\\u201d\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\"},{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\"},{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\"},{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\"},{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513911604PamKS.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\",\"img\":\"quce\\/quiz-5315-WhhXW6cPPe.jpg\",\"desc\":\"\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u98de\\u201d\\u5b57\\u7684\\u4eba\\u4e00\\u822c\\u6bd4\\u8f83\\u7f9e\\u6da9\\uff0c\\u4ed6\\u4eec\\u4e0d\\u5584\\u8a00\\u8bed\\u4f46\\u662f\\u4f1a\\u9ed8\\u9ed8\\u5730\\u628a\\u4e8b\\u60c5\\u505a\\u597d\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u4f4e\\u8c03\\u7684\\u4eba\\u5462\\uff0c\\u4e0d\\u7231\\u5f20\\u626c\\uff0c\\u6240\\u4ee5\\u548c\\u8fd9\\u7c7b\\u4eba\\u4ea4\\u670b\\u53cb\\u662f\\u4f60\\u7684\\u4eab\\u53d7\\u548c\\u5e78\\u8fd0\\uff0c\\u4f60\\u4eec\\u4f1a\\u76f8\\u5904\\u5f97\\u5341\\u5206\\u878d\\u6d3d\\u3002\",\"sharetitle\":\"\\u4f60\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u4ec0\\u4e48\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\uff1f\\u6211\\u548c\\u540d\\u5b57\\u91cc\\u5e26\\u201c\\u98de\\u201d\\u5b57\\u7684\\u4eba\\u6700\\u6295\\u7f18\\u3002\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u4f73\\u201d\\u6216\\u201c\\u5609\\u201d\"},{\"threshold\":\"B\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u9633\\u201d\\u6216\\u201c\\u6d0b\\u201d\"},{\"threshold\":\"C\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u5929\\u201d\\u5b57\"},{\"threshold\":\"D\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u6653\\u201d\\u5b57\"},{\"threshold\":\"E\",\"title\":\"\\u548c\\u6211\\u6295\\u7f18\\u7684\\u540d\\u5b57br\\u91cc\\u6709\\u201c\\u98de\\u201d\\u5b57\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513911604PamKS.png\",\"account\":1003}" },
	];
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 13) {
		data = data1[0];

	} else if (_num < 16 && _num >= 13) {
		data = data1[1];

	} else if (_num < 20 && _num >= 16) {
		data = data1[2];

	} else if (_num < 25 &&_num >= 20) {
		data = data1[3];
	}else if (_num >= 25) {
		data = data1[4];
	}
	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 3);

	}

	//$.ajax({
	//	type: 'POST',
	//	url: serser,
	//	data: postData,
	//	dataType: 'json',
	//	timeout: 20000,
	//	success: function(data){
	//		if(data.status == 200){
	//			var result = JSON.parse(data['content']);
	//			var attention = JSON.parse(data['attention']);
	//			result['attention'] = attention;
	//			if(result['img']){
	//				result['img'] = adminPath +"/"+ result['img'];
	//			}
	//			clearInterval(getTimer);
	//			if(timerCnt < waitTime){
	//				waitTime -= timerCnt;
	//				callback(result, JSON.parse(data['total']), waitTime);
	//			}else{
	//				callback(result, JSON.parse(data['total']), 0);
	//			}
	//		}else{
	//			clearInterval(checkTimer);
	//			clearInterval(getTimer);
	//			if(timerCnt < waitTime){
	//				setTimeout(function(){
	//					showError(data.status);
	//				}, (waitTime-timerCnt)*1000);
	//			}else{
	//				showError(data.status);
	//			}
	//		}
	//	},
	//	error: function(xhr, type){
	//		var errorinfo = xhr.status+" "+type;
	//		// console.log(errorinfo)
	//		showError(errorinfo);
	//	}
	//})
}

