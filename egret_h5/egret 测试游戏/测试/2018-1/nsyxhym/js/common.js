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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a90\\uff05\",\"img\":\"quce\\/quiz-2375-MYYBfWGdNw.jpg\",\"desc\":\"\\u4f60\\u5bf9\\u5f02\\u6027\\u6709\\u5f88\\u5927\\u7684\\u5438\\u5f15\\u529b\\uff01\\u5728\\u5f02\\u6027\\u7684\\u773c\\u4e2d\\uff0c\\u4f60\\u6709\\u4e00\\u79cd\\u9b45\\u529b\\u3002\\u4f60\\u4e0d\\u53ea\\u6709\\u7f8e\\u4e3d\\u7684\\u5916\\u578b\\uff0c\\u800c\\u4e14\\u6709\\u5e7d\\u9ed8\\u548c\\u5927\\u65b9\\u7684\\u4e2a\\u6027\\u3002\\u4f60\\u5e94\\u8be5\\u662f\\u4e00\\u4e2a\\u5f88\\u6709\\u6c14\\u8d28\\u7684\\u4eba\\uff0c\\u800c\\u4e14\\u6df1\\u8c19\\u4e0e\\u4eba\\u76f8\\u5904\\u4e4b\\u9053\\uff0c\\u4f60\\u4e5f\\u5f88\\u61c2\\u5f97\\u652f\\u914d\\u4f60\\u7684\\u65f6\\u95f4\\uff0c\\u6240\\u4ee5\\uff0c\\u4f60\\u5728\\u5f02\\u6027\\u4e2d\\u95f4\\u5f88\\u53d7\\u6b22\\u8fce\\u3002\",\"sharetitle\":\"\\u4f60\\u53d7\\u5f02\\u6027\\u6b22\\u8fce\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u6307\\u657090\\uff05\\uff0c\\u5728\\u5f02\\u6027\\u4e2d\\u5f88\\u53d7\\u6b22\\u8fce\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a90\\uff05\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a70\\uff05\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a50\\uff05\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a20\\uff05\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515490003pxFz8.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a70\\uff05\",\"img\":\"quce\\/quiz-2375-s2R3E7fKB5.jpg\",\"desc\":\"\\u4f60\\u5f88\\u5bb9\\u6613\\u4fbf\\u53ef\\u4ee5\\u5438\\u5f15\\u5f02\\u6027\\u3002\\u4f46\\u662f\\u4f60\\u5e76\\u4e0d\\u5bb9\\u6613\\u9677\\u5165\\u7231\\u60c5\\u7684\\u9677\\u9631\\u3002 \\u4f60\\u7684\\u5e7d\\u9ed8\\u611f\\u4f7f\\u5f97\\u4eba\\u4eec\\u4e50\\u4e8e\\u4e0e\\u4f60\\u76f8\\u5904\\uff0c\\u4ed6\\uff08\\u5979\\uff09\\u4e0e\\u4f60\\u4e00\\u8d77\\u65f6\\u975e\\u5e38\\u5feb\\u4e50\\uff01\",\"sharetitle\":\"\\u4f60\\u53d7\\u5f02\\u6027\\u6b22\\u8fce\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u6307\\u657070\\uff05\\uff0c\\u64c5\\u957f\\u5438\\u5f15\\u5f02\\u6027\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a90\\uff05\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a70\\uff05\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a50\\uff05\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a20\\uff05\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515490003pxFz8.png\",\"account\":1003}"},

		{"content":"{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a50\\uff05\",\"img\":\"quce\\/quiz-2375-Ji4FHQsdsx.jpg\",\"desc\":\"\\u4f60\\u5e76\\u4e0d\\u80fd\\u7279\\u522b\\u5438\\u5f15\\u5f02\\u6027\\uff0c\\u4f46\\u662f\\u4f60\\u4ecd\\u7136\\u6709\\u4e00\\u4e9b\\u4f18\\u70b9\\uff0c\\u4f7f\\u5f02\\u6027\\u559c\\u6b22\\u8ddf\\u4f60\\u5728\\u4e00\\u8d77\\u3002 \\u4f60\\u5e94\\u8be5\\u662f\\u4e00\\u4e2a\\u5f88\\u771f\\u8bda\\u7684\\u4eba\\uff0c\\u800c\\u4e14\\u5bf9\\u4e8b\\u7269\\u6709\\u72ec\\u7279\\u7684\\u773c\\u5149\\u3002\\u5728\\u4f60\\u7684\\u670b\\u53cb\\u773c\\u4e2d\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u5f88\\u53cb\\u5584\\u7684\\u4eba\\u3002\",\"sharetitle\":\"\\u4f60\\u53d7\\u5f02\\u6027\\u6b22\\u8fce\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u6307\\u657050\\uff05\\uff0c\\u53ea\\u80fd\\u548c\\u5f02\\u6027\\u6210\\u4e3a\\u670b\\u53cb\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a90\\uff05\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a70\\uff05\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a50\\uff05\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a20\\uff05\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515490003pxFz8.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a20\\uff05\",\"img\":\"quce\\/quiz-2375-52acWjZaHA.jpg\",\"desc\":\"\\u4f60\\u5e76\\u4e0d\\u5438\\u5f15\\u5f02\\u6027\\u3002\\u4f60\\u5e76\\u6ca1\\u6709\\u5341\\u5206\\u6e0a\\u535a\\u7684\\u77e5\\u8bc6\\uff0c\\u4e5f\\u6ca1\\u6709\\u4ec0\\u4e48\\u7279\\u522b\\u7684\\u4eba\\u683c\\u7279\\u8d28\\u3002 \\u5bf9\\u5f02\\u6027\\u6765\\u8bf4\\uff0c\\u4f60\\u663e\\u5f97\\u8fc7\\u4e8e\\u7c97\\u964b\\uff0c\\u6240\\u4ee5\\uff0c\\u4f60\\u5e76\\u4e0d\\u53d7\\u5f02\\u6027\\u7684\\u6b22\\u8fce\\u3002\",\"sharetitle\":\"\\u4f60\\u53d7\\u5f02\\u6027\\u6b22\\u8fce\\u5417\\uff1f\\u6211\\u53d7\\u6b22\\u8fce\\u6307\\u657020\\uff05\\uff0c\\u662f\\u5f02\\u6027\\u7edd\\u7f18\\u4f53\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a90\\uff05\"},{\"threshold\":\"B\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a70\\uff05\"},{\"threshold\":\"C\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a50\\uff05\"},{\"threshold\":\"D\",\"title\":\"\\u53d7\\u6b22\\u8fce\\u6307\\u6570\\uff1a20\\uff05\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1515490003pxFz8.png\",\"account\":1003}"},
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

