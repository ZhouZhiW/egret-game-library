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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\",\"img\":\"quce\\/quiz-5621-WXiH2sjjPn.jpg\",\"desc\":\"\\u4f60\\u7684\\u8d23\\u4efb\\u611f\\u5f88\\u5f3a\\uff0c\\u4e3a\\u4eba\\u7ec6\\u5fc3\\u505a\\u4e8b\\u8ba4\\u771f\\uff0c\\u201c\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\\u201d\\u5411\\u6765\\u5c31\\u662f\\u4f60\\u7684\\u4e3a\\u4eba\\u539f\\u5219\\u3002\\u6240\\u4ee5\\u670b\\u53cb\\u62dc\\u6258\\u7ed9\\u4f60\\u7684\\u4e8b\\u60c5\\uff0c\\u4f60\\u4e00\\u5b9a\\u4f1a\\u628a\\u5b83\\u5f53\\u4f5c\\u662f\\u81ea\\u5df1\\u7684\\u4e8b\\u60c5\\uff0c\\u5c3d\\u5df1\\u6240\\u80fd\\u7684\\u53bb\\u8fbe\\u6210\\u3002\\u5f53\\u670b\\u53cb\\u9700\\u8981\\u5e2e\\u52a9\\u65f6\\uff0c\\u4f60\\u4e5f\\u603b\\u662f\\u7b2c\\u4e00\\u4e2a\\u4f38\\u51fa\\u63f4\\u624b\\uff0c\\u5c06\\u81ea\\u5df1\\u9760\\u8c31\\u7684\\u6027\\u683c\\u53d1\\u6325\\u5230\\u6781\\u81f4\\uff0c\\u5b8c\\u5b8c\\u5168\\u5168\\u8ba9\\u4eba\\u5f88\\u662f\\u7701\\u5fc3\\u5462\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u9760\\u8c31\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05\\uff0c\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\"},{\"threshold\":\"B\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05br\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\"},{\"threshold\":\"C\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05br\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\"},{\"threshold\":\"D\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05br\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515492026Uh3zB.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05br\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\",\"img\":\"quce\\/quiz-5621-Xnmy2hNYbi.jpg\",\"desc\":\"\\u4f60\\u5c31\\u662f\\u9760\\u8c31\\u7684\\u4ee3\\u8a00\\u4eba\\uff01\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u662f\\u4e00\\u4e2a\\u70ed\\u60c5\\u5f00\\u6717\\uff0c\\u79ef\\u6781\\u5411\\u4e0a\\u7684\\u4eba\\uff0c\\u5f88\\u559c\\u6b22\\u5e2e\\u52a9\\u522b\\u4eba\\u3002\\u4f60\\u7684\\u6267\\u884c\\u529b\\u5f88\\u5f3a\\uff0c\\u4e00\\u65e6\\u7b54\\u5e94\\u4e86\\u522b\\u4eba\\u7684\\u4e8b\\uff0c\\u8bf4\\u5e72\\u5c31\\u5e72\\u7edd\\u4e0d\\u62d6\\u5ef6\\uff0c\\u800c\\u4e14\\u7ed3\\u679c\\u4e5f\\u4ece\\u672a\\u8ba9\\u4eba\\u5931\\u671b\\u8fc7\\uff0c\\u884c\\u4e8b\\u98ce\\u683c\\u5b8c\\u7f8e\\u7684\\u5730\\u8be0\\u91ca\\u4e86\\u4ec0\\u4e48\\u53eb\\u201c\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\\u201d\\uff0c\\u529e\\u8d77\\u4e8b\\u6765\\u53ef\\u4ee5\\u8bf4\\u662f\\u76f8\\u5f53\\u7684\\u7262\\u9760\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u9760\\u8c31\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05\\uff0c\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\"},{\"threshold\":\"B\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05br\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\"},{\"threshold\":\"C\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05br\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\"},{\"threshold\":\"D\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05br\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515492026Uh3zB.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05br\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\",\"img\":\"quce\\/quiz-5621-8ymrQ6S4bC.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5584\\u826f\\u7684\\u4eba\\uff0c\\u4e3a\\u4eba\\u7ec6\\u5fc3\\u4f53\\u8d34\\uff0c\\u529e\\u4e8b\\u51b7\\u9759\\u6c89\\u7740\\u3002\\u6709\\u65f6\\u53ea\\u662f\\u8eab\\u8fb9\\u4eba\\u968f\\u53e3\\u63d0\\u53ca\\u7684\\u4e00\\u53e5\\u8bdd\\uff0c\\u4f60\\u90fd\\u4f1a\\u8bb0\\u5728\\u5fc3\\u91cc\\u7136\\u540e\\u9ed8\\u9ed8\\u5730\\u53bb\\u4e3a\\u5bf9\\u65b9\\u505a\\u5230\\uff0c\\u66f4\\u522b\\u8bf4\\u662f\\u522b\\u4eba\\u5411\\u4f60\\u4ea4\\u4ee3\\u7684\\u4e8b\\u60c5\\u4e86\\u3002\\u800c\\u4e14\\u4f60\\u603b\\u662f\\u80fd\\u7ed9\\u5230\\u8eab\\u8fb9\\u4eba\\u6709\\u7528\\u7684\\u5efa\\u8bae\\u548c\\u5e2e\\u52a9\\uff0c\\u5728\\u670b\\u53cb\\u4e2d\\u5c5e\\u4e8e\\u8ba9\\u4eba\\u5fcd\\u4e0d\\u4f4f\\u60f3\\u8981\\u4f9d\\u9760\\u7684\\u7c7b\\u578b\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u9760\\u8c31\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05\\uff0c\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\"},{\"threshold\":\"B\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05br\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\"},{\"threshold\":\"C\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05br\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\"},{\"threshold\":\"D\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05br\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515492026Uh3zB.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05br\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\",\"img\":\"quce\\/quiz-5621-ZEA4BcRcaM.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u6015\\u9ebb\\u70e6\\u7684\\u4eba\\uff0c\\u6d3b\\u7684\\u4e5f\\u6bd4\\u8f83\\u968f\\u610f\\u6d12\\u8131\\uff0c\\u5e72\\u4ec0\\u4e48\\u90fd\\u662f\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\\u3002\\u6027\\u683c\\u5927\\u5927\\u54a7\\u54a7\\u7684\\u4f60\\u5f88\\u5bb9\\u6613\\u610f\\u6c14\\u7528\\u4e8b\\uff0c\\u65f6\\u5e38\\u51b2\\u52a8\\u6027\\u7684\\u505a\\u51fa\\u4e00\\u4e9b\\u4e0d\\u7406\\u667a\\u7684\\u51b3\\u5b9a\\uff0c\\u603b\\u662f\\u4f1a\\u7ed9\\u8eab\\u8fb9\\u4eba\\u5e26\\u6765\\u4e00\\u4e9b\\u4e0d\\u5fc5\\u8981\\u7684\\u9ebb\\u70e6\\uff0c\\u6240\\u4ee5\\u5728\\u522b\\u4eba\\u7684\\u773c\\u91cc\\uff0c\\u4f60\\u5e76\\u4e0d\\u662f\\u4e00\\u4e2a\\u7279\\u522b\\u9760\\u8c31\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u9760\\u8c31\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05\\uff0c\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a300\\uff05br\\u4e00\\u8a00\\u65e2\\u51fa\\uff0c\\u9a77\\u9a6c\\u96be\\u8ffd\"},{\"threshold\":\"B\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a180\\uff05br\\u8a00\\u5fc5\\u51fa\\uff0c\\u884c\\u5fc5\\u679c\"},{\"threshold\":\"C\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a98\\uff05br\\u6c89\\u7740\\u51b7\\u9759\\uff0c\\u7ec6\\u5fc3\\u4f53\\u8d34\"},{\"threshold\":\"D\",\"title\":\"\\u9760\\u8c31\\u6307\\u6570\\uff1a50\\uff05br\\u505a\\u4e8b\\u4e09\\u5206\\u949f\\u70ed\\u5ea6\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515492026Uh3zB.png\",\"account\":1003}"},
	];


	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 12) {
		data = data1[3];

	} else if (_num < 16 && _num >= 12) {
		data = data1[2];

	} else if (_num < 20 && _num >= 16) {
		data = data1[1];

	} else if (_num >= 20) {
		data = data1[0];

	}
	/*  hasContent*/

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

