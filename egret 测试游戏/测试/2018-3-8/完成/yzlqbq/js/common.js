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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a200%br\\u4ece\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"img\":\"quce\\/quiz-5628-5TNXHEHdt7.jpg\",\"desc\":\"\\u4f60\\u6709\\u81ea\\u5df1\\u72ec\\u7acb\\u7684\\u8ba4\\u77e5\\u4f53\\u7cfb\\uff0c\\u4ece\\u6765\\u4e0d\\u4eba\\u4e91\\u4ea6\\u4e91\\uff0c\\u6240\\u4ee5\\u4f60\\u505a\\u51b3\\u5b9a\\u7684\\u65f6\\u5019\\u4e5f\\u4e0d\\u4f1a\\u62d6\\u6ce5\\u5e26\\u6c34\\u3002\\u4e00\\u65e6\\u51b3\\u5b9a\\u4e86\\uff0c\\u4f60\\u5c31\\u4f1a\\u4e0d\\u754f\\u8270\\u96be\\u9669\\u963b\\uff0c\\u52c7\\u5f80\\u76f4\\u524d\\u7684\\u3002\\u4f60\\u5185\\u5fc3\\u7684\\u575a\\u97e7\\u7a0b\\u5ea6\\u662f\\u975e\\u4e00\\u822c\\u7684\\uff0c\\u5982\\u679c\\u8fd9\\u6837\\u7684\\u4f60\\u4e0d\\u4f1a\\u53d6\\u5f97\\u6210\\u529f\\u7684\\u8bdd\\uff0c\\u6211\\u4f30\\u8ba1\\u6ca1\\u4ec0\\u4e48\\u4eba\\u80fd\\u6210\\u529f\\u4e86\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\u662f200%\\uff0c\\u6ca1\\u4eba\\u6bd4\\u6211\\u66f4\\u575a\\u5f3a\\uff01\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a200%br\\u4ece\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\"},{\"threshold\":\"B\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a100%br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u6253\\u5012\"},{\"threshold\":\"C\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a50%br\\u9760\\u7684\\u662f\\u667a\\u6167\\u4e0d\\u662f\\u86ee\\u5e72\"},{\"threshold\":\"D\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a30%br\\u4e0d\\u613f\\u96be\\u4e3a\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520582589JSOsX.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a50%br\\u9760\\u7684\\u662f\\u667a\\u6167\\u4e0d\\u662f\\u86ee\\u5e72\",\"img\":\"quce\\/quiz-5628-bnP2AbGHD4.jpg\",\"desc\":\"\\u4e00\\u822c\\u60c5\\u51b5\\u4e0b\\u4f60\\u7684\\u610f\\u5fd7\\u529b\\u5e76\\u4e0d\\u662f\\u5f88\\u5f3a\\uff0c\\u4f46\\u662f\\u4f60\\u5f80\\u5f80\\u90fd\\u80fd\\u53d6\\u5f97\\u4e00\\u5b9a\\u7684\\u6210\\u7ee9\\uff0c\\u90a3\\u662f\\u56e0\\u4e3a\\u9047\\u4e8b\\u4f60\\u603b\\u662f\\u5148\\u8c0b\\u5212\\u518d\\u884c\\u52a8\\u3002\\u8fd9\\u6837\\u4f60\\uff0c\\u770b\\u7740\\u4e0d\\u9760\\u8c31\\uff0c\\u5b9e\\u9645\\u6bd4\\u8c01\\u90fd\\u9760\\u8c31\\uff0c\\u5f53\\u4f60\\u9047\\u5230\\u80fd\\u4e3a\\u4e4b\\u4ed8\\u51fa\\u4e00\\u5207\\u7684\\u4e8b\\u60c5\\u65f6\\uff0c\\u4f60\\u4e5f\\u4f1a\\u6beb\\u4e0d\\u72b9\\u8c6b\\u7684\\u575a\\u6301\\u4e0b\\u53bb\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\u662f50%\\uff0c\\u53ea\\u9760\\u667a\\u6167\\u4e0d\\u9760\\u86ee\\u5e72\\uff01\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a200%br\\u4ece\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\"},{\"threshold\":\"B\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a100%br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u6253\\u5012\"},{\"threshold\":\"C\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a50%br\\u9760\\u7684\\u662f\\u667a\\u6167\\u4e0d\\u662f\\u86ee\\u5e72\"},{\"threshold\":\"D\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a30%br\\u4e0d\\u613f\\u96be\\u4e3a\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520582589JSOsX.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a100%br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u6253\\u5012\",\"img\":\"quce\\/quiz-5628-Kxpe8A3Eyb.jpg\",\"desc\":\"\\u66fe\\u7ecf\\u7684\\u4f60\\u4e5f\\u8106\\u5f31\\u8fc7\\uff0c\\u53ea\\u662f\\u4f60\\u61c2\\u5f97\\u201c\\u4f60\\u4e0d\\u575a\\u5f3a\\uff0c\\u4e5f\\u6ca1\\u4eba\\u66ff\\u4f60\\u52c7\\u6562\\u201d\\uff0c\\u6240\\u4ee5\\u4f60\\u5b66\\u4f1a\\u628a\\u6240\\u6709\\u4e8b\\u60c5\\u90fd\\u81ea\\u5df1\\u6297\\u3002\\u6e10\\u6e10\\u7684\\uff0c\\u4f60\\u7684\\u610f\\u5fd7\\u529b\\u4e5f\\u8d8a\\u6765\\u8d8a\\u5f3a\\uff0c\\u4e00\\u65e6\\u662f\\u4f60\\u8ba4\\u771f\\u51b3\\u5b9a\\u7684\\u4e8b\\uff0c\\u5c31\\u7b97\\u649e\\u4e86\\u5357\\u5899\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u56de\\u5934\\uff0c\\u4e0d\\u662f\\u56de\\u5934\\u6ca1\\u6709\\u9000\\u8def\\uff0c\\u800c\\u662f\\u4f60\\u60f3\\u5c3d\\u81ea\\u5df1\\u6700\\u5927\\u7684\\u52aa\\u529b\\u53bb\\u62fc\\u4e00\\u4efd\\u68a6\\u60f3\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\u662f100%\\uff0c\\u6ca1\\u4ec0\\u4e48\\u80fd\\u628a\\u6211\\u51fb\\u5012\\uff01\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a200%br\\u4ece\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\"},{\"threshold\":\"B\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a100%br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u6253\\u5012\"},{\"threshold\":\"C\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a50%br\\u9760\\u7684\\u662f\\u667a\\u6167\\u4e0d\\u662f\\u86ee\\u5e72\"},{\"threshold\":\"D\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a30%br\\u4e0d\\u613f\\u96be\\u4e3a\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520582589JSOsX.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a30%br\\u4e0d\\u613f\\u96be\\u4e3a\\u81ea\\u5df1\",\"img\":\"quce\\/quiz-5628-FXfS8AAXXt.jpg\",\"desc\":\"\\u4f60\\u89c9\\u5f97\\u4eba\\u751f\\u5df2\\u7ecf\\u5982\\u6b64\\u8270\\u96be\\uff0c\\u4f55\\u5fc5\\u518d\\u4e3a\\u96be\\u81ea\\u5df1\\u5462\\uff0c\\u56e0\\u6b64\\u4f60\\u505a\\u4e8b\\u7684\\u6001\\u5ea6\\u662f\\u968f\\u6027\\uff0c\\u800c\\u4e0d\\u662f\\u82e6\\u5b88\\uff0c\\u4f60\\u8ba4\\u4e3a\\u82e6\\u5b88\\u7684\\u7ed3\\u679c\\u5f88\\u53ef\\u80fd\\u662f\\u4e00\\u65e0\\u6240\\u83b7\\uff0c\\u90a3\\u5c31\\u4e0d\\u5fc5\\u6d6a\\u8d39\\u4eba\\u529b\\u7269\\u529b\\u4e86\\u3002\\u6240\\u4ee5\\u4f60\\u53ea\\u575a\\u6301\\u6709\\u628a\\u63e1\\u7684\\u4e8b\\uff0c\\u5f53\\u4f60\\u53d1\\u73b0\\u6210\\u529f\\u7684\\u673a\\u7387\\u5fae\\u4e4e\\u5176\\u5fae\\u7684\\u65f6\\u5019\\uff0c\\u4f60\\u4e5f\\u4f1a\\u679c\\u65ad\\u653e\\u5f03\\uff0c\\u4e0d\\u4f1a\\u5728\\u4e00\\u68f5\\u6811\\u4e0a\\u540a\\u6b7b\\u7684\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\u662f30%\\uff0c\\u4eba\\u751f\\u8270\\u96be\\uff0c\\u4e0d\\u5fc5\\u81ea\\u6211\\u4e3a\\u96be\\uff01\\u4f60\\u4e5f\\u6765\\u6d4b\\u6d4b\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a200%br\\u4ece\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\"},{\"threshold\":\"B\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a100%br\\u6c38\\u8fdc\\u4e0d\\u4f1a\\u88ab\\u6253\\u5012\"},{\"threshold\":\"C\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a50%br\\u9760\\u7684\\u662f\\u667a\\u6167\\u4e0d\\u662f\\u86ee\\u5e72\"},{\"threshold\":\"D\",\"title\":\"\\u610f\\u5fd7\\u529b\\u5f3a\\u5ea6\\uff1a30%br\\u4e0d\\u613f\\u96be\\u4e3a\\u81ea\\u5df1\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520582589JSOsX.png\",\"account\":1003}"},

	]

	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 13) {
		data = data1[3];

	} else if (_num < 18 && _num >= 13) {
		data = data1[2];

	} else if (_num < 23 && _num >= 18) {
		data = data1[1];

	}else if (_num >= 23) {
		data = data1[0];
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

