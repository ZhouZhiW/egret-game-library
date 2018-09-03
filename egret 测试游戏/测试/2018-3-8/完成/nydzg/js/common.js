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
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a500\\u4e07br\\u503c\\u5f97\\u597d\\u597d\\u73cd\\u60dc\",\"img\":\"quce\\/quiz-5995-iK87PTSjrx.png\",\"desc\":\"\\u4f60\\u5728\\u604b\\u4eba\\u773c\\u91cc\\u4ef7\\u503c500\\u4e07\\uff01\\u56e0\\u4e3a\\u4f60\\u5bf9\\u4e8e\\u8ba4\\u5b9a\\u7684\\u604b\\u4eba\\uff0c\\u4f1a\\u65e0\\u6761\\u4ef6\\u4fe1\\u4efbta\\uff0c\\u652f\\u6301ta\\u3002\\u4f60\\u89c9\\u5f97\\u4e24\\u4e2a\\u4eba\\u5728\\u4e00\\u8d77\\u6700\\u91cd\\u8981\\u7684\\u5c31\\u662f\\u76f8\\u4e92\\u4fe1\\u4efb\\uff0c\\u5982\\u679c\\u603b\\u662f\\u7591\\u795e\\u7591\\u9b3c\\u7684\\uff0c\\u90a3\\u4e48\\u4e00\\u5b9a\\u4f1a\\u7ed9\\u7231\\u60c5\\u5e26\\u6765\\u4e0d\\u53ef\\u5f25\\u8865\\u7684\\u4f24\\u5bb3\\u3002\\u4f46\\u5982\\u679c\\u7834\\u4e86\\u4f60\\u7684\\u4fe1\\u4efb\\u5e95\\u7ebf\\uff0c\\u4f60\\u5c31\\u4e0d\\u4f1a\\u518d\\u539f\\u8c05ta\\u4e86\\u3002\",\"sharetitle\":\"\\u5728\\u604b\\u4eba\\u773c\\u91cc\\uff0c\\u4f60\\u6709\\u591a\\u73cd\\u8d35\\uff1f\\u6211\\u5728ta\\u773c\\u91cc\\u4ef7\\u503c500\\u4e07\\uff01\",\"oldimg\":\"quce\\/quiz-3859-14924264487oYvtnm0Xt.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a700\\u4ebfbr\\u4e16\\u95f4\\u5c11\\u6709\\u7684\\u5b8c\\u7f8e\\u604b\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-1492426450v2oF2jQbZ5.png\"},{\"threshold\":\"B\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a100\\u4e07br\\u662f\\u966a\\u4f34\\u4e00\\u751f\\u7684\\u5bb6\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-14924264520tKqARAipO.png\"},{\"threshold\":\"C\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a1000\\u4e07br\\u662f\\u653e\\u4e0d\\u4e0b\\u7684\\u53e6\\u4e00\\u534a\",\"oldimg\":\"quce\\/quiz-3859-1492426457hPsEkFLDuL.png\"},{\"threshold\":\"D\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a500\\u4e07br\\u503c\\u5f97\\u597d\\u597d\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3859-14924264487oYvtnm0Xt.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205752076MRAs.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a1000\\u4e07br\\u662f\\u653e\\u4e0d\\u4e0b\\u7684\\u53e6\\u4e00\\u534a\",\"img\":\"quce\\/quiz-5995-PAXtDaRAXi.png\",\"desc\":\"\\u4f60\\u5728\\u604b\\u4eba\\u773c\\u91cc\\u4ef7\\u503c1000\\u4e07\\uff01\\u4f60\\u6562\\u7231\\u6562\\u6068\\uff0c\\u662f\\u975e\\u5206\\u660e\\u3002\\u4f60\\u7684\\u7231\\u60c5\\u5bb9\\u4e0d\\u5f97\\u6742\\u8d28\\uff0c\\u4f46\\u4f60\\u4e5f\\u4e0d\\u4f1a\\u76f2\\u76ee\\u542c\\u4fe1\\u522b\\u4eba\\u5bf9\\u4f60\\u4eec\\u611f\\u60c5\\u7684\\u8bc4\\u4ef7\\u3002\\u7231\\u4e0e\\u4e0d\\u7231\\u662f\\u4f60\\u81ea\\u5df1\\u51b3\\u5b9a\\u7684\\uff0c\\u4e0e\\u4ed6\\u4eba\\u65e0\\u5173\\uff0c\\u56e0\\u4e3a\\u4f60\\u8ba4\\u4e3a\\u7231\\u60c5\\u662f\\u4e24\\u4e2a\\u4eba\\u7684\\u4e8b\\uff0c\\u8bba\\u4e0d\\u5230\\u522b\\u4eba\\u8bf4\\u4e09\\u9053\\u56db\\u3002\",\"sharetitle\":\"\\u5728\\u604b\\u4eba\\u773c\\u91cc\\uff0c\\u4f60\\u6709\\u591a\\u73cd\\u8d35\\uff1f\\u6211\\u5728ta\\u773c\\u91cc\\u4ef7\\u503c1000\\u4e07\\uff01\",\"oldimg\":\"quce\\/quiz-3859-1492426457hPsEkFLDuL.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a700\\u4ebfbr\\u4e16\\u95f4\\u5c11\\u6709\\u7684\\u5b8c\\u7f8e\\u604b\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-1492426450v2oF2jQbZ5.png\"},{\"threshold\":\"B\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a100\\u4e07br\\u662f\\u966a\\u4f34\\u4e00\\u751f\\u7684\\u5bb6\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-14924264520tKqARAipO.png\"},{\"threshold\":\"C\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a1000\\u4e07br\\u662f\\u653e\\u4e0d\\u4e0b\\u7684\\u53e6\\u4e00\\u534a\",\"oldimg\":\"quce\\/quiz-3859-1492426457hPsEkFLDuL.png\"},{\"threshold\":\"D\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a500\\u4e07br\\u503c\\u5f97\\u597d\\u597d\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3859-14924264487oYvtnm0Xt.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205752076MRAs.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a100\\u4e07br\\u662f\\u966a\\u4f34\\u4e00\\u751f\\u7684\\u5bb6\\u4eba\",\"img\":\"quce\\/quiz-5995-WtFS4hyJxQ.png\",\"desc\":\"\\u4f60\\u5728\\u604b\\u4eba\\u773c\\u91cc\\u4ef7\\u503c100\\u4e07\\uff01\\u4f60\\u5bf9\\u7269\\u8d28\\u6709\\u4e00\\u5b9a\\u7684\\u8ffd\\u6c42\\uff0c\\u4e5f\\u8ba4\\u4e3a\\u7231\\u60c5\\u5efa\\u7acb\\u5728\\u7269\\u8d28\\u7684\\u57fa\\u7840\\u4e0a\\uff0c\\u4f46\\u662f\\u4f60\\u5e76\\u4e0d\\u662f\\u62dc\\u91d1\\uff0c\\u4f60\\u5728\\u4e4e\\u7684\\u662f\\u4ee5\\u540e\\u6709\\u4e00\\u4e2a\\u7a33\\u5b9a\\u7684\\u751f\\u6d3b\\u3002\\u4f60\\u8ba4\\u4e3a\\u5982\\u679c\\u4e00\\u4e2a\\u4eba\\u6709\\u80fd\\u8010\\u4e00\\u5b9a\\u5f97\\u6539\\u5584\\u5bb6\\u4eba\\u7684\\u751f\\u6d3b\\u6761\\u4ef6\\uff0c\\u56e0\\u4e3a\\u5bb6\\u4eba\\u662f\\u966a\\u4f34\\u5728\\u8eab\\u8fb9\\u4e00\\u751f\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u5728\\u604b\\u4eba\\u773c\\u91cc\\uff0c\\u4f60\\u6709\\u591a\\u73cd\\u8d35\\uff1f\\u6211\\u5728ta\\u773c\\u91cc\\u4ef7\\u503c100\\u4e07\\uff01\",\"oldimg\":\"quce\\/quiz-3859-14924264520tKqARAipO.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a700\\u4ebfbr\\u4e16\\u95f4\\u5c11\\u6709\\u7684\\u5b8c\\u7f8e\\u604b\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-1492426450v2oF2jQbZ5.png\"},{\"threshold\":\"B\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a100\\u4e07br\\u662f\\u966a\\u4f34\\u4e00\\u751f\\u7684\\u5bb6\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-14924264520tKqARAipO.png\"},{\"threshold\":\"C\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a1000\\u4e07br\\u662f\\u653e\\u4e0d\\u4e0b\\u7684\\u53e6\\u4e00\\u534a\",\"oldimg\":\"quce\\/quiz-3859-1492426457hPsEkFLDuL.png\"},{\"threshold\":\"D\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a500\\u4e07br\\u503c\\u5f97\\u597d\\u597d\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3859-14924264487oYvtnm0Xt.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205752076MRAs.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a700\\u4ebfbr\\u4e16\\u95f4\\u5c11\\u6709\\u7684\\u5b8c\\u7f8e\\u604b\\u4eba\",\"img\":\"quce\\/quiz-5995-yYB4dssbEn.png\",\"desc\":\"\\u4f60\\u5728\\u604b\\u4eba\\u773c\\u91cc\\u4ef7\\u503c700\\u4ebf\\uff01\\u73b0\\u5728\\u5f88\\u591a\\u4eba\\u5c06\\u7269\\u8d28\\u6761\\u4ef6\\u4f5c\\u4e3a\\u9996\\u5148\\u8003\\u8651\\u7684\\u6761\\u4ef6\\uff0c\\u4f46\\u4f60\\u8ba4\\u4e3a\\u94b1\\u5e76\\u4e0d\\u662f\\u6700\\u91cd\\u8981\\u7684\\uff0c\\u4f60\\u8ba4\\u4e3a\\u6700\\u73cd\\u8d35\\u7684\\u662f\\u611f\\u60c5\\u3001\\u624d\\u534e\\u3001\\u5584\\u826f\\u2026\\u2026\\u5728\\u8fd9\\u7269\\u6b32\\u6a2a\\u6d41\\u7684\\u793e\\u4f1a\\u4e2d\\uff0c\\u4f60\\u4f9d\\u7136\\u8fd9\\u4e48\\u771f\\u5584\\u7f8e\\uff0c\\u771f\\u662f\\u96be\\u5f97\\u7684\\u5b58\\u5728\\u3002\\u6240\\u4ee5\\u4f60\\u7684\\u73cd\\u8d35\\u503c\\u5f88\\u9ad8\\uff0c\\u9047\\u5230\\u4f60\\u8fd9\\u6837\\u7684\\u604b\\u4eba\\u771f\\u662f\\u592a\\u5e78\\u798f\\u4e86\\u3002\",\"sharetitle\":\"\\u5728\\u604b\\u4eba\\u773c\\u91cc\\uff0c\\u4f60\\u6709\\u591a\\u73cd\\u8d35\\uff1f\\u6211\\u5728ta\\u773c\\u91cc\\u4ef7\\u503c700\\u4ebf\\uff01\",\"oldimg\":\"quce\\/quiz-3859-1492426450v2oF2jQbZ5.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a700\\u4ebfbr\\u4e16\\u95f4\\u5c11\\u6709\\u7684\\u5b8c\\u7f8e\\u604b\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-1492426450v2oF2jQbZ5.png\"},{\"threshold\":\"B\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a100\\u4e07br\\u662f\\u966a\\u4f34\\u4e00\\u751f\\u7684\\u5bb6\\u4eba\",\"oldimg\":\"quce\\/quiz-3859-14924264520tKqARAipO.png\"},{\"threshold\":\"C\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a1000\\u4e07br\\u662f\\u653e\\u4e0d\\u4e0b\\u7684\\u53e6\\u4e00\\u534a\",\"oldimg\":\"quce\\/quiz-3859-1492426457hPsEkFLDuL.png\"},{\"threshold\":\"D\",\"title\":\"\\u73cd\\u8d35\\u503c\\uff1a500\\u4e07br\\u503c\\u5f97\\u597d\\u597d\\u73cd\\u60dc\",\"oldimg\":\"quce\\/quiz-3859-14924264487oYvtnm0Xt.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205752076MRAs.png\",\"account\":1003}"},

	]

	var data;
	var _Array=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","k"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1])
		if(_num!=-1){
			data=data1[_num];
		}
	}

	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 3);

	}
}

