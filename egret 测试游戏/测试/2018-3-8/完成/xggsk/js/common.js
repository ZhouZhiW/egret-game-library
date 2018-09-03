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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a30%br\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\",\"img\":\"quce\\/quiz-6043-4pMetNY53H.png\",\"desc\":\"\\u8981\\u8bf4\\u723d\\u5feb\\uff0c\\u4f60\\u51e0\\u4e4e\\u662f\\u6cbe\\u4e0d\\u4e0a\\u8fb9\\u7684\\uff0c\\u4f46\\u662f\\u8981\\u8bf4\\u5b8c\\u7f8e\\u4e0e\\u7ec6\\u8282\\u6ca1\\u4e86\\u4f60\\u600e\\u4e48\\u884c\\uff1f\\u4f60\\u4e60\\u60ef\\u6162\\u6162\\u505a\\u4e8b\\uff0c\\u7136\\u540e\\u5c06\\u4e8b\\u60c5\\u5904\\u7406\\u7684\\u975e\\u5e38\\u5b8c\\u7f8e\\u624d\\u7f62\\u4f11\\u3002\\u4e0e\\u4eba\\u6c9f\\u901a\\uff0c\\u4f60\\u7684\\u8a00\\u8f9e\\u4e5f\\u4e0d\\u4f1a\\u5f88\\u7280\\u5229\\uff0c\\u4e0d\\u4f1a\\u8ba9\\u4eba\\u4e00\\u542c\\u5c31\\u5fc3\\u788e\\u4e00\\u5730\\uff0c\\u6240\\u4ee5\\u5927\\u5bb6\\u90fd\\u559c\\u6b22\\u4e0e\\u4f60\\u8c08\\u5fc3\\u3002\\u800c\\u4e14\\u56e0\\u4e3a\\u4f60\\u7684\\u7ec6\\u817b\\u4e0e\\u540c\\u7406\\u5fc3\\uff0c\\u603b\\u662f\\u66f4\\u5bb9\\u6613\\u8d70\\u8fdb\\u522b\\u4eba\\u7684\\u5185\\u5fc3\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u591f\\u723d\\u5feb\\u5417\\uff1f\\u6211\\u7684\\u723d\\u5feb\\u6307\\u6570\\u662f30%\\uff0c\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\\uff01\",\"oldimg\":\"quce\\/quiz-3465-14924336740GBjKy4NMB.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a300%br\\u96f7\\u5389\\u98ce\\u884c\\uff0c\\u6562\\u7231\\u6562\\u6068\",\"oldimg\":\"quce\\/quiz-3465-1492433677P2aFx3lmqH.png\"},{\"threshold\":\"B\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a100%br\\u7edd\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"oldimg\":\"quce\\/quiz-3465-1492433672n9AgpqKZbS.png\"},{\"threshold\":\"C\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a60%br\\u723d\\u5feb\\u548c\\u542b\\u84c4\\u81ea\\u7531\\u5207\\u6362\",\"oldimg\":\"quce\\/quiz-3465-14924336697reRlWfjsi.png\"},{\"threshold\":\"D\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a30%br\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\",\"oldimg\":\"quce\\/quiz-3465-14924336740GBjKy4NMB.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578802JGqZ8.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a60%br\\u723d\\u5feb\\u548c\\u542b\\u84c4\\u81ea\\u7531\\u5207\\u6362\",\"img\":\"quce\\/quiz-6043-KHWY6ZGP5x.png\",\"desc\":\"\\u6709\\u4e9b\\u4eba\\u6027\\u5b50\\u6025\\u3001\\u6709\\u4e9b\\u4eba\\u6027\\u5b50\\u6162\\uff0c\\u4f46\\u4f60\\u53ef\\u4ee5\\u6839\\u636eta\\u4eec\\u7684\\u6027\\u683c\\u8fc5\\u901f\\u4e92\\u8865\\uff01\\u9762\\u5bf9\\u6025\\u6027\\u5b50\\uff0c\\u4f60\\u4f1a\\u9002\\u5f53\\u7684\\u653e\\u7f13\\u4f60\\u7684\\u901f\\u5ea6\\uff0c\\u56e0\\u4e3a\\u4f60\\u77e5\\u9053\\u6a2a\\u51b2\\u76f4\\u649e\\u7684\\u7ed3\\u679c\\u662f\\u53ef\\u6015\\u7684\\uff1b\\u9762\\u5bf9\\u6162\\u6027\\u5b50\\uff0c\\u4f60\\u4f1a\\u6070\\u5f53\\u7684\\u52a0\\u5feb\\u4f60\\u7684\\u901f\\u5ea6\\uff0c\\u540c\\u65f6\\u5e26\\u52a8ta\\u4e00\\u8d77\\u5feb\\u901f\\u5c06\\u4e8b\\u60c5\\u89e3\\u51b3\\u3002\\u4f60\\u7684\\u6027\\u683c\\u771f\\u662f\\u723d\\u5feb\\u4e2d\\u4e0d\\u7f3a\\u7ec6\\u81f4\\u3001\\u542b\\u84c4\\u4e2d\\u4e0d\\u7f3a\\u901f\\u5ea6\\uff0c\\u582a\\u79f0\\u5b8c\\u7f8e\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u591f\\u723d\\u5feb\\u5417\\uff1f\\u6211\\u7684\\u723d\\u5feb\\u6307\\u6570\\u662f60%\\uff0c\\u723d\\u5feb\\u4e2d\\u4e0d\\u7f3a\\u7ec6\\u81f4\\u3001\\u542b\\u84c4\\u4e2d\\u4e0d\\u7f3a\\u901f\\u5ea6\\uff01\",\"oldimg\":\"quce\\/quiz-3465-14924336697reRlWfjsi.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a300%br\\u96f7\\u5389\\u98ce\\u884c\\uff0c\\u6562\\u7231\\u6562\\u6068\",\"oldimg\":\"quce\\/quiz-3465-1492433677P2aFx3lmqH.png\"},{\"threshold\":\"B\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a100%br\\u7edd\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"oldimg\":\"quce\\/quiz-3465-1492433672n9AgpqKZbS.png\"},{\"threshold\":\"C\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a60%br\\u723d\\u5feb\\u548c\\u542b\\u84c4\\u81ea\\u7531\\u5207\\u6362\",\"oldimg\":\"quce\\/quiz-3465-14924336697reRlWfjsi.png\"},{\"threshold\":\"D\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a30%br\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\",\"oldimg\":\"quce\\/quiz-3465-14924336740GBjKy4NMB.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578802JGqZ8.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a100%br\\u7edd\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"img\":\"quce\\/quiz-6043-Y664yPWdhr.png\",\"desc\":\"\\u4f60\\u65e0\\u6cd5\\u7406\\u89e3\\u90a3\\u4e9b\\u4eba\\u4e3a\\u4ec0\\u4e48\\u8bf4\\u8bdd\\u8981\\u62d0\\u5f2f\\u62b9\\u89d2\\uff0c\\u76f4\\u63a5\\u8bf4\\u4e0d\\u662f\\u66f4\\u7b80\\u5355\\u5417\\uff1f\\u76f4\\u6765\\u76f4\\u5f80\\u7684\\u4f60\\u603b\\u662f\\u6709\\u4ec0\\u4e48\\u8bf4\\u4ec0\\u4e48\\uff0c\\u901a\\u5e38\\u90fd\\u662f\\u6562\\u4f5c\\u6562\\u5f53\\u7684\\u505a\\u6d3e\\uff0c\\u8fd9\\u6837\\u6ca1\\u6709\\u5fc3\\u673a\\u7684\\u4f60\\u603b\\u662f\\u4f1a\\u88ab\\u5f88\\u591a\\u4eba\\u559c\\u6b22\\u4e5f\\u4f1a\\u88ab\\u5f88\\u591a\\u4eba\\u4f24\\u5bb3\\uff01\\u559c\\u6b22\\u4f60\\u662f\\u56e0\\u4e3a\\u4f60\\u5584\\u826f\\u3001\\u771f\\u8bda\\uff0c\\u4e0d\\u559c\\u6b22\\u4f60\\u662f\\u56e0\\u4e3a\\u5fe0\\u8a00\\u9006\\u8033\\uff0c\\u4f46\\u662f\\u723d\\u5feb\\u5982\\u4f60\\uff0c\\u53c8\\u600e\\u4e48\\u4f1a\\u88ab\\u5f71\\u54cd\\uff1f\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u591f\\u723d\\u5feb\\u5417\\uff1f\\u6211\\u7684\\u723d\\u5feb\\u6307\\u6570\\u662f100%\\uff0c\\u7edd\\u4e0d\\u4f1a\\u62d6\\u6ce5\\u5e26\\u6c34\\uff01\",\"oldimg\":\"quce\\/quiz-3465-1492433672n9AgpqKZbS.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a300%br\\u96f7\\u5389\\u98ce\\u884c\\uff0c\\u6562\\u7231\\u6562\\u6068\",\"oldimg\":\"quce\\/quiz-3465-1492433677P2aFx3lmqH.png\"},{\"threshold\":\"B\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a100%br\\u7edd\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"oldimg\":\"quce\\/quiz-3465-1492433672n9AgpqKZbS.png\"},{\"threshold\":\"C\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a60%br\\u723d\\u5feb\\u548c\\u542b\\u84c4\\u81ea\\u7531\\u5207\\u6362\",\"oldimg\":\"quce\\/quiz-3465-14924336697reRlWfjsi.png\"},{\"threshold\":\"D\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a30%br\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\",\"oldimg\":\"quce\\/quiz-3465-14924336740GBjKy4NMB.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578802JGqZ8.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a300%br\\u96f7\\u5389\\u98ce\\u884c\\uff0c\\u6562\\u7231\\u6562\\u6068\",\"img\":\"quce\\/quiz-6043-XjKNKsBX62.png\",\"desc\":\"\\u4f60\\u6700\\u53d7\\u4e0d\\u4e86\\u7684\\u5c31\\u662f\\u5570\\u54e9\\u5570\\u55e6\\uff0c\\u6b32\\u8bf4\\u8fd8\\u4f11\\u7684\\u4eba\\uff0c\\u56e0\\u4e3a\\u8ddfta\\u4eec\\u6c9f\\u901a\\uff0c\\u603b\\u662f\\u8981\\u8017\\u8d39\\u5f88\\u5927\\u7684\\u529b\\u6c14\\u3002\\u4f60\\u559c\\u6b22\\u548c\\u884c\\u52a8\\u529b\\u5f3a\\u7684\\u4eba\\u4e00\\u8d77\\u505a\\u4e8b\\uff0c\\u56e0\\u4e3a\\u4f60\\u4eec\\u53ef\\u4ee5\\u8bf4\\u505a\\u5c31\\u505a\\u3001\\u8bf4\\u8d70\\u5c31\\u8d70\\uff0c\\u4e0d\\u4f1a\\u88ab\\u78e8\\u78e8\\u8e6d\\u8e6d\\u7684\\u4eba\\u62d6\\u5f97\\u5bf8\\u6b65\\u96be\\u884c\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u6562\\u7231\\u6562\\u6068\\uff0c\\u4e0d\\u4f1a\\u6d6a\\u8d39\\u522b\\u4eba\\u7684\\u611f\\u60c5\\uff0c\\u66f4\\u4e0d\\u4f1a\\u5229\\u7528\\u522b\\u4eba\\u7684\\u611f\\u60c5\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u591f\\u723d\\u5feb\\u5417\\uff1f\\u6211\\u7684\\u723d\\u5feb\\u6307\\u6570\\u662f300%\\uff0c\\u505a\\u4e8b\\u5e72\\u8106\\u3001\\u75db\\u5feb\\uff01\",\"oldimg\":\"quce\\/quiz-3465-1492433677P2aFx3lmqH.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a300%br\\u96f7\\u5389\\u98ce\\u884c\\uff0c\\u6562\\u7231\\u6562\\u6068\",\"oldimg\":\"quce\\/quiz-3465-1492433677P2aFx3lmqH.png\"},{\"threshold\":\"B\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a100%br\\u7edd\\u4e0d\\u62d6\\u6ce5\\u5e26\\u6c34\",\"oldimg\":\"quce\\/quiz-3465-1492433672n9AgpqKZbS.png\"},{\"threshold\":\"C\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a60%br\\u723d\\u5feb\\u548c\\u542b\\u84c4\\u81ea\\u7531\\u5207\\u6362\",\"oldimg\":\"quce\\/quiz-3465-14924336697reRlWfjsi.png\"},{\"threshold\":\"D\",\"title\":\"\\u723d\\u5feb\\u6307\\u6570\\uff1a30%br\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u800c\\u4e0d\\u662f\\u901f\\u5ea6\",\"oldimg\":\"quce\\/quiz-3465-14924336740GBjKy4NMB.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578802JGqZ8.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 15) {
		data = data1[0];

	} else if (_num < 20 && _num >= 15) {
		data = data1[1];

	} else if (_num < 26 && _num >= 20) {
		data = data1[2];

	} else if (_num >= 26) {
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

