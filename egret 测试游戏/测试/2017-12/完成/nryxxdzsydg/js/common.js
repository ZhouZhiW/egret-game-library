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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05br\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\",\"img\":\"quce\\/quiz-5989-h6kncyEbMP.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u6709\\u70b9\\u95f7\\u9a9a\\uff0c\\u4e0e\\u4eba\\u76f8\\u5904\\u65f6\\u4e5f\\u6709\\u4e9b\\u6162\\u70ed\\uff0c\\u65f6\\u5e38\\u4f1a\\u7ed9\\u4eba\\u7559\\u4e0b\\u9ad8\\u51b7\\u96be\\u4ee5\\u76f8\\u5904\\u7684\\u611f\\u89c9\\u3002\\u4f46\\u5c31\\u662f\\u8fd9\\u79cd\\u5929\\u751f\\u7684\\u795e\\u79d8\\u6c14\\u8d28\\u8303\\u513f\\u53cd\\u800c\\u6700\\u5bb9\\u6613\\u8ba9\\u5f02\\u6027\\u6026\\u7136\\u5fc3\\uff0c\\u5c31\\u50cf\\u4e00\\u4e2a\\u8c1c\\u56e2\\uff0c\\u5145\\u6ee1\\u4e86\\u8bf1\\u60d1\\u529b\\uff0c\\u5373\\u4f7f\\u662f\\u98de\\u86fe\\u6251\\u706b\\uff0c\\u4e5f\\u8ba9\\u4eba\\u4e0d\\u987e\\u4e00\\u5207\\u7684\\u60f3\\u8981\\u53bb\\u9760\\u8fd1\\u4f60\\uff0c\\u4e86\\u89e3\\u4f60\\u7684\\u4e00\\u5207\\u3002\\n<br>\",\"sharetitle\":\"\\u4f60\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05\\uff0c\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\"}","status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05br\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05br\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05br\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1516608000Gq1gG.png\",\"account\":1003}" },
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05br\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\",\"img\":\"quce\\/quiz-5989-nNcyx7dGz6.jpg\",\"desc\":\"\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u4e3a\\u4eba\\u5927\\u65b9\\u5f97\\u4f53\\uff0c\\u8eab\\u8fb9\\u7684\\u5f02\\u6027\\u7f18\\u53ef\\u4ee5\\u8bf4\\u662f\\u5f88\\u4e0d\\u9519\\u3002\\u4f60\\u662f\\u90a3\\u79cd\\u76f8\\u5904\\u8d8a\\u4e45\\u8d8a\\u4f1a\\u9677\\u5165\\u5230\\u4f60\\u7684\\u4e2a\\u4eba\\u9b45\\u529b\\u4e2d\\u65e0\\u6cd5\\u81ea\\u62d4\\u7684\\u7c7b\\u578b\\uff0c\\u5c31\\u50cf\\u915d\\u917f\\u4e86\\u8bb8\\u4e45\\u7684\\u9648\\u5e74\\u8001\\u9152\\uff0c\\u8d8a\\u559d\\u8d8a\\u6709\\u5473\\u9053\\uff0c\\u8eab\\u8fb9\\u7684\\u5f02\\u6027\\u5f88\\u5bb9\\u6613\\u88ab\\u4f60\\u7684\\u8fd9\\u79cd\\u6027\\u683c\\u6240\\u611f\\u67d3\\uff0c\\u6700\\u7ec8\\u4e3a\\u4f60\\u72ec\\u7279\\u7684\\u6027\\u683c\\u9b45\\u529b\\u6240\\u5fc3\\u52a8\\u3002\",\"sharetitle\":\"\\u4f60\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05\\uff0c\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05br\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05br\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05br\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608000Gq1gG.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05br\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\",\"img\":\"quce\\/quiz-5989-5iA5cmEHKi.jpg\",\"desc\":\"\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u6e29\\u67d4\\u4f53\\u8d34\\uff0c\\u5f85\\u4eba\\u7ec6\\u5fc3\\uff0c\\u4e0e\\u4eba\\u76f8\\u5904\\u65f6\\u603b\\u80fd\\u66ff\\u5bf9\\u65b9\\u7740\\u60f3\\uff0c\\u53ef\\u4ee5\\u8bf4\\u662f\\u5341\\u5206\\u8d34\\u5fc3\\u7684\\u4e00\\u4e2a\\u4eba\\u4e86\\u3002\\u800c\\u4f60\\u6700\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u7684\\u5730\\u65b9\\u5c31\\u5728\\u4e8e\\u4f60\\u7684\\u7b11\\u5bb9\\uff0c\\u5f00\\u6717\\u7684\\u4e2a\\u6027\\u914d\\u4e0a\\u4f60\\u6807\\u5fd7\\u6027\\u7684\\u7b11\\u5bb9\\uff0c\\u611f\\u89c9\\u6574\\u4e2a\\u4e16\\u754c\\u90fd\\u53d8\\u5f97\\u7f8e\\u597d\\u4e86\\uff0c\\u53ef\\u4ee5\\u8bf4\\u662f\\u6740\\u4f24\\u529b\\u5341\\u8db3\\uff0c\\u8ba9\\u4eba\\u5fc3\\u52a8\\u4e5f\\u603b\\u662f\\u5728\\u90a3\\u4e00\\u77ac\\u95f4\\u3002\",\"sharetitle\":\"\\u4f60\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05\\uff0c\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05br\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05br\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05br\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608000Gq1gG.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\",\"img\":\"quce\\/quiz-5989-TYMdtNN8sb.jpg\",\"desc\":\"\\u4f60\\u5728\\u5916\\u5f62\\u4e0a\\u5c31\\u5c5e\\u4e8e\\u8ba9\\u4eba\\u5fc3\\u52a8\\u7684\\u7c7b\\u578b\\uff0c\\u62e5\\u6709\\u7740\\u8f83\\u597d\\u7684\\u9762\\u5bb9\\uff0c\\u518d\\u52a0\\u4e0a\\u4f60\\u8fd8\\u5f88\\u4f1a\\u6253\\u626e\\u81ea\\u5df1\\uff0c\\u77e5\\u9053\\u5982\\u4f55\\u7a81\\u51fa\\u81ea\\u8eab\\u7684\\u4f18\\u52bf\\uff0c\\u5728\\u4efb\\u4f55\\u573a\\u5408\\u90fd\\u5f88\\u5bb9\\u6613\\u5c31\\u5438\\u5f15\\u4f4f\\u5f02\\u6027\\u7684\\u773c\\u5149\\u3002\\u6240\\u4ee5\\u4e00\\u89c1\\u949f\\u60c5\\u8fd9\\u79cd\\u4e8b\\u4e5f\\u5e38\\u4f1a\\u53d1\\u751f\\u5728\\u4f60\\u8eab\\u4e0a\\uff0c\\u6bd5\\u7adf\\u8fd9\\u662f\\u4e2a\\u770b\\u8138\\u7684\\u4e16\\u754c\\uff0c\\u4f60\\u8fd9\\u989c\\u503c\\u548c\\u6c14\\u8d28\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u5b8c\\u5168\\u5c31\\u662f\\u5206\\u5206\\u949f\\u7684\\u4e8b\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u8ba9\\u5f02\\u6027\\u5fc3\\u52a8\\u7684\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05\\uff0c\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u89c1\\u949f\\u60c5\\u578b\\uff0c\\u989c\\u5373\\u6b63\\u4e49\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a160\\uff05br\\u6026\\u7136\\u5fc3\\u52a8\\uff0c\\u6740\\u4f24\\u529b\\u5341\\u8db3\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a99\\uff05br\\u70ed\\u60c5\\u8c6a\\u723d\\uff0c\\u9b45\\u529b\\u5341\\u8db3\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u52a8\\u6307\\u6570\\uff1a85\\uff05br\\u6c14\\u8d28\\u6210\\u8c1c\\uff0c\\u8bf1\\u60d1\\u529b\\u6ee1\\u6ee1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608000Gq1gG.png\",\"account\":1003}"},
	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[0];

	} else if (_num < 15 && _num >= 10) {
		data = data1[1];

	} else if (_num < 20 && _num >= 15) {
		data = data1[2];

	} else if (_num >= 20) {
		data = data1[3];
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

