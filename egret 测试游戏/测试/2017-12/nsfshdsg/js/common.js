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
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a20%\",\"img\":\"quce\\/quiz-317-6xE6AwiTJ8.jpg\",\"desc\":\"\\u5c0f\\u7f16\\u8ba4\\u4e3a\\uff0c\\u5bcc\\u6709\\u7231\\u5fc3\\u7684\\u4f60\\uff0c\\u5fc3\\u4e2d\\u603b\\u662f\\u5e26\\u6709\\u83ab\\u540d\\u7684\\u7275\\u6302\\u3002\\u8fd9\\u79cd\\u7275\\u6302\\u6216\\u8bb8\\u662f\\u4f20\\u7edf\\u7684\\u6210\\u5bb6\\u7acb\\u4e1a\\u601d\\u60f3\\uff0c\\u6216\\u8bb8\\u662f\\u56e0\\u4e3a\\u4f60\\u672c\\u8eab\\u5c31\\u5e0c\\u671b\\u6709\\u4e00\\u4e2a\\u6e29\\u6696\\u7684\\u5bb6\\u3002\\u867d\\u7136\\u4f60\\u6709\\u6599\\u7406\\u751f\\u6d3b\\u7684\\u5404\\u9879\\u80fd\\u529b\\uff0c\\u4f46\\u4f60\\u7684\\u5185\\u5fc3\\u6df1\\u5904\\u5bf9\\u72ec\\u8eab\\u4e3b\\u4e49\\u751f\\u6d3b\\u8fd8\\u662f\\u6bd4\\u8f83\\u62b5\\u89e6\\u7684\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u9002\\u5408\\u6307\\u6570\\uff1a20%\\uff0c\\u6d4b\\u6d4b\\u4f60\\u9002\\u5408\\u505a\\u5355\\u8eab\\u72d7\\u5417\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a20%\"},{\"threshold\":\"B\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a100%\"},{\"threshold\":\"C\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a60%\"},{\"threshold\":\"D\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a5%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513928190skQ7N.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a100%\",\"img\":\"quce\\/quiz-317-fmybixRytE.jpg\",\"desc\":\"\\u5c0f\\u7f16\\u8ba4\\u4e3a\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u5d07\\u5c1a\\u4e2a\\u4eba\\u4e3b\\u4e49\\u7684\\u4eba\\uff0c\\u4f60\\u601d\\u7ef4\\u6d3b\\u8dc3\\uff0c\\u5e38\\u5e38\\u4f1a\\u8ba9\\u4eba\\u6349\\u6478\\u4e0d\\u900f\\u3002\\u5bf9\\u4f60\\u800c\\u8a00\\uff0c\\u7231\\u60c5\\u4ece\\u6765\\u90fd\\u4e0d\\u662f\\u751f\\u6d3b\\u7684\\u91cd\\u5fc3\\uff0c\\u53ea\\u8981\\u6709\\u4e00\\u5e2e\\u771f\\u5fc3\\u7684\\u670b\\u53cb\\uff0c\\u5373\\u4f7f\\u6ca1\\u6709\\u604b\\u4eba\\u966a\\u4f34\\u4f60\\u4e5f\\u540c\\u6837\\u4f1a\\u5f88\\u5f00\\u5fc3\\uff0c\\u5e76\\u4e14\\u5728\\u4f60\\u770b\\u6765\\u670b\\u53cb\\u8981\\u6bd4\\u604b\\u4eba\\u597d\\u7528\\u5f97\\u591a\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u9002\\u5408\\u6307\\u6570\\uff1a100%\\uff0c\\u6d4b\\u6d4b\\u4f60\\u9002\\u5408\\u505a\\u5355\\u8eab\\u72d7\\u5417\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a20%\"},{\"threshold\":\"B\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a100%\"},{\"threshold\":\"C\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a60%\"},{\"threshold\":\"D\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a5%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513928190skQ7N.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a60%\",\"img\":\"quce\\/quiz-317-yYcb5NFB8X.jpg\",\"desc\":\"\\u5c0f\\u7f16\\u8ba4\\u4e3a\\uff0c\\u4f60\\u662f\\u4e00\\u4e2a\\u5929\\u6027\\u4e50\\u89c2\\u7684\\u4eba\\uff0c\\u4e0d\\u7ba1\\u662f\\u5355\\u8eab\\u8fd8\\u662f\\u5a5a\\u59fb\\u751f\\u6d3b\\u4f60\\u90fd\\u80fd\\u591f\\u4ee5\\u79ef\\u6781\\u7684\\u5fc3\\u6001\\u53bb\\u9002\\u5e94\\u3002\\u751f\\u6d3b\\u4e2d\\u4f60\\u5e76\\u4e0d\\u7f3a\\u4e4f\\u8d62\\u5f97\\u5f02\\u6027\\u9752\\u7750\\u7684\\u9b45\\u529b\\uff0c\\u540c\\u65f6\\u4e5f\\u5bb9\\u6613\\u5bf9\\u6311\\u6218\\u5355\\u8eab\\u4e3b\\u4e49\\u4ea7\\u751f\\u5174\\u8da3\\u3002\\u8d2a\\u73a9\\u7684\\u5fc3\\u51b3\\u5b9a\\u4e86\\u4f60\\u72ec\\u8eab\\u4e3b\\u4e49\\u7684\\u9002\\u5408\\u7a0b\\u5ea6\\uff0c\\u5982\\u679c\\u8fd8\\u4e0d\\u613f\\u88ab\\u7231\\u60c5\\u675f\\u7f1a\\uff0c\\u90a3\\u5c31\\u7ee7\\u7eed\\u72ec\\u8eab\\u4e3b\\u4e49\\u5427\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u9002\\u5408\\u6307\\u6570\\uff1a60%\\uff0c\\u6d4b\\u6d4b\\u4f60\\u9002\\u5408\\u505a\\u5355\\u8eab\\u72d7\\u5417\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a20%\"},{\"threshold\":\"B\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a100%\"},{\"threshold\":\"C\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a60%\"},{\"threshold\":\"D\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a5%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513928190skQ7N.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a5%\",\"img\":\"quce\\/quiz-317-A5c8jjt6SA.jpg\",\"desc\":\"\\u5c0f\\u7f16\\u8ba4\\u4e3a\\uff0c\\u591a\\u6101\\u5584\\u611f\\u7684\\u4f60\\u6700\\u9700\\u8981\\u7684\\u5c31\\u662f\\u6765\\u81ea\\u604b\\u4eba\\u7684\\u5475\\u62a4\\u3002\\u82e5\\u662f\\u5728\\u906d\\u53d7\\u632b\\u6298\\u65f6\\uff0c\\u8fd8\\u8981\\u81ea\\u5df1\\u8214\\u7740\\u4f24\\u53e3\\u7597\\u4f24\\uff0c\\u90a3\\u4f60\\u4f1a\\u5f88\\u5bb9\\u6613\\u5c31\\u6b64\\u6d88\\u6c89\\u4e0b\\u53bb\\uff0c\\u6240\\u4ee5\\u72ec\\u8eab\\u4e3b\\u4e49\\u5e76\\u4e0d\\u9002\\u5408\\u4f60\\u3002\\u4f60\\u9700\\u8981\\u6709\\u4eba\\u7231\\uff0c\\u6709\\u4eba\\u75bc\\uff0c\\u7231\\u60c5\\u5bf9\\u4e8e\\u4f60\\u6765\\u8bf4\\u662f\\u4eba\\u751f\\u4e2d\\u975e\\u5e38\\u91cd\\u8981\\u7684\\u4e00\\u90e8\\u5206\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u9002\\u5408\\u6307\\u6570\\uff1a5%\\uff0c\\u6d4b\\u6d4b\\u4f60\\u9002\\u5408\\u505a\\u5355\\u8eab\\u72d7\\u5417\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a20%\"},{\"threshold\":\"B\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a100%\"},{\"threshold\":\"C\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a60%\"},{\"threshold\":\"D\",\"title\":\"\\u9002\\u5408\\u6307\\u6570\\uff1a5%\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513928190skQ7N.png\",\"account\":1003}" },
	];
	var data;
	var _Array=["A", "B", "C", "D", " E", "F", "G", "H", "I", "J"];
	if(option[option.length-1]){
		var _num=_Array.indexOf(option[option.length-1]);
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

		callback(result, JSON.parse(data['total']), 2);

	}

}

