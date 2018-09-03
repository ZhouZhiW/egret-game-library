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
		{"content":"{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\",\"img\":\"quce\\/quiz-5592-ZsK2d6ijfW.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5584\\u826f\\u6df3\\u6734\\u7684\\u201c\\u8001\\u597d\\u4eba\\u201d\\u6027\\u683c\\uff0c\\u5929\\u751f\\u5c31\\u65e0\\u6cd5\\u62d2\\u7edd\\u522b\\u4eba\\uff0c\\u6240\\u4ee5\\u5728\\u522b\\u4eba\\u7684\\u5957\\u8def\\u6216\\u8005\\u6076\\u4f5c\\u5267\\u4e2d\\uff0c\\u4f60\\u901a\\u5e38\\u90fd\\u662f\\u201c\\u53d7\\u5bb3\\u8005\\u201d\\uff0c\\u56e0\\u4e3ata\\u4eec\\u77e5\\u9053\\uff0c\\u4f60\\u4f1a\\u4e00\\u7b11\\u4e86\\u4e4b\\uff0c\\u800c\\u4e0d\\u4f1a\\u771f\\u7684\\u8ddfta\\u4eec\\u53d1\\u813e\\u6c14\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u867d\\u7136\\u5f88\\u53d7\\u5927\\u5bb6\\u7684\\u6b22\\u8fce\\uff0c\\u4f46\\u662f\\u5bb9\\u6613\\u53d7\\u5230\\u975e\\u6076\\u610f\\u7684\\u4f24\\u5bb3\\uff0c\\u5e0c\\u671b\\u4f60\\u4ee5\\u540e\\u80fd\\u5b66\\u4f1a\\u62d2\\u7edd\\uff0c\\u8ba9\\u81ea\\u5df1\\u8fc7\\u7684\\u66f4\\u8212\\u5fc3\\u4e9b\\uff01\",\"sharetitle\":\"\\u4f60\\u5bb9\\u6613\\u201c\\u88ab\\u5957\\u8def\\u201d\\u5417\\uff1f\\u6211\\u7684\\u4e0a\\u5f53\\u6307\\u6570\\u662f89%\\uff0c\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\"},{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515405604ueuX0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\",\"img\":\"quce\\/quiz-5592-EGtjDmQmdb.jpg\",\"desc\":\"\\u4f60\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff0c\\u4f46\\u662f\\u4f60\\u65e0\\u6cd5\\u770b\\u900f\\u6240\\u6709\\u7684\\u5957\\u8def\\u3002\\u4f60\\u7684\\u6027\\u683c\\u6bd4\\u8f83\\u4f18\\u67d4\\u5be1\\u65ad\\uff0c\\u4f46\\u968f\\u9047\\u800c\\u5b89\\u7684\\u5fc3\\u6027\\u5f88\\u5bb9\\u6613\\u83b7\\u5f97\\u7b80\\u5355\\u7684\\u5c0f\\u5e78\\u798f\\u3002\\u4f60\\u5f88\\u5584\\u826f\\uff0c\\u613f\\u610f\\u5e2e\\u52a9\\u522b\\u4eba\\uff0c\\u8fd9\\u65f6\\u7684\\u4f60\\u5bb9\\u6613\\u88ab\\u522b\\u6709\\u7528\\u5fc3\\u4e4b\\u4eba\\u5229\\u7528\\u3002\\u4e0d\\u8fc7\\u4f60\\u8fd9\\u79cd\\u50bb\\u767d\\u751c\\u7684\\u6027\\u683c\\uff0c\\u8ba9\\u4eba\\u89c9\\u5f97\\u7279\\u522b\\u597d\\u76f8\\u5904\\uff0c\\u80fd\\u4ea4\\u5230\\u8bb8\\u591a\\u670b\\u53cb\\u3002\",\"sharetitle\":\"\\u4f60\\u5bb9\\u6613\\u201c\\u88ab\\u5957\\u8def\\u201d\\u5417\\uff1f\\u6211\\u7684\\u4e0a\\u5f53\\u6307\\u6570\\u662f58%\\uff0c\\u6709\\u4e9b\\u50bb\\u767d\\u751c\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\"},{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515405604ueuX0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\",\"img\":\"quce\\/quiz-5592-7Sez7pDiHe.jpg\",\"desc\":\"\\u4f60\\u6df1\\u8c19\\u5404\\u79cd\\u5404\\u6837\\u7684\\u5957\\u8def\\uff0c\\u6240\\u4ee5\\u53ea\\u6709\\u4f60\\u4fe1\\u4efb\\u7684\\u4eba\\u9a97\\u4f60\\uff0c\\u4f60\\u624d\\u4f1a\\u4e0a\\u5f53\\u3002\\u4f60\\u662f\\u4e00\\u4e2a\\u8c28\\u614e\\u7684\\u4eba\\uff0c\\u8981\\u53d6\\u5f97\\u4f60\\u7684\\u4fe1\\u4efb\\u5e76\\u4e0d\\u5bb9\\u6613\\uff0c\\u4f46\\u662f\\u4f60\\u4e00\\u65e6\\u628a\\u5bf9\\u65b9\\u5f53\\u4f5c\\u6b7b\\u515a\\u540e\\uff0c\\u5c31\\u4f1a\\u65e0\\u6761\\u4ef6\\u7684\\u4fe1\\u4efbta\\u3002\\u751f\\u6d3b\\u4e2d\\uff0c\\u5927\\u5bb6\\u5f00\\u5f00\\u73a9\\u7b11\\u3001\\u6492\\u70b9\\u5584\\u610f\\u7684\\u5c0f\\u614c\\uff0c\\u4f60\\u5e76\\u4e0d\\u4f1a\\u751f\\u6c14\\uff0c\\u4f46\\u662f\\u6709\\u4eba\\u6709\\u76ee\\u7684\\u7684\\u6b3a\\u9a97\\u4f60\\uff0c\\u4f60\\u662f\\u4e0d\\u4f1a\\u539f\\u8c05ta\\u7684\\u3002\",\"sharetitle\":\"\\u4f60\\u5bb9\\u6613\\u201c\\u88ab\\u5957\\u8def\\u201d\\u5417\\uff1f\\u6211\\u7684\\u4e0a\\u5f53\\u6307\\u6570\\u662f38%\\uff0c\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\"},{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515405604ueuX0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\",\"img\":\"quce\\/quiz-5592-TpKJwy5wWC.jpg\",\"desc\":\"\\u4f60\\u7684\\u6d1e\\u5bdf\\u529b\\u5f88\\u5f3a\\uff0c\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u6b3a\\u9a97\\u3002\\u4f60\\u6709\\u5f88\\u5f3a\\u7684\\u53cd\\u5e94\\u529b\\u3001\\u7406\\u89e3\\u529b\\uff0c\\u52a0\\u4e0a\\u4f60\\u8c28\\u614e\\u7ec6\\u817b\\u7684\\u6027\\u683c\\uff0c\\u8ba9\\u4f60\\u5f88\\u6709\\u9b45\\u529b\\u4e5f\\u9887\\u53d7\\u6b22\\u8fce\\u3002\\u4f60\\u4ece\\u4e0d\\u8f7b\\u6613\\u7684\\u628a\\u771f\\u5fc3\\u4ea4\\u7ed9\\u522b\\u4eba\\uff0c\\u6240\\u4ee5\\u81ea\\u7136\\u4e0d\\u4f1a\\u88ab\\u4f24\\u5f97\\u5f88\\u6df1\\uff0c\\u53ea\\u662f\\u4f60\\u5728\\u631a\\u7231\\u9762\\u524d\\u662f\\u4e0d\\u8bbe\\u9632\\u7684\\uff0c\\u5982\\u679cta\\u8981\\u9a97\\u4f60\\uff0c\\u4f60\\u57fa\\u672c\\u4e0a\\u6beb\\u65e0\\u8fd8\\u624b\\u4e4b\\u529b\\u3002\",\"sharetitle\":\"\\u4f60\\u5bb9\\u6613\\u201c\\u88ab\\u5957\\u8def\\u201d\\u5417\\uff1f\\u6211\\u7684\\u4e0a\\u5f53\\u6307\\u6570\\u662f10%\\uff0c\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\"},{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515405604ueuX0.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\",\"img\":\"quce\\/quiz-5592-mSyPMY3aw5.jpg\",\"desc\":\"\\u8c01\\u8981\\u9a97\\u4f60\\uff1f\\u90a3\\u7b80\\u76f4\\u5c31\\u662f\\u81ea\\u627e\\u6b7b\\u8def\\uff01\\u4f60\\u6709\\u7740\\u65e0\\u6bd4\\u673a\\u667a\\u7684\\u5934\\u8111\\u4ee5\\u53ca\\u51b7\\u9759\\u6210\\u719f\\u7684\\u5224\\u65ad\\uff0c\\u6240\\u4ee5\\u4f60\\u53ef\\u4ee5\\u6d1e\\u6089\\u4e00\\u5207\\u771f\\u76f8\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u975e\\u5e38\\u4f18\\u79c0\\uff0c\\u5728\\u672a\\u6765\\u7684\\u4eba\\u751f\\u4e2d\\u4f1a\\u53d6\\u5f97\\u975e\\u5e38\\u5927\\u7684\\u6210\\u5c31\\u3002\\u53ea\\u662f\\u8fd9\\u6837\\u7684\\u4f60\\uff0c\\u7ecf\\u5e38\\u51b7\\u9759\\u7684\\u6709\\u4e9b\\u4e0d\\u8fd1\\u4eba\\u60c5\\uff0c\\u8ba9\\u4eba\\u96be\\u4ee5\\u9760\\u8fd1\\u3002\",\"sharetitle\":\"\\u4f60\\u5bb9\\u6613\\u201c\\u88ab\\u5957\\u8def\\u201d\\u5417\\uff1f\\u6211\\u7684\\u4e0a\\u5f53\\u6307\\u6570\\u662f1%\\uff0c\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a1%br\\u6ca1\\u4eba\\u80fd\\u9a97\\u5f97\\u4e86\\u6211\\uff01\"},{\"threshold\":\"B\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a10%br\\u60f3\\u9a97\\u6211\\uff1f\\u4f60\\u7701\\u7701\\u5427\\uff01\"},{\"threshold\":\"C\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a38%br\\u4e0d\\u4f1a\\u8f7b\\u6613\\u88ab\\u9a97\\uff01\"},{\"threshold\":\"D\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a58%br\\u6709\\u4e9b\\u50bb\\u767d\\u751c\"},{\"threshold\":\"E\",\"title\":\"\\u4e0a\\u5f53\\u6307\\u6570\\uff1a89%br\\u5f88\\u5bb9\\u6613\\u88ab\\u9a97\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515405604ueuX0.png\",\"account\":1003}"},
	]


	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 13) {
		data = data1[0];

	} else if (_num < 15 && _num >= 13) {
		data = data1[1];

	} else if (_num < 18 && _num >= 15) {
		data = data1[2];

	} else if (_num < 22 &&_num >= 19) {
		data = data1[3];
	}else if (_num >= 22) {
		data = data1[4];
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

