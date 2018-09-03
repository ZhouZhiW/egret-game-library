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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a-20%br\\u4efb\\u6027\\u7684\\u50b2\\u5a07\\u9b3c\",\"img\":\"quce\\/quiz-6021-s4yQZiZXtA.png\",\"desc\":\"\\u6ca1\\u60f3\\u5230\\u4f60\\u7adf\\u7136\\u662f\\u8fd9\\u79cd\\u4eba\\uff01\\u4f60\\u4e0e\\u5584\\u89e3\\u4eba\\u610f\\u6839\\u672c\\u6ca1\\u8054\\u7cfb\\uff01\\u4f60\\u5148\\u8bf4\\u8bf4\\uff0c\\u4f60\\u5bf9\\u5f97\\u8d77\\u7231\\u4f60\\u7684\\u4eba\\u5417\\uff1f\\u4eba\\u6d3b\\u7740\\uff0c\\u53ef\\u4e0d\\u4ec5\\u4ec5\\u662f\\u81ea\\u5df1\\u8fc7\\u7684\\u597d\\u5c31\\u662f\\u6210\\u529f\\u7684\\uff01\\u6240\\u4ee5\\u4f60\\u53ef\\u957f\\u70b9\\u5fc3\\u5427\\uff0c\\u522b\\u4e00\\u56de\\u5934\\u6240\\u6709\\u4eba\\u90fd\\u79bb\\u4f60\\u800c\\u53bb\\u4e86\\uff01\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u5584\\u89e3\\u4eba\\u610f\\uff1f\\u6211\\u7684\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\u4e3a-20%\\uff0c\\u7231\\u6211\\u522b\\u8d70\\uff01\",\"oldimg\":\"quce\\/quiz-3095-1492439040NlmtWQLe4I.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a100%br\\u503c\\u5f97\\u88ab\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3095-1492439033Sy7ouAYxNw.png\"},{\"threshold\":\"B\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a70%br\\u8d34\\u5fc3\\u7684\\u5c0f\\u68c9\\u8884\",\"oldimg\":\"quce\\/quiz-3095-1492439038bu6u2sTQCN.png\"},{\"threshold\":\"C\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a30%br\\u8fd8\\u8981\\u5927\\u5bb6\\u591a\\u591a\\u5305\\u6db5\",\"oldimg\":\"quce\\/quiz-3095-1492439035h1TIINtrE1.png\"},{\"threshold\":\"D\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a-20%br\\u4efb\\u6027\\u7684\\u50b2\\u5a07\\u9b3c\",\"oldimg\":\"quce\\/quiz-3095-1492439040NlmtWQLe4I.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520247624TikN1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a30%br\\u8fd8\\u8981\\u5927\\u5bb6\\u591a\\u591a\\u5305\\u6db5\",\"img\":\"quce\\/quiz-6021-pkn4zQKhRD.png\",\"desc\":\"\\u67d0\\u79cd\\u7a0b\\u5ea6\\u4e0a\\u8bf4\\uff0c\\u4f60\\u8fd8\\u662f\\u628a\\u81ea\\u5df1\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\\uff0c\\u6240\\u4ee5\\u4f60\\u7684\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\u4e0d\\u9ad8\\u5462\\uff01\\u8fd9\\u6837\\u7684\\u4f60\\u5728\\u522b\\u4eba\\u773c\\u4e2d\\u6709\\u4e9b\\u81ea\\u6211\\u4e3a\\u4e2d\\u5fc3\\uff0c\\u5982\\u679c\\u7ee7\\u7eed\\u9a84\\u6a2a\\u65e0\\u793c\\u7684\\u8bdd\\uff0c\\u4f30\\u8ba1\\u4f1a\\u6210\\u4e3a\\u5b64\\u5bb6\\u5be1\\u4eba\\u3002\\u6240\\u4ee5\\u8d81\\u7740\\u4f60\\u5185\\u5728\\u7684\\u5584\\u826f\\u8fd8\\u6ca1\\u6709\\u6cef\\u706d\\uff0c\\u591a\\u591a\\u6362\\u4f4d\\u601d\\u8003\\u4e00\\u4e0b\\u5427\\uff01\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u5584\\u89e3\\u4eba\\u610f\\uff1f\\u6211\\u7684\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\u4e3a30%\\uff0c\\u5f85\\u4eba\\u4e0d\\u5468\\u591a\\u591a\\u5305\\u6db5\\uff01\",\"oldimg\":\"quce\\/quiz-3095-1492439035h1TIINtrE1.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a100%br\\u503c\\u5f97\\u88ab\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3095-1492439033Sy7ouAYxNw.png\"},{\"threshold\":\"B\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a70%br\\u8d34\\u5fc3\\u7684\\u5c0f\\u68c9\\u8884\",\"oldimg\":\"quce\\/quiz-3095-1492439038bu6u2sTQCN.png\"},{\"threshold\":\"C\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a30%br\\u8fd8\\u8981\\u5927\\u5bb6\\u591a\\u591a\\u5305\\u6db5\",\"oldimg\":\"quce\\/quiz-3095-1492439035h1TIINtrE1.png\"},{\"threshold\":\"D\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a-20%br\\u4efb\\u6027\\u7684\\u50b2\\u5a07\\u9b3c\",\"oldimg\":\"quce\\/quiz-3095-1492439040NlmtWQLe4I.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520247624TikN1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a70%br\\u8d34\\u5fc3\\u7684\\u5c0f\\u68c9\\u8884\",\"img\":\"quce\\/quiz-6021-e65n8eH36a.png\",\"desc\":\"\\u4f60\\u8fd9\\u4e48\\u5584\\u89e3\\u4eba\\u610f\\uff0c\\u4f60\\u5bb6\\u4eba\\u77e5\\u9053\\u5417\\uff1f\\u4f60\\u8fd9\\u4e48\\u4f53\\u8d34\\u3001\\u77e5\\u5fc3\\uff0c\\u4f60\\u5bb6\\u4eba\\u77e5\\u9053\\u5417\\uff1f\\u4f60\\u8fd9\\u6837\\u5f88\\u5bb9\\u6613\\u88ab\\u522b\\u4eba\\u559c\\u6b22\\uff0c\\u4f60\\u5bb6\\u4eba\\u77e5\\u9053\\u5417\\uff1f\\u4f46\\u662f\\uff0c\\u4ece\\u4f60\\u7684\\u4eba\\u6c14\\u5927\\u6982\\u5c31\\u80fd\\u77e5\\u9053\\u7b54\\u6848\\u4e86\\uff01\\u5076\\u5c14\\u7684\\u65f6\\u5019\\uff0c\\u8fd8\\u662f\\u8981\\u4e3a\\u81ea\\u5df1\\u60f3\\u60f3\\u554a\\uff0c\\u6bd5\\u7adf\\u4e0d\\u662f\\u6240\\u6709\\u4eba\\u90fd\\u50cf\\u4f60\\u8fd9\\u4e48\\u5584\\u826f\\uff01\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u5584\\u89e3\\u4eba\\u610f\\uff1f\\u6211\\u7684\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\u4e3a70%\\uff0c\\u9519\\u8fc7\\u6211\\uff0c\\u4f60\\u4eec\\u4f1a\\u540e\\u6094\\u7684\\uff01\",\"oldimg\":\"quce\\/quiz-3095-1492439038bu6u2sTQCN.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a100%br\\u503c\\u5f97\\u88ab\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3095-1492439033Sy7ouAYxNw.png\"},{\"threshold\":\"B\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a70%br\\u8d34\\u5fc3\\u7684\\u5c0f\\u68c9\\u8884\",\"oldimg\":\"quce\\/quiz-3095-1492439038bu6u2sTQCN.png\"},{\"threshold\":\"C\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a30%br\\u8fd8\\u8981\\u5927\\u5bb6\\u591a\\u591a\\u5305\\u6db5\",\"oldimg\":\"quce\\/quiz-3095-1492439035h1TIINtrE1.png\"},{\"threshold\":\"D\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a-20%br\\u4efb\\u6027\\u7684\\u50b2\\u5a07\\u9b3c\",\"oldimg\":\"quce\\/quiz-3095-1492439040NlmtWQLe4I.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520247624TikN1.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a100%br\\u503c\\u5f97\\u88ab\\u73cd\\u60dc\",\"img\":\"quce\\/quiz-6021-nMkrdK4GWr.png\",\"desc\":\"\\u4f60\\u771f\\u7684\\u5b58\\u5728\\u5417\\uff1f\\u50cf\\u4f60\\u8fd9\\u4e48\\u65e2\\u5584\\u89e3\\u4eba\\u610f\\u53c8\\u5584\\u826f\\u7684\\u4eba\\u5e94\\u8be5\\u5df2\\u7ecf\\u4e0d\\u5b58\\u5728\\u4e86\\u5427\\uff01\\u770b\\u7740\\u4f60\\u4e3a\\u4e86\\u522b\\u4eba\\u800c\\u4e0d\\u8003\\u8651\\u81ea\\u5df1\\u7684\\u65f6\\u5019\\uff0c\\u771f\\u662f\\u8ba9\\u4eba\\u6709\\u70b9\\u5fc3\\u75bc\\u5462\\u3002\\u6240\\u4ee5\\u4f60\\u9664\\u4e86\\u4f53\\u8d34\\u522b\\u4eba\\u4e4b\\u5916\\uff0c\\u8fd8\\u8981\\u7167\\u987e\\u597d\\u81ea\\u5df1\\u554a\\uff0c\\u53ef\\u5343\\u4e07\\u4e0d\\u80fd\\u8ba9\\u6700\\u540e\\u4e00\\u4e2a\\u5177\\u6709100%\\u5584\\u89e3\\u4eba\\u610f\\u7684\\u4eba\\u6d88\\u5931\\u6389\\uff01\",\"sharetitle\":\"\\u4f60\\u6709\\u591a\\u5584\\u89e3\\u4eba\\u610f\\uff1f\\u6211\\u7684\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\u4e3a100%\\uff0c\\u4f60\\u4eec\\u53ef\\u8981\\u73cd\\u60dc\\u6211\\uff01\",\"oldimg\":\"quce\\/quiz-3095-1492439033Sy7ouAYxNw.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a100%br\\u503c\\u5f97\\u88ab\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3095-1492439033Sy7ouAYxNw.png\"},{\"threshold\":\"B\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a70%br\\u8d34\\u5fc3\\u7684\\u5c0f\\u68c9\\u8884\",\"oldimg\":\"quce\\/quiz-3095-1492439038bu6u2sTQCN.png\"},{\"threshold\":\"C\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a30%br\\u8fd8\\u8981\\u5927\\u5bb6\\u591a\\u591a\\u5305\\u6db5\",\"oldimg\":\"quce\\/quiz-3095-1492439035h1TIINtrE1.png\"},{\"threshold\":\"D\",\"title\":\"\\u5584\\u89e3\\u4eba\\u610f\\u6307\\u6570\\uff1a-20%br\\u4efb\\u6027\\u7684\\u50b2\\u5a07\\u9b3c\",\"oldimg\":\"quce\\/quiz-3095-1492439040NlmtWQLe4I.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520247624TikN1.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 20) {
		data = data1[0];

	} else if (_num < 35 && _num >= 20) {
		data = data1[1];

	} else if (_num < 45 && _num >= 35) {
		data = data1[2];

	} else if (_num >= 45) {
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

