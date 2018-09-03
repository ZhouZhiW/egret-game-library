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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a200%br\\u6c38\\u8fdc\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\",\"img\":\"quce\\/quiz-5600-74RKJQ3JET.jpg\",\"desc\":\"\\u88ab\\u4f60\\u7231\\u4e0a\\u7684\\u4eba\\u4f1a\\u5f88\\u5e78\\u798f\\uff0c\\u56e0\\u4e3a\\u4f60\\u53ef\\u4ee5\\u5728\\u751f\\u6d3b\\u4e2d\\u5c06\\u5bf9\\u65b9\\u7167\\u987e\\u5f97\\u65e0\\u5fae\\u4e0d\\u81f3\\uff0c\\u800c\\u4e14\\u4f60\\u89c9\\u5f97\\u81ea\\u5df1\\u600e\\u4e48\\u4ed8\\u51fa\\u90fd\\u662f\\u503c\\u5f97\\u7684\\u3002\\u6b64\\u5916\\u4f60\\u8fd8\\u4f1a\\u65e0\\u6761\\u4ef6\\u7684\\u652f\\u6301ta\\uff0c\\u53ea\\u8981\\u662f\\u5bf9\\u65b9\\u60f3\\u505a\\u7684\\uff0c\\u4f60\\u5c31\\u4f1a\\u51fa\\u94b1\\u51fa\\u529b\\u3002\\u6240\\u4ee5\\u4f60\\u662f\\u628a\\u6eba\\u7231ta\\u5f53\\u4f5c\\u68a6\\u60f3\\u4e00\\u6837\\u53bb\\u5b9e\\u73b0\\u7684\\uff0c\\u4f46\\u662f\\u8bb0\\u4f4f\\u522b\\u628ata\\u5ba0\\u574f\\u4e86\\uff01\",\"sharetitle\":\"\\u4f60\\u5bf9\\u604b\\u4eba\\u6709\\u591a\\u6eba\\u7231\\uff1f\\u6211\\u5bf9\\u604b\\u4eba\\u7684\\u6eba\\u7231\\u5ea6\\u662f200%\\uff0c\\u5904\\u5904\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a200%br\\u6c38\\u8fdc\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\"},{\"threshold\":\"B\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a100%br\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\"},{\"threshold\":\"C\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a70%br\\u4e0d\\u4f1a\\u4e3a\\u7231\\u5931\\u53bb\\u7406\\u667a\"},{\"threshold\":\"D\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a50%br\\u7406\\u6027\\u5730\\u5bf9\\u5f85\\u611f\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15166152170729R.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a100%br\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\",\"img\":\"quce\\/quiz-5600-pFb3Y4Y5cy.jpg\",\"desc\":\"\\u4f60\\u5f88\\u6ce8\\u610f\\u4f53\\u8c05\\u5bf9\\u65b9\\u7684\\u611f\\u53d7\\uff0c\\u54ea\\u6015\\u81ea\\u5df1\\u53d7\\u70b9\\u59d4\\u5c48\\u4f60\\u4e5f\\u80fd\\u5fcd\\u3002\\u4f60\\u4e0d\\u5149\\u662fta\\u7684\\u53e6\\u4e00\\u534a\\uff0c\\u4f60\\u8fd8\\u5e0c\\u671b\\u80fd\\u4e3ata\\u6392\\u5fe7\\u89e3\\u96be\\uff0c\\u56e0\\u4e3a\\u4f60\\u6700\\u770b\\u4e0d\\u5f97ta\\u53d7\\u82e6\\uff01\\u5f53\\u4f60\\u7231\\u4e0a\\u4e00\\u4e2a\\u4eba\\u7684\\u65f6\\u5019\\uff0c\\u4f60\\u4f1a\\u628a\\u5bf9\\u65b9\\u5f53\\u4f5c\\u81ea\\u5df1\\u6700\\u91cd\\u8981\\u7684\\u90e8\\u5206\\uff0c\\u6240\\u4ee5\\u4f60\\u4f1a\\u628a\\u6700\\u597d\\u7684\\u90fd\\u7ed9ta\\uff0c\\u8fd9\\u6837\\u4f60\\u5c31\\u89c9\\u5f97\\u5fc3\\u6ee1\\u610f\\u8db3\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u5bf9\\u604b\\u4eba\\u6709\\u591a\\u6eba\\u7231\\uff1f\\u6211\\u5bf9\\u604b\\u4eba\\u7684\\u6eba\\u7231\\u5ea6\\u662f100%\\uff0c\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a200%br\\u6c38\\u8fdc\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\"},{\"threshold\":\"B\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a100%br\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\"},{\"threshold\":\"C\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a70%br\\u4e0d\\u4f1a\\u4e3a\\u7231\\u5931\\u53bb\\u7406\\u667a\"},{\"threshold\":\"D\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a50%br\\u7406\\u6027\\u5730\\u5bf9\\u5f85\\u611f\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15166152170729R.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a70%br\\u4e0d\\u4f1a\\u4e3a\\u7231\\u5931\\u53bb\\u7406\\u667a\",\"img\":\"quce\\/quiz-5600-JxMFHwiSds.jpg\",\"desc\":\"\\u7231\\u60c5\\u4e2d\\uff0c\\u4f60\\u4e0d\\u5149\\u60f3\\u5728\\u60c5\\u611f\\u4e0a\\u6ee1\\u8db3\\u5bf9\\u65b9\\uff0c\\u4f60\\u8fd8\\u60f3\\u548cta\\u5728\\u7cbe\\u795e\\u4e0a\\u4ea7\\u751f\\u5171\\u9e23\\u3002\\u6240\\u4ee5\\u4f60\\u60f3\\u6210\\u4e3ata\\u7684\\u7cbe\\u795e\\u652f\\u67f1\\uff0c\\u4f60\\u53ef\\u4ee5\\u8ba4\\u771f\\u8046\\u542cta\\u7684\\u62b1\\u6028\\uff0c\\u5e76\\u4e3ata\\u6392\\u5fe7\\u89e3\\u96be\\u3002\\u5982\\u679cta\\u89e6\\u53ca\\u4e86\\u4f60\\u7684\\u5e95\\u7ebf\\uff0c\\u82e5\\u662f\\u9996\\u72af\\uff0c\\u4f60\\u4f1a\\u7ed9\\u53cc\\u65b9\\u4e00\\u6b21\\u673a\\u4f1a\\uff0c\\u4f46\\u82e5\\u4e00\\u72af\\u518d\\u72af\\uff0c\\u4f60\\u4e5f\\u4f1a\\u542b\\u6cea\\u79bb\\u5f00\\uff0c\\u56e0\\u4e3a\\u6700\\u540e\\u7684\\u5e95\\u7ebf\\u4e0d\\u80fd\\u7834\\u3002\",\"sharetitle\":\"\\u4f60\\u5bf9\\u604b\\u4eba\\u6709\\u591a\\u6eba\\u7231\\uff1f\\u6211\\u5bf9\\u604b\\u4eba\\u7684\\u6eba\\u7231\\u5ea6\\u662f70%\\uff0c\\u5f88\\u7231\\u5f88\\u7231ta\\uff0c\\u4f46\\u6ca1\\u6709\\u5931\\u53bb\\u7406\\u667a\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a200%br\\u6c38\\u8fdc\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\"},{\"threshold\":\"B\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a100%br\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\"},{\"threshold\":\"C\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a70%br\\u4e0d\\u4f1a\\u4e3a\\u7231\\u5931\\u53bb\\u7406\\u667a\"},{\"threshold\":\"D\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a50%br\\u7406\\u6027\\u5730\\u5bf9\\u5f85\\u611f\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15166152170729R.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a50%br\\u7406\\u6027\\u5730\\u5bf9\\u5f85\\u611f\\u60c5\",\"img\":\"quce\\/quiz-5600-bTChzeG8dK.jpg\",\"desc\":\"\\u72ec\\u7acb\\u81ea\\u4e3b\\u7684\\u4f60\\uff0c\\u5e0c\\u671b\\u5728\\u7231\\u60c5\\u4e2d\\u4e5f\\u80fd\\u4fdd\\u7559\\u4e00\\u5b9a\\u7684\\u79c1\\u4eba\\u7a7a\\u95f4\\uff0c\\u4f60\\u4e0d\\u5e0c\\u671b\\u7231\\u60c5\\u53d8\\u6210\\u4e24\\u4e2a\\u4eba\\u7684\\u67b7\\u9501\\u3002\\u6240\\u4ee5\\u4f60\\u901a\\u5e38\\u4e0d\\u4f1a\\u7f20\\u7740\\u5bf9\\u65b9\\uff0c\\u6709\\u65f6\\u751a\\u81f3\\u4f1a\\u663e\\u5f97\\u6709\\u4e9b\\u51b7\\u6de1\\uff0c\\u4f46\\u5374\\u4e0d\\u4f1a\\u8ba9\\u7231\\u60c5\\u53d8\\u5f97\\u6ca1\\u6709\\u6e29\\u5ea6\\u3002\\u6240\\u4ee5\\u5982\\u679c\\u4f60\\u53d1\\u73b0\\u604b\\u4eba\\u505a\\u4e86\\u5bf9\\u4e0d\\u8d77\\u81ea\\u5df1\\u7684\\u4e8b\\u60c5\\uff0c\\u4f60\\u4f1a\\u518d\\u4e09\\u8861\\u91cf\\uff0c\\u7edd\\u4e0d\\u4f1a\\u8f7b\\u6613\\u539f\\u8c05\\u5bf9\\u65b9\\u3002\",\"sharetitle\":\"\\u4f60\\u5bf9\\u604b\\u4eba\\u6709\\u591a\\u6eba\\u7231\\uff1f\\u6211\\u5bf9\\u604b\\u4eba\\u7684\\u6eba\\u7231\\u5ea6\\u662f50%\\uff0c\\u4e0d\\u4f1a\\u8fc7\\u5206\\u6eba\\u7231\\u5bf9\\u65b9\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a200%br\\u6c38\\u8fdc\\u628ata\\u653e\\u5728\\u7b2c\\u4e00\\u4f4d\"},{\"threshold\":\"B\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a100%br\\u5904\\u5904\\u4e3a\\u5bf9\\u65b9\\u7740\\u60f3\"},{\"threshold\":\"C\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a70%br\\u4e0d\\u4f1a\\u4e3a\\u7231\\u5931\\u53bb\\u7406\\u667a\"},{\"threshold\":\"D\",\"title\":\"\\u6eba\\u7231\\u5ea6\\uff1a50%br\\u7406\\u6027\\u5730\\u5bf9\\u5f85\\u611f\\u60c5\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15166152170729R.png\",\"account\":1003}"},
	]
	var data;
	var _Array=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","k"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1])
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

