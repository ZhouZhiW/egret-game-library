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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a0%\",\"img\":\"quce\\/quiz-5060-HfK8mwdPNj.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u8868\\u91cc\\u5982\\u4e00\\u7684\\u4eba\\uff0c\\u575a\\u6301\\u5fe0\\u4e8e\\u81ea\\u6211\\u3002\\u4f60\\u505a\\u4e8b\\u9075\\u5faa\\u539f\\u5219\\u7684\\u540c\\u65f6\\u53c8\\u8bb2\\u6c42\\u6548\\u7387\\uff0c\\u4ece\\u4e00\\u5f00\\u59cb\\u5c31\\u76f4\\u5954\\u7ed3\\u679c\\u800c\\u53bb\\uff0c\\u4e0d\\u559c\\u6b22\\u62d0\\u5f2f\\u62b9\\u89d2\\u3002\\u8fd9\\u4e0d\\u4ee3\\u8868\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u5f88\\u523b\\u677f\\uff0c\\u6070\\u6070\\u76f8\\u53cd\\u4f60\\u662f\\u4e00\\u4e2a\\u4e50\\u5929\\u6d3e\\uff0c\\u56e0\\u4e3a\\u8ffd\\u6c42\\u5185\\u5fc3\\u7684\\u7eaf\\u7cb9\\uff0c\\u6240\\u4ee5\\u65e0\\u5f62\\u4e4b\\u4e2d\\u5c11\\u4e86\\u5f88\\u591a\\u4e0d\\u5fc5\\u8981\\u7684\\u8d1f\\u62c5\\u3002\",\"sharetitle\":\"\\u7ecf\\u6d4b\\u8bd5\\uff1a\\u6211\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u7a0b\\u5ea6\\u4ec5\\u67090%\\uff0c\\u4f60\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a0%\"},{\"threshold\":\"B\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a30%\"},{\"threshold\":\"C\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a70%\"},{\"threshold\":\"D\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a100%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515402162DXY0S.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a30%\",\"img\":\"quce\\/quiz-5060-ktX5H2GMed.jpg\",\"desc\":\"\\u4f60\\u662f\\u5e38\\u89c1\\u7684\\u53cc\\u91cd\\u4eba\\u683c\\uff0c\\u4f46\\u4f60\\u552f\\u4e00\\u5206\\u88c2\\u51fa\\u7684\\u8fd9\\u4e2a\\u4eba\\u683c\\u53c8\\u548c\\u4f60\\u5f88\\u63a5\\u8fd1\\uff0c\\u4e5f\\u8bb8\\u662f\\u8fc7\\u53bb\\u67d0\\u4e2a\\u9636\\u6bb5\\u7684\\u4f60\\uff0c\\u4e5f\\u8bb8\\u662f\\u4f60\\u66fe\\u61a7\\u61ac\\u7684\\u6837\\u5b50\\u3002\\u7b80\\u5355\\u6765\\u8bf4\\uff0c\\u4f60\\u6d3b\\u5f97\\u5f88\\u771f\\u5b9e\\uff0c\\u5904\\u4e8b\\u6709\\u5e95\\u9650\\u4e5f\\u6709\\u76ee\\u6807\\uff0c\\u4e3a\\u4eba\\u8bb2\\u4e49\\u6c14\\u4e5f\\u8bb2\\u539f\\u5219\\uff0c\\u662f\\u4e2a\\u4f1a\\u7528\\u5fc3\\u4f53\\u9a8c\\u751f\\u6d3b\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u7ecf\\u6d4b\\u8bd5\\uff1a\\u6211\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u7a0b\\u5ea6\\u670930%\\uff0c\\u53cc\\u91cd\\u4eba\\u683c\\uff0c\\u4f60\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a0%\"},{\"threshold\":\"B\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a30%\"},{\"threshold\":\"C\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a70%\"},{\"threshold\":\"D\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a100%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515402162DXY0S.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a70%\",\"img\":\"quce\\/quiz-5060-8MKzxQDShS.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u4e0d\\u6298\\u4e0d\\u6263\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u8005\\u3002\\u4f60\\u53ef\\u4ee5\\u5728\\u4e0d\\u540c\\u573a\\u5408\\u5448\\u73b0\\u51fa\\u4e0d\\u540c\\u7684\\u5f62\\u8c61\\uff0c\\u4e5f\\u7ecf\\u5e38\\u7ed9\\u4e0d\\u540c\\u7684\\u4eba\\u7559\\u4e0b\\u4e0d\\u540c\\u7684\\u5370\\u8c61\\u3002\\u4f60\\u5f88\\u806a\\u660e\\uff0c\\u4f1a\\u8bc6\\u4eba\\uff0c\\u4e5f\\u64c5\\u957f\\u628a\\u63e1\\u4eba\\u5fc3\\u3002\\u4e3a\\u4eba\\u5904\\u4e8b\\u5706\\u6ed1\\u5468\\u5230\\u7684\\u4f60\\uff0c\\u603b\\u663e\\u5f97\\u4e0d\\u53ef\\u6216\\u7f3a\\uff0c\\u65f6\\u5e38\\u5728\\u8eab\\u8fb9\\u7684\\u670b\\u53cb\\u4e2d\\u626e\\u6f14\\u4e0d\\u53ef\\u6216\\u7f3a\\u7684\\u89d2\\u8272\\u3002\",\"sharetitle\":\"\\u7ecf\\u6d4b\\u8bd5\\uff1a\\u6211\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u7a0b\\u5ea6\\u4e3a70%\\uff0c\\u4e0d\\u6298\\u4e0d\\u6263\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u8005\\uff0c\\u4f60\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a0%\"},{\"threshold\":\"B\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a30%\"},{\"threshold\":\"C\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a70%\"},{\"threshold\":\"D\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a100%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515402162DXY0S.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a100%\",\"img\":\"quce\\/quiz-5060-cyfDmEatHs.jpg\",\"desc\":\"\\u4f60\\u7684\\u7cbe\\u795e\\u5206\\u88c2\\u548c\\u591a\\u91cd\\u4eba\\u683c\\u73b0\\u8c61\\u975e\\u5e38\\u4e25\\u91cd\\uff0c\\u751a\\u81f3\\u5df2\\u7ecf\\u5230\\u4e86\\u4e0d\\u81ea\\u77e5\\u7684\\u7a0b\\u5ea6\\u3002\\u4e5f\\u8bb8\\u56e0\\u4e3a\\u63a5\\u6536\\u592a\\u591a\\u8d1f\\u9762\\u6d88\\u606f\\uff0c\\u4f60\\u7684\\u5fc3\\u7406\\u8bbe\\u9632\\u7a0b\\u5ea6\\u5f88\\u9ad8\\uff0c\\u4e0d\\u4f1a\\u8f7b\\u6613\\u4ee5\\u771f\\u9762\\u76ee\\u793a\\u4eba\\u3002\\u4f60\\u7684\\u5fc3\\u601d\\u5f88\\u91cd\\uff0c\\u6027\\u683c\\u591a\\u53d8\\uff0c\\u8ba9\\u4eba\\u96be\\u4ee5\\u63e3\\u6d4b\\uff0c\\u4f46\\u4f60\\u7684\\u767e\\u53d8\\u53c8\\u603b\\u80fd\\u8ba9\\u4eba\\u7740\\u8ff7\\u3002\",\"sharetitle\":\"\\u7ecf\\u6d4b\\u8bd5\\uff1a\\u6211\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u7a0b\\u5ea6\\u9ad8\\u8fbe100%\\uff0c\\u6807\\u51c6\\u7cbe\\u5206\\uff0c\\u4f60\\u7684\\u4eba\\u683c\\u5206\\u88c2\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a0%\"},{\"threshold\":\"B\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a30%\"},{\"threshold\":\"C\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a70%\"},{\"threshold\":\"D\",\"title\":\"\\u5206\\u88c2\\u7a0b\\u5ea6\\uff1a100%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515402162DXY0S.png\",\"account\":1003}" },
	]


	var data;
	var _Array=["A", "B", "C", "D", " E", "F", "G", "H", "I", "J","k"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1])
		if(_num!=-1){
			data=data1[_num];
		}
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

