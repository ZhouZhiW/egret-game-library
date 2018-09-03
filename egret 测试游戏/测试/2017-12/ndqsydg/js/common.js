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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570200%br\\u843d\\u843d\\u5927\\u65b9\\u7684\\u5b8c\\u7f8e\\u5b58\\u5728\\uff01\",\"img\":\"quce\\/quiz-5007-DJTHQcpDB6.jpg\",\"desc\":\"\\u65e0\\u8bba\\u662f\\u4f60\\u7684\\u60c5\\u5546\\u3001\\u5b66\\u5386\\u3001\\u8fd8\\u662f\\u9762\\u5bb9\\u548c\\u5ba1\\u7f8e\\u90fd\\u5c5e\\u4e8e\\u4eba\\u7fa4\\u4e2d\\u7684\\u4f7c\\u4f7c\\u8005\\u3002\\u4f60\\u7684\\u4eb2\\u548c\\u529b\\u5f88\\u5f3a\\uff0c\\u8c08\\u5410\\u4e0d\\u51e1\\uff0c\\u5728\\u4ea4\\u9645\\u5708\\u4e2d\\u5f88\\u53d7\\u4eba\\u6b22\\u8fce\\u3002\\u4f60\\u4eba\\u7f18\\u597d\\u4f46\\u53c8\\u4e0d\\u6ee5\\u4ea4\\uff0c\\u5728\\u5404\\u79cd\\u573a\\u5408\\u90fd\\u4f1a\\u8868\\u73b0\\u5f97\\u843d\\u843d\\u5927\\u65b9\\uff0c\\u6240\\u4ee5\\u9ad8\\u60c5\\u5546\\u7684\\u4f60\\u5728\\u522b\\u4eba\\u773c\\u4e2d\\u662f\\u5f88\\u5b8c\\u7f8e\\u7684\\u5b58\\u5728\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u60c5\\u5546\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u662f\\uff1a200%\\uff01\\u5728\\u4eba\\u9645\\u4ea4\\u5f80\\u4e2d\\u5f88\\u5403\\u9999\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570200%br\\u843d\\u843d\\u5927\\u65b9\\u7684\\u5b8c\\u7f8e\\u5b58\\u5728\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570100%br\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u60c5\\u5546\\u6307\\u657050%br\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\u5566\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u60c5\\u5546\\u6307\\u657020%br\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513926307Yqoxc.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570100%br\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\",\"img\":\"quce\\/quiz-5007-iFDDimAMyS.jpg\",\"desc\":\"\\u4f60\\u7684\\u60c5\\u5546\\u8fd8\\u662f\\u86ee\\u9ad8\\u7684\\uff01\\u5934\\u8111\\u806a\\u660e\\u7684\\u4f60\\uff0c\\u673a\\u667a\\u800c\\u4e0d\\u5706\\u6ed1\\uff0c\\u5e7d\\u9ed8\\u4e0d\\u5931\\u98ce\\u8da3\\uff0c\\u51e1\\u4e8b\\u80fd\\u591f\\u638c\\u63e1\\u597d\\u5ea6\\uff0c\\u800c\\u4e14\\u4f60\\u6709\\u4e00\\u5b9a\\u7684\\u950b\\u8292\\u4f46\\u5e76\\u4e0d\\u663e\\u9732\\u3002\\u51ed\\u81ea\\u5df1\\u7684\\u53e3\\u624d\\u4e0e\\u5e7f\\u6cdb\\u7684\\u77e5\\u8bc6\\u9762\\uff0c\\u4f60\\u5f88\\u64c5\\u957f\\u8c03\\u8282\\u6c14\\u6c1b\\uff0c\\u4e5f\\u64c5\\u957f\\u5229\\u7528\\u73b0\\u573a\\u73af\\u5883\\u4e3a\\u81ea\\u5df1\\u52a0\\u5206~\",\"sharetitle\":\"\\u4f60\\u7684\\u60c5\\u5546\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u662f\\uff1a100%\\uff01\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570200%br\\u843d\\u843d\\u5927\\u65b9\\u7684\\u5b8c\\u7f8e\\u5b58\\u5728\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570100%br\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u60c5\\u5546\\u6307\\u657050%br\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\u5566\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u60c5\\u5546\\u6307\\u657020%br\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513926307Yqoxc.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u60c5\\u5546\\u6307\\u657050%br\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\u5566\\uff01\",\"img\":\"quce\\/quiz-5007-FPkT3pjzHM.jpg\",\"desc\":\"\\u4f60\\u7684\\u60c5\\u5546\\u4e0d\\u7b97\\u592a\\u4f4e\\uff0c\\u4f60\\u7684\\u4e2a\\u6027\\u975e\\u5e38\\u72ec\\u7279\\uff0c\\u5e38\\u5e38\\u8ba9\\u4eba\\u89c9\\u5f97\\u5f88\\u65b0\\u9c9c\\uff0c\\u800c\\u4e14\\u4f60\\u8fd8\\u6709\\u4e00\\u5957\\u81ea\\u5df1\\u7684\\u5904\\u4e16\\u539f\\u5219\\uff0c\\u4f46\\u6709\\u65f6\\u4f60\\u4e5f\\u5341\\u5206\\u592a\\u4efb\\u6027\\uff0c\\u5e0c\\u671b\\u6309\\u7167\\u81ea\\u5df1\\u7684\\u60f3\\u6cd5\\u6765\\u3002\\u5982\\u679c\\u505a\\u5230\\u4e0d\\u610f\\u6c14\\u7528\\u4e8b\\uff0c\\u4f60\\u548c\\u5468\\u56f4\\u4eba\\u7684\\u5173\\u7cfb\\u4f1a\\u66f4\\u52a0\\u878d\\u6d3d\\u54e6~\",\"sharetitle\":\"\\u4f60\\u7684\\u60c5\\u5546\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u662f\\uff1a50%\\uff01\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570200%br\\u843d\\u843d\\u5927\\u65b9\\u7684\\u5b8c\\u7f8e\\u5b58\\u5728\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570100%br\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u60c5\\u5546\\u6307\\u657050%br\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\u5566\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u60c5\\u5546\\u6307\\u657020%br\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513926307Yqoxc.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u60c5\\u5546\\u6307\\u657020%br\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\",\"img\":\"quce\\/quiz-5007-Yfkmb7Pb3p.jpg\",\"desc\":\"\\u4f60\\u7684\\u60c5\\u5546\\u8fd8\\u662f\\u86ee\\u4f4e\\u7684\\uff0c\\u4e5f\\u53ef\\u80fd\\u662f\\u4f60\\u592a\\u5355\\u7eaf\\uff0c\\u800c\\u4e14\\u6d89\\u4e16\\u4e0d\\u6df1\\u3002\\u5728\\u81ea\\u5df1\\u7684\\u5c0f\\u4e16\\u754c\\u91cc\\u4f60\\u4fdd\\u6301\\u7740\\u4e0d\\u53d8\\u7684\\u770b\\u6cd5\\uff0c\\u4f46\\u662f\\u4f60\\u4e0d\\u77e5\\u9053\\u4e16\\u754c\\u53d8\\u5316\\u5f88\\u5feb\\uff0c\\u4eba\\u5fc3\\u4e5f\\u662f\\u9694\\u809a\\u76ae\\uff0c\\u6240\\u4ee5\\u7ecf\\u5e38\\u88ab\\u4eba\\u5751\\uff0c\\u53d7\\u6b3a\\u8d1f\\u4e5f\\u611f\\u89c9\\u4e0d\\u5230\\uff0c\\u5355\\u7eaf\\u7684\\u4f60\\u5feb\\u70b9\\u957f\\u5927\\u5427\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u60c5\\u5546\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u662f\\uff1a20%\\uff01\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570200%br\\u843d\\u843d\\u5927\\u65b9\\u7684\\u5b8c\\u7f8e\\u5b58\\u5728\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u60c5\\u5546\\u6307\\u6570100%br\\u673a\\u667a\\u5982\\u6211\\u4e0d\\u5706\\u6ed1\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u60c5\\u5546\\u6307\\u657050%br\\u6709\\u65f6\\u5019\\u592a\\u4efb\\u6027\\u5566\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u60c5\\u5546\\u6307\\u657020%br\\u5355\\u7eaf\\u5982\\u6211\\u957f\\u4e0d\\u5927\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513926307Yqoxc.png\",\"account\":1003}" },
	];

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 30) {
		data = data1[3];

	} else if (_num < 45 && _num >= 30) {
		data = data1[2];

	} else if (_num < 65 && _num >= 45) {
		data = data1[1];

	} else if (_num >= 65) {
		data = data1[0];

	}

	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 2);

	}

}

