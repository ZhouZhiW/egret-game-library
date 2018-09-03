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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05br\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\",\"img\":\"quce\\/quiz-4946-wzyC6BWeS3.jpg\",\"desc\":\"\\u5728\\u670b\\u53cb\\u773c\\u4e2d\\uff0c\\u4f60\\u662f\\u4e2a\\u8d85\\u7ea7\\u65e0\\u654c\\u597d\\u76f8\\u5904\\u7684\\u4eba\\u3002\\u4f60\\u7684\\u813e\\u6c14\\u6027\\u683c\\u592a\\u597d\\u4e86\\uff0c\\u4efb\\u4f55\\u7c7b\\u578b\\u7684\\u4eba\\u4f60\\u90fd\\u80fd\\u548c\\u4ed6\\u4eec\\u76f8\\u5904\\u7684\\u5f88\\u597d\\uff0c\\u7231\\u8bf4\\u7231\\u7b11\\u7684\\u4f60\\uff0c\\u81ea\\u7136\\u4e5f\\u662f\\u670b\\u53cb\\u773c\\u4e2d\\u7684\\u5f00\\u5fc3\\u679c\\uff0c\\u65e0\\u8bba\\u4efb\\u4f55\\u4e3b\\u9898\\u7684\\u805a\\u4f1a\\uff0c\\u5927\\u5bb6\\u90fd\\u559c\\u6b22\\u9080\\u8bf7\\u4f60\\u6765\\u4e00\\u8d77\\u53c2\\u52a0\\uff0c\\u5178\\u578b\\u7684\\u5927\\u4f17\\u597d\\u4eba\\u7f18\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05\\uff0c\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\\uff0c\\u6d4b\\u6d4b\\u770b\\u4f60\\u662f\\u4e00\\u4e2a\\u597d\\u76f8\\u5904\\u7684\\u4eba\\u5417\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05br\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\"},{\"threshold\":\"B\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05br\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05br\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\"},{\"threshold\":\"D\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05br\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608014Ltcm6.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05br\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\",\"img\":\"quce\\/quiz-4946-eazTmtyF5M.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u86ee\\u8d34\\u5fc3\\u7684\\u4eba\\uff0c\\u4e0e\\u670b\\u53cb\\u76f8\\u5904\\u65f6\\uff0c\\u4f60\\u5f88\\u4f1a\\u62ff\\u634f\\u5c3a\\u5ea6\\u3002\\u5728\\u5927\\u5bb6\\u773c\\u4e2d\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u6e29\\u6696\\u7684\\u4eba\\uff0c\\u603b\\u80fd\\u6362\\u4f4d\\u601d\\u8003\\u7684\\u4e3a\\u4ed6\\u4eba\\u7740\\u60f3\\uff0c\\u5728\\u670b\\u53cb\\u4e2d\\u4e5f\\u626e\\u6f14\\u7740\\u77e5\\u5fc3\\u60c5\\u611f\\u8fbe\\u4eba\\u89d2\\u8272\\u3002\\u6240\\u4ee5\\uff0c\\u5927\\u5bb6\\u81ea\\u7136\\u90fd\\u559c\\u6b22\\u4f60\\u8fd9\\u6837\\u7684\\u77e5\\u5fc3\\u597d\\u53cb\\uff0c\\u5bf9\\u4f60\\u4e5f\\u662f\\u5341\\u5206\\u7684\\u4f9d\\u8d56\\u5462\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05\\uff0c\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\\uff0c\\u6d4b\\u6d4b\\u770b\\u4f60\\u662f\\u4e00\\u4e2a\\u597d\\u76f8\\u5904\\u7684\\u4eba\\u5417\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05br\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\"},{\"threshold\":\"B\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05br\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05br\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\"},{\"threshold\":\"D\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05br\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608014Ltcm6.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05br\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\",\"img\":\"quce\\/quiz-4946-dNfrNAEaBH.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u6709\\u539f\\u5219\\u7684\\u4eba\\uff0c\\u4f60\\u91cd\\u89c6\\u53cb\\u8c0a\\uff0c\\u4f46\\u4e0d\\u4f1a\\u76f2\\u76ee\\u5730\\u4e3a\\u4e86\\u53cb\\u8c0a\\u53bb\\u727a\\u7272\\u81ea\\u5df1\\u7684\\u539f\\u5219\\u3002\\u5728\\u4f60\\u770b\\u6765\\uff0c\\u53cb\\u8c0a\\u7684\\u524d\\u63d0\\u662f\\u5f7c\\u6b64\\u5c0a\\u91cd\\u4e0e\\u8c05\\u89e3\\uff0c\\u662f\\u540c\\u7518\\u5171\\u82e6\\uff0c\\u800c\\u4e0d\\u662f\\u65e0\\u7406\\u53d6\\u95f9\\u3002\\u867d\\u7136\\u575a\\u6301\\u539f\\u5219\\uff0c\\u4f46\\u4f60\\u5e76\\u4e0d\\u56fa\\u6267\\uff0c\\u6240\\u4ee5\\u53ea\\u8981\\u4e0d\\u89e6\\u53ca\\u5e95\\u7ebf\\uff0c\\u4f60\\u90fd\\u662f\\u5f88\\u597d\\u76f8\\u5904\\u7684\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05\\uff0c\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\\uff0c\\u6d4b\\u6d4b\\u770b\\u4f60\\u662f\\u4e00\\u4e2a\\u597d\\u76f8\\u5904\\u7684\\u4eba\\u5417\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05br\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\"},{\"threshold\":\"B\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05br\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05br\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\"},{\"threshold\":\"D\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05br\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608014Ltcm6.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05br\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\",\"img\":\"quce\\/quiz-4946-nG6F8DbfSK.jpg\",\"desc\":\"\\u4f60\\u662f\\u4e2a\\u771f\\u6027\\u60c5\\u7684\\u4eba\\uff0c\\u4f5c\\u4e3a\\u670b\\u53cb\\uff0c\\u4f60\\u8bb2\\u4e49\\u6c14\\u9760\\u5f97\\u4f4f\\u3002\\u53ea\\u662f\\uff0c\\u592a\\u8fc7\\u76f4\\u63a5\\u7684\\u6027\\u683c\\u8ba9\\u4f60\\u5f88\\u5bb9\\u6613\\u5403\\u4e8f\\uff0c\\u56e0\\u4e3a\\u8bf4\\u8bdd\\u603b\\u662f\\u4e0d\\u7ecf\\u5927\\u8111\\u7684\\u53e3\\u65e0\\u906e\\u62e6\\uff0c\\u7ecf\\u5e38\\u4f1a\\u5c06\\u4ed6\\u4eba\\u7f6e\\u4e8e\\u5c34\\u5c2c\\u7684\\u5904\\u5883\\uff0c\\u4e5f\\u4f1a\\u8ba9\\u4eba\\u8bef\\u89e3\\u4f60\\u6709\\u4e9b\\u4e0d\\u597d\\u76f8\\u5904\\u54e6\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05\\uff0c\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\\uff0c\\u6d4b\\u6d4b\\u770b\\u4f60\\u662f\\u4e00\\u4e2a\\u597d\\u76f8\\u5904\\u7684\\u4eba\\u5417\\uff1f\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a200\\uff05br\\u6027\\u683c\\u5f00\\u6717\\u597d\\u813e\\u6c14\"},{\"threshold\":\"B\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a99.99\\uff05br\\u6e29\\u67d4\\u4f53\\u8d34\\u5f97\\u4eba\\u5fc3\"},{\"threshold\":\"C\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a85\\uff05br\\u6709\\u539f\\u5219\\u4f46\\u4e0d\\u56fa\\u6267\"},{\"threshold\":\"D\",\"title\":\"\\u597d\\u76f8\\u5904\\u6307\\u6570\\uff1a66\\uff05br\\u4e3a\\u4eba\\u5766\\u7387\\u771f\\u6027\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516608014Ltcm6.png\",\"account\":1003}"},
	]
	var data;
	var _Array=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","k"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1]);
		if(_num!=-1){
			data=data1[_num];
		}
	}

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

