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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a1\\u7ea7br\\u5355\\u7eaf\\u5584\\u826f\\u5982\\u767d\\u7eb8\",\"img\":\"quce\\/quiz-4913-HXzYp4dbif.jpg\",\"desc\":\"\\u4f60\\u8fd8\\u5355\\u7eaf\\u7684\\u5982\\u767d\\u7eb8\\u4e00\\u6837\\uff0c\\u89c9\\u5f97\\u4e16\\u95f4\\u5145\\u6ee1\\u4e86\\u7f8e\\u597d\\u3002\\u6240\\u4ee5\\u4f60\\u4ece\\u4e0d\\u4f1a\\u800d\\u5c0f\\u624b\\u6bb5\\uff0c\\u6216\\u6253\\u5c0f\\u7b97\\u76d8\\u6765\\u5751\\u5bb3\\u522b\\u4eba\\uff0c\\u4f60\\u76f8\\u4fe1\\u4e00\\u5207\\u90fd\\u4f1a\\u5f52\\u4e8e\\u7f8e\\u597d\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u662f1\\u7ea7\\uff0c\\u5355\\u7eaf\\u5584\\u826f\\uff0c\\u5b8c\\u5168\\u6ca1\\u5fc3\\u673a\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a10\\u7ea7br\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u516b\\u9762\\u73b2\\u73d1\\u3001\\u6240\\u5411\\u62ab\\u9761\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5927\\u5927\\u54a7\\u54a7\\u6ca1\\u5fc3\\u773c\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a1\\u7ea7br\\u5355\\u7eaf\\u5584\\u826f\\u5982\\u767d\\u7eb8\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515466817KM3kM.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5927\\u5927\\u54a7\\u54a7\\u6ca1\\u5fc3\\u773c\",\"img\":\"quce\\/quiz-4913-idhX2AXkTh.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u76f4\\u723d\\uff0c\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u8bf4\\u8bdd\\u76f4\\u6765\\u76f4\\u5f80\\uff0c\\u53ef\\u80fd\\u4f24\\u5230\\u4e86\\u5bf9\\u65b9\\uff0c\\u4f46\\u4f60\\u8fd8\\u4e0d\\u77e5\\u9053\\u3002\\u6240\\u4ee5\\uff0c\\u5c31\\u7b97\\u4f60\\u6709\\u4e86\\u5c0f\\u5fc3\\u601d\\uff0c\\u4e5f\\u4f1a\\u5168\\u90e8\\u8868\\u73b0\\u5728\\u8138\\u4e0a\\uff0c\\u522b\\u4eba\\u4e00\\u770b\\u5c31\\u660e\\u767d\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u662f4\\u7ea7\\uff0c\\u5927\\u5927\\u54a7\\u54a7\\uff0c\\u6ca1\\u5fc3\\u773c\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a10\\u7ea7br\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u516b\\u9762\\u73b2\\u73d1\\u3001\\u6240\\u5411\\u62ab\\u9761\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5927\\u5927\\u54a7\\u54a7\\u6ca1\\u5fc3\\u773c\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a1\\u7ea7br\\u5355\\u7eaf\\u5584\\u826f\\u5982\\u767d\\u7eb8\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515466817KM3kM.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u516b\\u9762\\u73b2\\u73d1\\u3001\\u6240\\u5411\\u62ab\\u9761\",\"img\":\"quce\\/quiz-4913-4AEhZnksmD.jpg\",\"desc\":\"\\u4f60\\u61c2\\u5f97\\u5f88\\u591a\\uff0c\\u77e5\\u9053\\u600e\\u4e48\\u505a\\u4f1a\\u66f4\\u5b8c\\u7f8e\\uff1b\\u4f60\\u5f88\\u64c5\\u957f\\u5bdf\\u8a00\\u89c2\\u8272\\uff0c\\u77e5\\u9053\\u600e\\u6837\\u7ef4\\u62a4\\u590d\\u6742\\u7684\\u4eba\\u9645\\u5173\\u7cfb\\u3002\\u4f46\\u592a\\u806a\\u660e\\u7684\\u8868\\u73b0\\uff0c\\u4f1a\\u8ba9\\u522b\\u4eba\\u5bf9\\u4f60\\u6709\\u6240\\u6212\\u5907\\u3002\\u6240\\u4ee5\\u4f60\\u5e94\\u8be5\\u5b66\\u4e60\\u5982\\u4f55\\u9690\\u85cf\\u5fc3\\u673a\\uff0c\\u5c31\\u50cf\\u5373\\u4f7f\\u4f60\\u662f\\u5927\\u8001\\u864e\\uff0c\\u4e5f\\u8981\\u88c5\\u6210\\u4e00\\u53ea\\u5c0f\\u767d\\u5154\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u662f7\\u7ea7\\uff0c\\u516b\\u9762\\u73b2\\u73d1\\uff0c\\u6240\\u5411\\u62ab\\u9761\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a10\\u7ea7br\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u516b\\u9762\\u73b2\\u73d1\\u3001\\u6240\\u5411\\u62ab\\u9761\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5927\\u5927\\u54a7\\u54a7\\u6ca1\\u5fc3\\u773c\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a1\\u7ea7br\\u5355\\u7eaf\\u5584\\u826f\\u5982\\u767d\\u7eb8\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515466817KM3kM.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a10\\u7ea7br\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\",\"img\":\"quce\\/quiz-4913-FfHf43Pyjh.jpg\",\"desc\":\"\\u5916\\u4eba\\u89c9\\u5f97\\u4f60\\u662f\\u4e00\\u4e2a\\u5b9e\\u5b9e\\u5728\\u5728\\u7684\\u4eba\\uff0c\\u5b8c\\u5168\\u6ca1\\u5fc3\\u673a\\u3002\\u4f46\\u4f60\\u81ea\\u5df1\\u77e5\\u9053\\uff0c\\u4f60\\u5e76\\u4e0d\\u50cf\\u770b\\u8d77\\u6765\\u90a3\\u6837\\u7b80\\u5355\\uff0c\\u4e00\\u65e6\\u76ee\\u6807\\u9501\\u5b9a\\uff0c\\u4f60\\u5c31\\u4f1a\\u5728\\u795e\\u4e0d\\u77e5\\u9b3c\\u4e0d\\u89c9\\u7684\\u60c5\\u51b5\\u4e0b\\u5f97\\u5230\\u5b83\\u3002\\u6240\\u4ee5\\u8bba\\u5fc3\\u673a\\uff0c\\u6ca1\\u4eba\\u80fd\\u6bd4\\u5f97\\u8fc7\\u4f60\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5fc3\\u673a\\u7b49\\u7ea7\\u662f10\\u7ea7\\uff0c\\u5916\\u8868\\u50bb\\u767d\\u751c\\uff0c\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a10\\u7ea7br\\u57ce\\u5e9c\\u6df1\\u4f3c\\u6d77\"},{\"threshold\":\"B\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a7\\u7ea7br\\u516b\\u9762\\u73b2\\u73d1\\u3001\\u6240\\u5411\\u62ab\\u9761\"},{\"threshold\":\"C\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a4\\u7ea7br\\u5927\\u5927\\u54a7\\u54a7\\u6ca1\\u5fc3\\u773c\"},{\"threshold\":\"D\",\"title\":\"\\u5fc3\\u673a\\u7b49\\u7ea7\\uff1a1\\u7ea7br\\u5355\\u7eaf\\u5584\\u826f\\u5982\\u767d\\u7eb8\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515466817KM3kM.png\",\"account\":1003}"},

	]



	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 9) {
		data = data1[0];

	} else if (_num < 14 && _num >= 9) {
		data = data1[1];

	} else if (_num < 20 && _num >= 14) {
		data = data1[2];
	}else if (_num >= 20) {
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

