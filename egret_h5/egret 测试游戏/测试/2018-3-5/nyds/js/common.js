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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a199%br\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\",\"img\":\"quce\\/quiz-6037-E8hfrKX7n2.png\",\"desc\":\"\\u5728\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u662f\\u4e00\\u4e2a\\u5929\\u771f\\u53ef\\u7231\\u7684\\u5c0f\\u50bb\\u74dc\\uff0c\\u4f60\\u5f88\\u6027\\u683c\\u5355\\u7eaf\\uff0c\\u4ece\\u6765\\u4e0d\\u4f1a\\u800d\\u5fc3\\u673a\\uff0c\\u4e8b\\u4e8b\\u4ee5\\u4ed6\\u4eba\\u4e3a\\u5148\\uff0c\\u603b\\u662f\\u628a\\u6240\\u6709\\u60c5\\u7eea\\u90fd\\u5199\\u5728\\u8138\\u4e0a\\uff0c\\u662f\\u4e00\\u4e2a\\u6beb\\u65e0\\u57ce\\u5e9c\\u7684\\u4eba\\uff0c\\u56e0\\u6b64\\u5927\\u5bb6\\u90fd\\u5f88\\u7167\\u987e\\u4f60\\uff0c\\u4f46\\u662f\\u4e5f\\u5e0c\\u671b\\u4f60\\u80fd\\u591a\\u7559\\u70b9\\u5fc3\\u773c\\uff0c\\u5b66\\u4f1a\\u4fdd\\u62a4\\u81ea\\u5df1\\u3002\",\"sharetitle\":\"\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u6709\\u591a\\u50bb\\uff1f\\u6211\\u7684\\u50bb\\u74dc\\u6307\\u6570199%\\uff0c\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\\u3002\",\"oldimg\":\"quce\\/1519892757e8A00.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a199%br\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\",\"oldimg\":\"quce\\/1519892757e8A00.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a101%br\\u5f85\\u4eba\\u548c\\u5584\\u7684\\u5929\\u7136\\u5446\",\"oldimg\":\"quce\\/1519892780KYPIf.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a69%br\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\",\"oldimg\":\"quce\\/1519892790TE431.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a10%br\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\",\"oldimg\":\"quce\\/1519892798BWmn8.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520240405HKaIi.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a101%br\\u5f85\\u4eba\\u548c\\u5584\\u7684\\u5929\\u7136\\u5446\",\"img\":\"quce\\/quiz-6037-cPQX2HsBBk.png\",\"desc\":\"\\u5728\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u662f\\u4e00\\u4e2a\\u5929\\u7136\\u5446\\uff0c\\u4f60\\u662f\\u90a3\\u79cd\\u5f88\\u5bb9\\u6613\\u5fc3\\u8f6f\\u7684\\u4eba\\uff0c\\u603b\\u662f\\u5f88\\u548c\\u5584\\u7684\\u5bf9\\u5f85\\u8eab\\u8fb9\\u7684\\u4eba\\uff0c\\u5c31\\u7b97\\u522b\\u4eba\\u5f88\\u8fc7\\u5206\\u7684\\u5bf9\\u5f85\\u4f60\\uff0c\\u4f60\\u4e5f\\u603b\\u662f\\u4f1a\\u539f\\u8c05\\u5bf9\\u65b9\\uff0c\\u5728\\u5927\\u5bb6\\u770b\\u6765\\uff0c\\u4f60\\u5c31\\u662f\\u4e00\\u4e2a\\u4e0d\\u6298\\u4e0d\\u6263\\u7684\\u5927\\u50bb\\u74dc\\uff0c\\u5e0c\\u671b\\u4f60\\u80fd\\u597d\\u597d\\u5fc3\\u75bc\\u5fc3\\u75bc\\u81ea\\u5df1\\u3002\",\"sharetitle\":\"\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u6709\\u591a\\u50bb\\uff1f\\u6211\\u7684\\u50bb\\u74dc\\u6307\\u6570101%\\uff0c\",\"oldimg\":\"quce\\/1519892780KYPIf.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a199%br\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\",\"oldimg\":\"quce\\/1519892757e8A00.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a101%br\\u5f85\\u4eba\\u548c\\u5584\\u7684\\u5929\\u7136\\u5446\",\"oldimg\":\"quce\\/1519892780KYPIf.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a69%br\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\",\"oldimg\":\"quce\\/1519892790TE431.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a10%br\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\",\"oldimg\":\"quce\\/1519892798BWmn8.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520240405HKaIi.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a69%br\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\",\"img\":\"quce\\/quiz-6037-msjxdksihx.png\",\"desc\":\"\\u5728\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u662f\\u4e00\\u4e2a\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\\u3002\\u4f60\\u505a\\u4e8b\\u603b\\u662f\\u83bd\\u83bd\\u649e\\u649e\\uff0c\\u7ecf\\u5e38\\u72af\\u4e00\\u4e9b\\u5f88\\u50bb\\u7684\\u9519\\u8bef\\uff0c\\u4f46\\u4f60\\u5bf9\\u5f85\\u8eab\\u8fb9\\u7684\\u4eba\\u5374\\u603b\\u662f\\u7ec6\\u5fc3\\u53c8\\u6177\\u6168\\uff0c\\u6068\\u4e00\\u4e2a\\u5f88\\u8ba9\\u4eba\\u5fc3\\u75bc\\u7684\\u5c0f\\u50bb\\u74dc\\u3002\\u5176\\u5b9e\\u4f60\\u5e76\\u4e0d\\u50bb\\uff0c\\u56e0\\u4e3a\\u4f60\\u77e5\\u9053\\u53ea\\u6709\\u771f\\u5fc3\\u5bf9\\u5f85\\u670b\\u53cb\\uff0c\\u624d\\u80fd\\u6536\\u83b7\\u771f\\u6b63\\u7684\\u53cb\\u8c0a\\u3002\",\"sharetitle\":\"\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u6709\\u591a\\u50bb\\uff1f\\u6211\\u7684\\u50bb\\u74dc\\u6307\\u657069%\\uff0c\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\\u3002\",\"oldimg\":\"quce\\/1519892790TE431.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a199%br\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\",\"oldimg\":\"quce\\/1519892757e8A00.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a101%br\\u5f85\\u4eba\\u548c\\u5584\\u7684\\u5929\\u7136\\u5446\",\"oldimg\":\"quce\\/1519892780KYPIf.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a69%br\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\",\"oldimg\":\"quce\\/1519892790TE431.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a10%br\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\",\"oldimg\":\"quce\\/1519892798BWmn8.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520240405HKaIi.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a10%br\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\",\"img\":\"quce\\/quiz-6037-iaAKhj5NDp.png\",\"desc\":\"\\u4f60\\u975e\\u4f46\\u4e0d\\u50bb\\u8fd8\\u6709\\u4e00\\u4e9b\\u5c0f\\u7cbe\\u660e\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u987d\\u56fa\\u7684\\u4eba\\uff0c\\u5c5e\\u4e8e\\u90a3\\u79cd\\u4e0d\\u649e\\u5357\\u5899\\u4e0d\\u56de\\u5934\\u7684\\u6027\\u683c\\uff0c\\u901a\\u5e38\\u505a\\u4ec0\\u4e48\\u4e8b\\u60c5\\u90fd\\u662f\\u4e49\\u65e0\\u53cd\\u987e\\u7684\\uff0c\\u56e0\\u4e3a\\u4f60\\u77e5\\u9053\\u81ea\\u5df1\\u60f3\\u8981\\u7684\\u662f\\u4ec0\\u4e48\\uff0c\\u4e5f\\u4e00\\u76f4\\u671d\\u7740\\u5b83\\u52aa\\u529b\\u3002\\u6240\\u4ee5\\u53bb\\u575a\\u6301\\u4f60\\u8ba4\\u4e3a\\u5bf9\\u7684\\u4e8b\\u60c5\\u5427\\uff01\",\"sharetitle\":\"\\u522b\\u4eba\\u773c\\u91cc\\u4f60\\u6709\\u591a\\u50bb\\uff1f\\u6211\\u7684\\u50bb\\u74dc\\u6307\\u657010%\\uff0c\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\\u3002\",\"oldimg\":\"quce\\/1519892798BWmn8.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a199%br\\u5929\\u771f\\u53ef\\u7231\\uff0c\\u6beb\\u65e0\\u57ce\\u5e9c\",\"oldimg\":\"quce\\/1519892757e8A00.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a101%br\\u5f85\\u4eba\\u548c\\u5584\\u7684\\u5929\\u7136\\u5446\",\"oldimg\":\"quce\\/1519892780KYPIf.jpg\"},{\"threshold\":\"C\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a69%br\\u50bb\\u4e4e\\u4e4e\\u7684\\u83bd\\u649e\\u9b3c\",\"oldimg\":\"quce\\/1519892790TE431.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u50bb\\u74dc\\u6307\\u6570\\uff1a10%br\\u6709\\u81ea\\u5df1\\u7684\\u76ee\\u6807\\u548c\\u4fe1\\u5ff5\",\"oldimg\":\"quce\\/1519892798BWmn8.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520240405HKaIi.png\",\"account\":1003}"},

	]
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

	}else if (_num >= 20) {
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

