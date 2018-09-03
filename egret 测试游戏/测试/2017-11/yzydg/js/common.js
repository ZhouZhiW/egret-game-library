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
		{
			"content": "{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\",\"img\":\"quce\\/quiz-5410-dA5BwDizdC.jpg\",\"desc\":\"\\u4f60\\u5c31\\u662f\\u201c\\u6ca1\\u6709\\u4e11\\u5973\\u4eba\\uff0c\\u53ea\\u53c8\\u61d2\\u5973\\u4eba\\u201d\\u91cc\\u9762\\u8bf4\\u7684\\u61d2\\u5973\\u4eba\\uff0c\\u6027\\u5b50\\u5411\\u6765\\u5927\\u5927\\u54a7\\u54a7\\u7684\\u4f60\\u4e00\\u76f4\\u90fd\\u662f\\u61d2\\u5f97\\u6536\\u62fe\\u81ea\\u5df1\\uff0c\\u4efb\\u7531\\u989c\\u503c\\u81ea\\u7531\\u751f\\u957f\\uff0c\\u5176\\u5b9e\\u4f60\\u7684\\u5bb9\\u8c8c\\u4e0a\\u5e76\\u6ca1\\u6709\\u4ec0\\u4e48\\u786e\\u5b9a\\uff0c\\u53ea\\u8981\\u7a0d\\u52a0\\u6253\\u626e\\u5c31\\u80fd\\u591f\\u7f8e\\u8273\\u52a8\\u4eba\\u5566\\uff0c\\u8981\\u597d\\u597d\\u7763\\u4fc3\\u81ea\\u5df1\\u505a\\u51fa\\u6539\\u53d8\\u54e6\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u989c\\u503c\\u7a76\\u7adf\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u989c\\u503c\\u5f97\\u520660\\u5206\\uff0c\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\\uff01\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\"},{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\"},{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\"},{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\"},{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513576853FlNo7.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\",\"img\":\"quce\\/quiz-5410-xR6zj2Nxan.jpg\",\"desc\":\"\\u4f60\\u5c5e\\u4e8e\\u90a3\\u79cd\\u7b2c\\u4e00\\u773c\\u770b\\u4e0a\\u53bb\\u6bd4\\u8f83\\u5e73\\u51e1\\uff0c\\u518d\\u770b\\u53c8\\u89c9\\u5f97\\u6709\\u4e9b\\u5c0f\\u53ef\\u7231\\uff0c\\u8d8a\\u770b\\u8d8a\\u89c9\\u5f97\\u60ca\\u8273\\u7684\\u7c7b\\u578b\\u3002\\u4f60\\u5f88\\u61c2\\u5f97\\u906e\\u76d6\\u81ea\\u5df1\\u7684\\u7f3a\\u70b9\\uff0c\\u7a81\\u51fa\\u81ea\\u5df1\\u7684\\u4f18\\u70b9\\uff0c\\u540c\\u65f6\\u4f60\\u7684\\u6027\\u683c\\u4e5f\\u662f\\u5341\\u5206\\u53d7\\u6b22\\u8fce\\u7684\\u54ea\\u79cd\\uff0c\\u8fd9\\u6837\\u7684\\u4f60\\u8ba9\\u4eba\\u8d8a\\u770b\\u8d8a\\u987a\\u773c\\uff0c\\u6700\\u540e\\u820d\\u4e0d\\u5f97\\u79fb\\u5f00\\u76ee\\u5149\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u989c\\u503c\\u7a76\\u7adf\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u989c\\u503c\\u5f97\\u520689\\u5206\\uff0c\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\"},{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\"},{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\"},{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\"},{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513576853FlNo7.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\",\"img\":\"quce\\/quiz-5410-pCr4yjfFhN.jpg\",\"desc\":\"\\u4f60\\u5c31\\u50cf\\u8377\\u82b1\\u4e00\\u6837\\u51fa\\u6de4\\u6ce5\\u800c\\u4e0d\\u67d3\\uff0c\\u8ba9\\u4eba\\u89c9\\u5f97\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\\u3002\\u4f60\\u7684\\u989c\\u503c\\u4e0d\\u6b62\\u6765\\u6e90\\u4e8e\\u4f60\\u7684\\u5bb9\\u8c8c\\uff0c\\u66f4\\u91cd\\u8981\\u7684\\u662f\\u4f60\\u4ece\\u5185\\u800c\\u5916\\u6563\\u53d1\\u51fa\\u7684\\u9ad8\\u96c5\\u6c14\\u8d28\\uff0c\\u8fd9\\u79cd\\u6c14\\u8d28\\u4f1a\\u8ba9\\u4f60\\u7684\\u6bcf\\u4e2a\\u52a8\\u4f5c\\uff0c\\u6bcf\\u4e2a\\u8868\\u60c5\\u90fd\\u6709\\u4e00\\u5927\\u5806\\u5f02\\u6027\\u4e3a\\u4f60\\u503e\\u5012\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u989c\\u503c\\u7a76\\u7adf\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u989c\\u503c\\u5f97\\u5206111\\u5206\\uff0c\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\"},{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\"},{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\"},{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\"},{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513576853FlNo7.png\",\"account\":1003}"
		},

		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\",\"img\":\"quce\\/quiz-5410-SbbxJRShpD.jpg\",\"desc\":\"\\u4f60\\u662f\\u90a3\\u79cd\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u82b1\\u89c1\\u82b1\\u5f00\\uff0c\\u8f66\\u89c1\\u8f66\\u8f7d\\u7684\\u7f8e\\u5c11\\u5973\\u7c7b\\u578b\\u3002\\u989c\\u503c\\u4e0a\\u4f60\\u5929\\u751f\\u5c31\\u6709\\u4e00\\u4e2a\\u597d\\u5e95\\u5b50\\uff0c\\u4f60\\u4e5f\\u5f88\\u64c5\\u957f\\u6253\\u626e\\u81ea\\u5df1\\uff0c\\u968f\\u4fbf\\u6536\\u62fe\\u4e00\\u4e0b\\u5c31\\u662f\\u4e00\\u4e2a\\u503e\\u56fd\\u503e\\u57ce\\u7684\\u7f8e\\u4eba\\uff0c\\u5f88\\u5bb9\\u6613\\u53e6\\u5f02\\u6027\\u5bf9\\u4f60\\u4e00\\u89c1\\u949f\\u60c5\\u3002\\n<br>\",\"sharetitle\":\"\\u4f60\\u7684\\u989c\\u503c\\u7a76\\u7adf\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u989c\\u503c\\u5f97\\u5206152\\u5206\\uff0c\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\"},{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\"},{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\"},{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\"},{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513576853FlNo7.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\",\"img\":\"quce\\/quiz-5410-GhB85MzNmr.jpg\",\"desc\":\"\\u4f60\\u7684\\u989c\\u503c\\u5df2\\u7ecf\\u8fbe\\u5230\\u9006\\u5929\\u7684\\u6c34\\u5e73\\uff0c\\u53ef\\u4ee5\\u8bf4\\u662f\\u96be\\u5f97\\u4e00\\u89c1\\u7684\\u5c24\\u7269\\u3002\\u5728\\u5f88\\u591a\\u5f02\\u6027\\u773c\\u91cc\\u4f60\\u90fd\\u662f\\u53ef\\u9047\\u4e0d\\u53ef\\u6c42\\u7684\\u7edd\\u4e16\\u7f8e\\u4eba\\uff0c\\u4e00\\u98a6\\u4e00\\u7b11\\u90fd\\u80fd\\u591f\\u8ba9\\u4eba\\u795e\\u9b42\\u98a0\\u5012\\uff0c\\u8fd9\\u6837\\u95ed\\u6708\\u7f9e\\u82b1\\u7684\\u4f60\\u8ba9\\u5f88\\u591a\\u540c\\u6027\\u90fd\\u5bf9\\u4f60\\u65e2\\u7fa1\\u6155\\u53c8\\u5ac9\\u5992\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u989c\\u503c\\u7a76\\u7adf\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u989c\\u503c\\u5f97\\u5206190\\u5206\\uff0c\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a190\\u5206br\\u95ed\\u6708\\u7f9e\\u82b1\\uff0c\\u76db\\u4e16\\u7f8e\\u989c\"},{\"threshold\":\"B\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a152\\u5206br\\u4eba\\u89c1\\u4eba\\u7231\\uff0c\\u503e\\u56fd\\u503e\\u57ce\"},{\"threshold\":\"C\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a111\\u5206br\\u8d4f\\u5fc3\\u60a6\\u76ee\\uff0c\\u6e05\\u65b0\\u53ef\\u4eba\"},{\"threshold\":\"D\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a89\\u5206br\\u8d8a\\u770b\\u8d8a\\u7740\\u8ff7\"},{\"threshold\":\"E\",\"title\":\"\\u989c\\u503c\\u5f97\\u5206\\uff1a60\\u5206br\\u4e0d\\u7231\\u6253\\u626e\\u7684\\u61d2\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/1513576853FlNo7.png\",\"account\":1003}"
		}
	]


	var _num=0;
	var data;
	for(var i=0;i<option.length;i++){
		_num+=option[i];
	}
	if(_num<10){
		data=data1[0];
		
	}else if(_num<14&&_num>=10) {
		data=data1[1];
	
	}else if(_num<18&&_num>=14){
		data=data1[2];
	
	}else if(_num<21&&_num>=18){
		data=data1[3];
		
	}else if(_num<_num>=21){
		data=data1[4];
	}
	console.log(_num);
	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] ="./"+ result['img'];
		}
		// clearInterval(getTimer);
		// if(timerCnt < waitTime){
		// 	waitTime -= timerCnt;
			callback(result, JSON.parse(data['total']), waitTime);
		// }else{
		// 	callback(result, JSON.parse(data['total']), 0);
		// }
	}
	// $.ajax({
	// 	type: 'POST',
	// 	url: serser,
	// 	data: postData,
	// 	dataType: 'json',
	// 	timeout: 20000,
	// 	success: function(data){
	// 		if(data.status == 200){
	// 			var result = JSON.parse(data['content']);
	// 			var attention = JSON.parse(data['attention']);
	// 			result['attention'] = attention;
	// 			if(result['img']){
	// 				result['img'] = adminPath +"/"+ result['img'];
	// 			}
	// 			clearInterval(getTimer);
	// 			if(timerCnt < waitTime){
	// 				waitTime -= timerCnt;
	// 				callback(result, JSON.parse(data['total']), waitTime);
	// 			}else{
	// 				callback(result, JSON.parse(data['total']), 0);
	// 			}
	// 		}else{
	// 			clearInterval(checkTimer);
	// 			clearInterval(getTimer);
	// 			if(timerCnt < waitTime){
	// 				setTimeout(function(){
	// 					showError(data.status);
	// 				}, (waitTime-timerCnt)*1000);
	// 			}else{
	// 				showError(data.status);
	// 			}
	// 		}
	// 	},
	// 	error: function(xhr, type){
	// 		var errorinfo = xhr.status+" "+type;
	// 		// console.log(errorinfo)
	// 		showError(errorinfo);
	// 	}
	// })
}

