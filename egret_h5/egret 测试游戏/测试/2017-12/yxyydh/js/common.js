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
	};
	var data1 = [
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%br\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\",\"img\":\"quce\\/quiz-5201-6wDGfmNGWa.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u540c\\u60c5\\u5fc3\\u6cdb\\u6ee5\\u7684\\u8001\\u597d\\u4eba\\uff0c\\u5fc3\\u5730\\u5584\\u826f\\uff0c\\u5185\\u5fc3\\u5341\\u5206\\u67d4\\u8f6f\\uff0c\\u89c1\\u4e0d\\u5f97\\u522b\\u4eba\\u4e0d\\u597d\\uff0c\\u770b\\u4e0d\\u60ef\\u793e\\u4f1a\\u4e0d\\u516c\\u5e73\\u73b0\\u8c61\\u53d1\\u751f\\uff0c\\u4f60\\u603b\\u60f3\\u66ff\\u4ed6\\u4eba\\u6253\\u62b1\\u4e0d\\u5e73\\u3002\\u867d\\u7136\\u662f\\u4e00\\u4ef6\\u5c0f\\u4e8b\\u60c5\\uff0c\\u4f46\\u5728\\u4f60\\u770b\\u6765\\uff0c\\u4ece\\u611f\\u6027\\u4e0a\\u7684\\u89d2\\u5ea6\\u6765\\u770b\\uff0c\\u70b9\\u6ef4\\u5c0f\\u4e8b\\u4e5f\\u80fd\\u4f24\\u5bb3\\u5230\\u4eba\\u7684\\u5fc3\\u7075\\uff0c\\u4f60\\u5f88\\u6ce8\\u91cd\\u5c0f\\u7ec6\\u8282\\uff0c\\u4f53\\u8d34\\u5165\\u5fae\\uff0c\\u4eba\\u7f18\\u6bd4\\u8f83\\u597d\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f02\\u6027\\u7f18\\u6709\\u591a\\u597d\\uff1f\\u6211\\u7684\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%\\uff0c\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%br\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\"},{\"threshold\":\"B\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%br\\u6843\\u82b1\\u6735\\u6735\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%br\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%br\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151392965878ZpT.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%br\\u6843\\u82b1\\u6735\\u6735\\u5f00\",\"img\":\"quce\\/quiz-5201-2j5i67hJXY.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u9605\\u5386\\u4e30\\u5bcc\\u3001\\u4f46\\u540c\\u65f6\\u4fdd\\u6301\\u7740\\u4e50\\u89c2\\u6027\\u683c\\u7684\\u4eba\\uff0c\\u4e0d\\u8bba\\u53bb\\u54ea\\u91cc\\u9047\\u5230\\u4ec0\\u4e48\\u4eba\\uff0c\\u90fd\\u4f1a\\u8ba9\\u5bf9\\u65b9\\u611f\\u5230\\u4e0d\\u4e00\\u822c\\u7684\\u4eb2\\u5207\\uff0c\\u6240\\u4ee5\\u603b\\u80fd\\u5728\\u6700\\u77ed\\u7684\\u65f6\\u95f4\\u5185\\u4e0e\\u5bf9\\u65b9\\u7ed3\\u6210\\u670b\\u53cb\\u3002\\u56e0\\u6b64\\u4f60\\u7684\\u5f02\\u6027\\u7f18\\u662f\\u6700\\u597d\\u7684\\uff0c\\u53ef\\u8c13\\u662f\\u6843\\u82b1\\u6735\\u6735\\u5f00\\u554a\\uff01\\u5fc3\\u6001\\u5f88\\u5e74\\u8f7b\\uff0c\\u54ea\\u6015\\u81ea\\u5df1\\u662f\\u5728\\u843d\\u9b44\\u65f6\\u671f\\uff0c\\u4e5f\\u80fd\\u4ee5\\u4e00\\u79cd\\u826f\\u597d\\u7684\\u5fc3\\u5883\\u53bb\\u9762\\u5bf9\\uff0c\\u4e1d\\u6beb\\u4e0d\\u4f1a\\u6d88\\u6781\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f02\\u6027\\u7f18\\u6709\\u591a\\u597d\\uff1f\\u6211\\u7684\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%\\uff0c\\u6843\\u82b1\\u6735\\u6735\\u5f00\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%br\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\"},{\"threshold\":\"B\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%br\\u6843\\u82b1\\u6735\\u6735\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%br\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%br\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151392965878ZpT.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%br\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\",\"img\":\"quce\\/quiz-5201-yFdPFTNtZw.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u5f88\\u803f\\u76f4\\uff0c\\u6709\\u81ea\\u5df1\\u7684\\u72ec\\u7279\\u89c1\\u89e3\\uff0c\\u4e0d\\u4f1a\\u968f\\u5927\\u6d41\\uff0c\\u4e2a\\u6027\\u6bd4\\u8f83\\u9c9c\\u660e\\uff0c\\u6df1\\u53d7\\u5f02\\u6027\\u559c\\u6b22\\u3002\\u770b\\u4f3c\\u6709\\u4e9b\\u5c0f\\u50b2\\u5a07\\uff0c\\u6709\\u4e9b\\u7279\\u7acb\\u72ec\\u884c\\uff0c\\u4e0d\\u8fc7\\u4f60\\u5c31\\u662f\\u4f60\\uff0c\\u4f60\\u53ea\\u613f\\u505a\\u6700\\u597d\\u7684\\u81ea\\u5df1\\u3002\\u91cd\\u89c6\\u611f\\u60c5\\uff0c\\u8bb2\\u4e49\\u6c14\\uff0c\\u613f\\u610f\\u4e3a\\u670b\\u53cb\\u4e24\\u808b\\u63d2\\u5200\\uff0c\\u6df1\\u5f97\\u5927\\u5bb6\\u7684\\u4fe1\\u8d56\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f02\\u6027\\u7f18\\u6709\\u591a\\u597d\\uff1f\\u6211\\u7684\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%\\uff0c\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%br\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\"},{\"threshold\":\"B\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%br\\u6843\\u82b1\\u6735\\u6735\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%br\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%br\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151392965878ZpT.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%br\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\",\"img\":\"quce\\/quiz-5201-XjPC2Fzaa2.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u6709\\u4e9b\\u5c0f\\u4efb\\u6027\\uff0c\\u51e1\\u4e8b\\u603b\\u4ee5\\u81ea\\u6211\\u4e3a\\u4e2d\\u5fc3\\uff0c\\u56e0\\u4e3a\\u4f60\\u89c9\\u5f97\\u81ea\\u5df1\\u7684\\u4eba\\u751f\\u5c31\\u5f97\\u81ea\\u5df1\\u4e3b\\u5bb0\\u3002\\u88ab\\u4eba\\u7275\\u7740\\u9f3b\\u5b50\\u8d70\\uff0c\\u7b80\\u76f4\\u4e0d\\u81ea\\u7531\\uff0c\\u4f60\\u7684\\u5fc3\\u6bd4\\u8f83\\u5927\\uff0c\\u968f\\u6027\\u800c\\u4e3a\\u3002\\u4e3a\\u4eba\\u5f88\\u6d12\\u8131\\uff0c\\u66f4\\u591a\\u7684\\u65f6\\u5019\\uff0c\\u60f3\\u5f85\\u5728\\u5bb6\\u91cc\\uff0c\\u60f3\\u6c89\\u6d78\\u5728\\u81ea\\u5df1\\u7684\\u5c0f\\u4e16\\u754c\\u91cc\\u3002\\u4e0d\\u8fc7\\u4e16\\u754c\\u90a3\\u4e48\\u5927\\uff0c\\u6700\\u597d\\u591a\\u51fa\\u53bb\\u8d70\\u8d70\\uff0c\\u8fd9\\u624d\\u80fd\\u9047\\u89c1\\u4e0d\\u540c\\u7684\\u98ce\\u666f\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f02\\u6027\\u7f18\\u6709\\u591a\\u597d\\uff1f\\u6211\\u7684\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%\\uff0c\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a300%br\\u6d3b\\u6cfc\\u5927\\u65b9\\u60f9\\u4eba\\u7231\"},{\"threshold\":\"B\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a120%br\\u6843\\u82b1\\u6735\\u6735\\u5f00\"},{\"threshold\":\"C\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a88%br\\u6709\\u72ec\\u7279\\u7684\\u4eba\\u683c\\u9b45\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f02\\u6027\\u7f18\\u6307\\u6570\\uff1a45%br\\u8150\\u5b85\\u9057\\u5931\\u4e86\\u6843\\u82b1\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/151392965878ZpT.png\",\"account\":1003}" },
	];
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[3];

	} else if (_num < 20 && _num >= 15) {
		data = data1[2];

	} else if (_num < 25 && _num >= 20) {
		data = data1[1];

	} else if (_num >= 25) {
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

