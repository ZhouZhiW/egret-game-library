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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\",\"img\":\"quce\\/quiz-6048-DS78RNbwHE.jpg\",\"desc\":\"\\u5bb6\\u517b\\u7684\\u4e8c\\u54c8\\u6bd4\\u8f83\\u6e29\\u987a\\uff0c\\u4e0d\\u4f1a\\u8fc7\\u5ea6\\u6000\\u7591\\u751f\\u4eba\\u6216\\u653b\\u51fb\\u5176\\u4ed6\\u72ac\\u7c7b\\u3002\\u4f60\\u5c31\\u50cfta\\u4e00\\u6837\\uff0c\\u5177\\u6709\\u4e00\\u9897\\u4ee4\\u4eba\\u53d1\\u6307\\u7684\\u72af\\u4e8c\\u7684\\u5fc3\\uff0c\\u81ea\\u5e26\\u7684\\u9017\\u8da3\\u672c\\u8d28\\u80fd\\u7ed9\\u5927\\u5bb6\\u5e26\\u6765\\u4e0d\\u5c11\\u5feb\\u4e50\\u3002\\u6240\\u4ee5\\uff0c\\u54c8\\u58eb\\u5947\\u7684\\u4e3b\\u4eba\\u90fd\\u6bd4\\u8f83\\u53cb\\u597d\\uff0c\\u70ed\\u60c5\\uff0c\\u4f60\\u8bf4\\u4e0d\\u5b9a\\u5c31\\u662f\\u4e2a\\u9017\\u903c\\uff0c\\u7ecf\\u5e38\\u7ed9\\u8eab\\u8fb9\\u7684\\u4eba\\u5e26\\u6765\\u5feb\\u4e50\\uff0c\\u662f\\u8eab\\u8fb9\\u7684\\u4eba\\u7684\\u5f00\\u5fc3\\u679c\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u50cf\\u54ea\\u79cd\\u72d7\\u72d7\\uff1f\\u6211\\u50cf\\uff1a\\u54c8\\u58eb\\u5947\\uff0c\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"},{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"},{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"},{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"},{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578833T6SbI.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\",\"img\":\"quce\\/quiz-6048-FE3BTBaB4W.jpg\",\"desc\":\"\\u4f60\\u6709\\u8010\\u5fc3\\u800c\\u4e14\\u53cb\\u5584\\u6e29\\u987a\\uff0c\\u5c31\\u50cf\\u91d1\\u6bdb\\u4e00\\u6837\\u662f\\u5c0f\\u5b69\\u5b50\\u6216\\u662f\\u5a74\\u513f\\u7684\\u597d\\u4f19\\u4f34\\uff0c\\u662f\\u4e00\\u4e2a\\u5b9e\\u6253\\u5b9e\\u7684\\u5927\\u6696\\u7537\\/\\u5973\\uff0c\\u91d1\\u6bdb\\u7684\\u667a\\u5546\\u5f88\\u9ad8\\uff0c\\u81ea\\u4fe1\\u800c\\u4e14\\u4e0d\\u6015\\u751f\\u3002\\u4f60\\u6709\\u7740\\u8ba8\\u4eba\\u559c\\u6b22\\u7684\\u6027\\u683c\\uff0c\\u4eba\\u9645\\u5173\\u7cfb\\u5f88\\u597d\\uff0c\\u6e29\\u6696\\u800c\\u5584\\u826f\\uff0c\\u662f\\u8eab\\u8fb9\\u7684\\u4eba\\u7684\\u5c0f\\u592a\\u9633\\uff1b\\u5076\\u5c14\\u53ef\\u80fd\\u4f1a\\u7f3a\\u4e4f\\u5b89\\u5168\\u611f\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u50cf\\u54ea\\u79cd\\u72d7\\u72d7\\uff1f\\u6211\\u50cf\\uff1a\\u91d1\\u6bdb\\uff0c\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"},{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"},{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"},{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"},{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578833T6SbI.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\",\"img\":\"quce\\/quiz-6048-aXGwbh7izD.jpg\",\"desc\":\"\\u8428\\u6469\\u8036\\u7684\\u5916\\u8868\\u975e\\u5e38\\u6f02\\u4eae\\uff0c\\u800c\\u4e14\\u6709\\u7740\\u81ea\\u5e26\\u5fae\\u7b11\\u7684\\u8138\\uff0c\\u7ed9\\u4eba\\u4e00\\u79cd\\u5341\\u5206\\u6e29\\u6696\\u7684\\u611f\\u89c9\\u3002\\u4f60\\u7684\\u6027\\u683c\\u5c31\\u50cf\\u8428\\u6469\\u8036\\u5341\\u5206\\u6e29\\u987a\\u53cb\\u5584\\uff0c\\u867d\\u7136\\u901f\\u5ea6\\u5f88\\u5feb\\uff0c\\u662f\\u51fa\\u8272\\u7684\\u5b88\\u536b\\u72ac\\uff0c\\u4f46\\u53ea\\u8981\\u4f60\\u4e0d\\u62db\\u60f9\\u5b83\\uff0c\\u5b83\\u5c31\\u4e0d\\u4f1a\\u8f7b\\u6613\\u653b\\u51fb\\u522b\\u4eba\\uff1b\\u4f60\\u5185\\u5fc3\\u5145\\u6ee1\\u9633\\u5149\\uff0c\\u6e29\\u548c\\uff0c\\u559c\\u6b22\\u6709\\u81ea\\u5df1\\u7684\\u7a7a\\u95f4\\u6216\\u65f6\\u95f4\\u5b89\\u5b89\\u9759\\u9759\\u5730\\u5f85\\u7740\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u50cf\\u54ea\\u79cd\\u72d7\\u72d7\\uff1f\\u6211\\u50cf\\uff1a\\u8428\\u6469\\u8036\\uff0c\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"},{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"},{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"},{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"},{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578833T6SbI.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\",\"img\":\"quce\\/quiz-6048-84Nz2cEQCi.jpg\",\"desc\":\"\\u67ef\\u57fa\\u5929\\u751f\\u6027\\u683c\\u975e\\u5e38\\u7a33\\u5065\\u3001\\u6ca1\\u6709\\u653b\\u51fb\\u6027\\uff0c\\u667a\\u5546\\u9ad8\\uff1b\\u201c\\u7231\\u7b11\\u7684\\u773c\\u775b\\u201d\\u662fta\\u72ec\\u6709\\u7684\\u6c14\\u8d28\\u3002\\u4f60\\u662f\\u4e2a\\u5185\\u5fc3\\u5145\\u6ee1\\u9633\\u5149\\uff0c\\u806a\\u6167\\uff0c\\u51e1\\u4e8b\\u5145\\u6ee1\\u5174\\u8da3\\uff0c\\u4ece\\u4e0d\\u51f6\\u72e0\\u7684\\u4eba\\uff1b\\u800c\\u4e14\\uff0c\\u4f60\\u548c\\u67ef\\u57fa\\u4e00\\u6837\\uff0c\\u662f\\u4e2a\\u6e29\\u6696\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u50cf\\u54ea\\u79cd\\u72d7\\u72d7\\uff1f\\u6211\\u50cf\\uff1a\\u67ef\\u57fa\\uff0c\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"},{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"},{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"},{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"},{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578833T6SbI.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\",\"img\":\"quce\\/quiz-6048-NZDpK2t5pQ.jpg\",\"desc\":\"\\u62c9\\u5e03\\u62c9\\u591a\\u5929\\u751f\\u4e2a\\u6027\\u6e29\\u548c\\u3001\\u6d3b\\u6cfc\\u3001\\u6ca1\\u6709\\u653b\\u51fb\\u6027\\uff0c\\u667a\\u5546\\u9ad8\\uff0c\\u9510\\u5229\\u3001\\u53cb\\u5584\\u7684\\u773c\\u795e\\u663e\\u793a\\u51fa\\u826f\\u597d\\u7684\\u6c14\\u8d28\\uff0c\\u806a\\u660e\\u800c\\u673a\\u654f\\u662fta\\u7684\\u7279\\u70b9\\u3002\\u4f60\\u662f\\u4e2a\\u53cb\\u5584\\u3001\\u806a\\u660e\\u800c\\u673a\\u654f\\u7684\\u4eba\\uff1b\\u800c\\u4e14\\uff0c\\u4f60\\u548c\\u62c9\\u5e03\\u62c9\\u591a\\u4e00\\u6837\\uff0c\\u662f\\u4e2a\\u5927\\u5403\\u8d27\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u6027\\u683c\\u50cf\\u54ea\\u79cd\\u72d7\\u72d7\\uff1f\\u6211\\u50cf\\uff1a\\u62c9\\u5e03\\u62c9\\u591a\\uff0c\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u54c8\\u58eb\\u5947br\\u8822\\u840c\\u53ef\\u7231\\uff0c\\u70ed\\u60c5\\u5954\\u653e\"},{\"threshold\":\"B\",\"title\":\"\\u91d1\\u6bdbbr\\u6e29\\u987a\\u8ba8\\u559c\\uff0c\\u70ed\\u60c5\\u6d3b\\u6cfc\"},{\"threshold\":\"C\",\"title\":\"\\u8428\\u6469\\u8036br\\u5fae\\u7b11\\u5929\\u4f7f\\uff0c\\u6e29\\u6696\\u9633\\u5149\"},{\"threshold\":\"D\",\"title\":\"\\u67ef\\u57fabr\\u6d3b\\u6cfc\\u53ef\\u7231\\uff0c\\u8ba8\\u559c\\u806a\\u6167\"},{\"threshold\":\"E\",\"title\":\"\\u62c9\\u5e03\\u62c9\\u591abr\\u806a\\u660e\\u673a\\u654f\\uff0c\\u6e29\\u548c\\u597d\\u813e\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578833T6SbI.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 7) {
		data = data1[4];

	} else if (_num < 9 && _num >= 7) {
		data = data1[3];

	} else if (_num < 11 && _num >= 9) {
		data = data1[2];

	} else if (_num < 13 &&_num >= 11) {
		data = data1[1];
	}else if (_num >= 13) {
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

