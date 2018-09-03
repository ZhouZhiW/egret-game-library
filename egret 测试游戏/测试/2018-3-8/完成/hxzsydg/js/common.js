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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a1%br\\u75f4\\u5fc3\\u7edd\\u5bf9\",\"img\":\"quce\\/quiz-6003-N3B7QPk4n6.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u6734\\u5b9e\\u7684\\u4eba\\uff0c\\u5f88\\u5c11\\u53bb\\u82b1\\u5fc3\\u3002\\u4f60\\u559c\\u6b22\\u5b89\\u9759\\u7b80\\u5355\\u7684\\u751f\\u6d3b\\uff0c\\u4e0d\\u559c\\u6b22\\u592a\\u591a\\u53bb\\u4e89\\u53bb\\u62fc\\uff0c\\u4f60\\u5bf9\\u611f\\u60c5\\u65e0\\u6bd4\\u4e13\\u60c5\\uff0c\\u65e0\\u6bd4\\u6b7b\\u5fc3\\u773c\\u3002\\u4f60\\u53ea\\u6709\\u5728\\u9762\\u5bf9\\u81ea\\u5df1\\u559c\\u6b22\\u7684\\u4eba\\u7684\\u65f6\\u5019\\uff0c\\u624d\\u4f1a\\u5316\\u8eab\\u60c5\\u5723\\u3002\\u5f53\\u4f60\\u597d\\u4e0d\\u5bb9\\u6613\\u9047\\u5230\\u4e00\\u4e2a\\u771f\\u5fc3\\u76f8\\u7231\\u7684\\u4eba\\uff0c\\u4f60\\u4e00\\u5b9a\\u4f1a\\u975e\\u5e38\\u52aa\\u529b\\u7684\\u7ecf\\u8425\\u597d\\u8fd9\\u6bb5\\u611f\\u60c5\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u82b1\\u5fc3\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u82b1\\u5fc3\\u6307\\u65701%\\uff0c\\u75f4\\u5fc3\\u7edd\\u5bf9\\uff01\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a99%br\\u751f\\u6027\\u98ce\\u6d41\",\"oldimg\":\"quce\\/151762933314KU3.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%br\\u64a9\\u5b8c\\u5c31\\u6e9c\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"},{\"threshold\":\"C\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%br\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\",\"oldimg\":\"quce\\/1517629346bop61.jpeg\"},{\"threshold\":\"D\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a1%br\\u75f4\\u5fc3\\u7edd\\u5bf9\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205609948xUJa.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%br\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\",\"img\":\"quce\\/quiz-6003-eRZ3wJ78aQ.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u4e50\\u89c2\\u5411\\u4e0a\\u7684\\u4eba\\uff0c\\u6027\\u683c\\u5f88\\u597d\\uff0c\\u6240\\u4ee5\\u670b\\u53cb\\u4e5f\\u5f88\\u591a\\uff0c\\u611f\\u60c5\\u4e2d\\u4f60\\u662f\\u4e00\\u4e2a\\u6bd4\\u8f83\\u61c2\\u5f97\\u8fd0\\u7528\\u7b56\\u7565\\u7684\\u4eba\\uff0c\\u4f60\\u5fc3\\u4e2d\\u5076\\u5c14\\u4f1a\\u6e34\\u671b\\u4e0e\\u66f4\\u591a\\u5f02\\u6027\\u76f8\\u5904\\uff0c\\u4f46\\u7406\\u667a\\u4e0a\\u5374\\u61c2\\u5f97\\u5982\\u4f55\\u63a7\\u5236\\uff0c\\u6bd5\\u7adf\\u4e00\\u65f6\\u7684\\u65b0\\u9c9c\\u611f\\u8fd8\\u4e0d\\u80fd\\u8ba9\\u4f60\\u6709\\u6240\\u52a8\\u6447\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u82b1\\u5fc3\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%\\uff0c\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\\u3002\",\"oldimg\":\"quce\\/1517629346bop61.jpeg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a99%br\\u751f\\u6027\\u98ce\\u6d41\",\"oldimg\":\"quce\\/151762933314KU3.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%br\\u64a9\\u5b8c\\u5c31\\u6e9c\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"},{\"threshold\":\"C\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%br\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\",\"oldimg\":\"quce\\/1517629346bop61.jpeg\"},{\"threshold\":\"D\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a1%br\\u75f4\\u5fc3\\u7edd\\u5bf9\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205609948xUJa.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%br\\u64a9\\u5b8c\\u5c31\\u6e9c\",\"img\":\"quce\\/quiz-6003-MMwPYGceCw.png\",\"desc\":\"\\u4f5c\\u4e3a\\u884c\\u8d70\\u53d1\\u7535\\u673a\\u7684\\u4f60\\u8d70\\u5230\\u54ea\\u90fd\\u80fd\\u5438\\u5f15\\u5230\\u4e0d\\u5c11\\u5f02\\u6027\\uff0c\\u4e0d\\u8fc7\\u53ea\\u6709\\u5bf9\\u5473\\u513f\\u7684\\u4eba\\u624d\\u4f1a\\u6fc0\\u53d1\\u4f60\\u7684\\u98ce\\u6d41\\u57fa\\u56e0\\uff0c\\u4f60\\u559c\\u6b22\\u90a3\\u79cd\\u8ffd\\u6c42\\u65b0\\u9c9c\\u4e8b\\u7269\\u7684\\u523a\\u6fc0\\u611f\\uff0c\\u4e0d\\u559c\\u6b22\\u88ab\\u4e00\\u6bb5\\u611f\\u60c5\\u675f\\u7f1a\\uff0c\\u56e0\\u6b64\\u603b\\u662f\\u64a9\\u5b8c\\u5c31\\u6e9c\\u7684\\u4f60\\uff0c\\u5728\\u65c1\\u4eba\\u773c\\u91cc\\u662f\\u4e00\\u4e2a\\u4e0d\\u6298\\u4e0d\\u6263\\u7684\\u82b1\\u5fc3\\u5927\\u841d\\u535c\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u82b1\\u5fc3\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%\\uff0c\\u82b1\\u5fc3\\u5927\\u841d\\u535c\\uff01\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a99%br\\u751f\\u6027\\u98ce\\u6d41\",\"oldimg\":\"quce\\/151762933314KU3.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%br\\u64a9\\u5b8c\\u5c31\\u6e9c\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"},{\"threshold\":\"C\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%br\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\",\"oldimg\":\"quce\\/1517629346bop61.jpeg\"},{\"threshold\":\"D\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a1%br\\u75f4\\u5fc3\\u7edd\\u5bf9\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205609948xUJa.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a99%br\\u751f\\u6027\\u98ce\\u6d41\",\"img\":\"quce\\/quiz-6003-TE6RrEPEKC.png\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u8868\\u9762\\u4e0a\\u5f88\\u82b1\\u5fc3\\u7684\\u4eba\\uff0c\\u751f\\u6027\\u98ce\\u6d41\\u7684\\u4f60\\u603b\\u662f\\u6d41\\u8fde\\u82b1\\u4e1b\\u4e2d\\uff0c\\u4eca\\u5929\\u64a9\\u64a9\\u8fd9\\u4e2a\\uff0c\\u660e\\u5929\\u9017\\u9017\\u90a3\\u4e2a\\u3002\\u5b9e\\u9645\\u4e0a\\uff0c\\u4f60\\u7684\\u5185\\u5fc3\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u5bc2\\u5be5\\u7684\\u4eba\\uff0c\\u53ea\\u6709\\u5728\\u72ec\\u5904\\u7684\\u65f6\\u5019\\u4f60\\u624d\\u4f1a\\u628a\\u98ce\\u6d41\\u591a\\u60c5\\u7684\\u4e00\\u9762\\u6536\\u8d77\\u6765\\uff0c\\u4f60\\u7684\\u82b1\\u5fc3\\u4e0d\\u8fc7\\u662f\\u4f60\\u7684\\u4f2a\\u88c5\\uff0c\\u5047\\u88c5\\u81ea\\u5df1\\u4e0d\\u5728\\u4e4e\\uff0c\\u5047\\u88c5\\u81ea\\u5df1\\u5f88\\u5f3a\\u5927\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u82b1\\u5fc3\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u82b1\\u5fc3\\u6307\\u657099%\\uff0c\\u751f\\u6027\\u98ce\\u6d41\\u3002\",\"oldimg\":\"quce\\/151762933314KU3.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a99%br\\u751f\\u6027\\u98ce\\u6d41\",\"oldimg\":\"quce\\/151762933314KU3.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a68%br\\u64a9\\u5b8c\\u5c31\\u6e9c\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"},{\"threshold\":\"C\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a39%br\\u6709\\u8d3c\\u5fc3\\u6ca1\\u8d3c\\u80c6\",\"oldimg\":\"quce\\/1517629346bop61.jpeg\"},{\"threshold\":\"D\",\"title\":\"\\u82b1\\u5fc3\\u6307\\u6570\\uff1a1%br\\u75f4\\u5fc3\\u7edd\\u5bf9\",\"oldimg\":\"quce\\/1517629351hDxWF.jpeg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205609948xUJa.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 16 && _num >= 10) {
		data = data1[1];

	} else if (_num < 20 && _num >= 16) {
		data = data1[2];

	} else if (_num >= 20) {
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

