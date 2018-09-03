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
	/*  3 2 4 1  100    6 9  7  8  5 10 */
	var data1=[
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\",\"img\":\"quce\\/quiz-3561-5KbA6N2p2n.jpg\",\"desc\":\"\\u4f60\\u7ee7\\u7eed\\u5411\\u524d\\u8d70\\uff0c\\u53ef\\u56e0\\u4e3a\\u4e0d\\u4e86\\u89e3\\u8fd9\\u91cc\\u7684\\u8def\\u548c\\u7537\\u5b50\\u4e00\\u4e0b\\u5b50\\u6389\\u4e0b\\u4e86\\u4e00\\u4e2a\\u60ac\\u5d16\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e00\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd2%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\",\"img\":\"quce\\/quiz-3561-4peP7W4fRb.jpg\",\"desc\":\"\\u4f60\\u8ddf\\u7740\\u5973\\u5b69\\u6765\\u5230\\u90a3\\u4e2a\\u6050\\u6016\\u7684\\u5730\\u65b9\\uff0c\\u7ed3\\u679c\\u5973\\u5b69\\u7684\\u7259\\u9f7f\\u53d8\\u5f97\\u7279\\u522b\\u957f\\uff0c\\u4f60\\u624d\\u53d1\\u73b0\\u5979\\u539f\\u6765\\u662f\\u5438\\u8840\\u9b3c\\uff01\\u4f60\\u5413\\u5f97\\u60ca\\u58f0\\u4e00\\u53eb\\uff0c\\u60ca\\u52a8\\u4e86\\u5973\\u5b69\\u5438\\u8840\\u9b3c\\uff0c\\u5979\\u5c06\\u4f60\\u7684\\u8840\\u5438\\u5f97\\u5e72\\u5e72\\u51c0\\u51c0\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e8c\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd18%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\",\"img\":\"quce\\/quiz-3561-REMNbwXfRn.jpg\",\"desc\":\"\\u4f60\\u6293\\u8d77\\u94b3\\u5b50\\u4e00\\u901a\\u4e71\\u5939\\uff0c\\u7ed3\\u679c\\u4f60\\u628a\\u53a8\\u5e08\\u5939\\u5f97\\u6bc1\\u5bb9\\uff0c\\u4ed6\\u5341\\u5206\\u6c14\\u6124\\uff0c\\u53eb\\u6765\\u66f4\\u591a\\u767d\\u5f71\\u5b50\\u6765\\u54ac\\u4f60\\uff01\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e09\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd26%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\",\"img\":\"quce\\/quiz-3561-Jyn8CySsTt.jpg\",\"desc\":\"\\u4f60\\u7761\\u5728\\u6811\\u4e1b\\u91cc\\uff0c\\u665a\\u4e0a\\uff0c\\u5ffd\\u7136\\u4e00\\u4e2a\\u9b3c\\u8df3\\u4e86\\u51fa\\u6765\\uff0c\\u4f60\\u60ca\\u6050\\u4e07\\u5206\\uff0c\\u6492\\u5f00\\u817f\\u5c31\\u8dd1\\uff0c\\u6ca1\\u60f3\\u5230\\u88ab\\u6811\\u4e1b\\u91cc\\u7684\\u8349\\u62cc\\u4e86\\u4e00\\u8de4\\uff0c\\u4f60\\u4e0d\\u5e78\\u88ab\\u9b3c\\u54ac\\u6b7b\\u4e86\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u56db\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd35%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\",\"img\":\"quce\\/quiz-3561-mwmimaiDxB.jpg\",\"desc\":\"\\u4f60\\u7531\\u4e8e\\u592a\\u5b64\\u5355\\uff0c\\u89c9\\u5f97\\u8fd9\\u4e2a\\u4eba\\u4e0d\\u662f\\u7279\\u522b\\u5413\\u4eba\\u5c31\\u9009\\u4e86\\u5979\\uff0c\\u6ca1\\u60f3\\u5230\\u5979\\u5934\\u9876\\u4e0a\\u7684\\u8840\\u4e0d\\u662f\\u81ea\\u5df1\\u7684\\u8840\\uff0c\\u800c\\u662f\\u5979\\u6293\\u6765\\u4e00\\u4e2a\\u4eba\\u628a\\u4ed6\\u5fc3\\u810f\\u638f\\u51fa\\u6765\\u653e\\u5728\\u5934\\u9876\\u4e0a\\u7559\\u4e0b\\u7684\\u8840\\u8ff9\\uff01\\u7136\\u540e\\u4f60\\u7684\\u5fc3\\u810f\\u4e5f\\u8fd9\\u6837\\u6ca1\\u4e86\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e94\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd43%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\",\"img\":\"quce\\/quiz-3561-8E2eB7KPKK.jpg\",\"desc\":\"\\u770b\\u6765\\uff0c\\u4f60\\u9009\\u62e9\\u9519\\u8bef\\uff0c\\u8def\\u8fb9\\u6709\\u4e00\\u4e2a\\u6b63\\u5728\\u628a\\u8def\\u4e0a\\u8fd8\\u6ca1\\u6709\\u8150\\u70c2\\u7684\\u4eba\\u6302\\u5230\\u6811\\u4e0a\\u7684\\u4eba\\uff0c\\u770b\\u5230\\u4f60\\u4e4b\\u540e\\uff0c\\u4ed6\\u5341\\u5206\\u60ca\\u559c\\uff0c\\u5c06\\u4f60\\u548c\\u5973\\u4eba\\u6253\\u660f\\uff0c\\u6302\\u5728\\u6811\\u4e0a\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u516d\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd57%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },		
		{ "content": "{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\",\"img\":\"quce\\/quiz-3561-7XTkcxaDpn.jpg\",\"desc\":\"\\u4f60\\u78b0\\u5230\\u4e86\\u53a8\\u5e08\\uff0c\\u7ed3\\u679c\\u8fd9\\u6b21\\u4f60\\u6ca1\\u6709\\u9003\\u6389\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e03\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd65%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\",\"img\":\"quce\\/quiz-3561-Gi63bsfdcC.jpg\",\"desc\":\"\\u4f60\\u4fe1\\u4e86\\u75af\\u5973\\u5b69\\uff0c\\u51fa\\u4e86\\u5ba2\\u6808\\uff0c\\u5973\\u5b69\\u4e5f\\u8ddf\\u7740\\u4f60\\u4eec\\u51fa\\u6765\\u4e86\\uff0c\\u5979\\u7a81\\u7136\\u5927\\u7b11\\u8d77\\u6765\\uff0c\\u7259\\u9f7f\\u957f\\u5f97\\u7279\\u522b\\u957f\\uff0c\\u539f\\u6765\\u662f\\u6b7b\\u4ea1\\u6d77\\u5cb8\\u7ebf\\u7684\\u90a3\\u4e2a\\u5973\\u5b69\\u5b50\\uff01\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u516b\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd74%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\",\"img\":\"quce\\/quiz-3561-GTXdnNZx3A.jpg\",\"desc\":\"\\u4f60\\u8be2\\u95ee\\u4e86\\u5973\\u8001\\u677f\\uff0c\\u5979\\u5982\\u5b9e\\u7684\\u544a\\u8bc9\\u4e86\\u4f60\\uff0c\\u53ef\\u662f\\u4f60\\u6ca1\\u60f3\\u5230\\u7684\\u662f\\uff0c\\u5979\\u4f1a\\u6740\\u6389\\u4f60\\uff0c\\u4ee5\\u514d\\u4f60\\u8bb2\\u51fa\\u53bb\\uff01\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u4e5d\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd85%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\",\"img\":\"quce\\/quiz-3561-AMbZx45SjS.jpg\",\"desc\":\"\\u4f60\\u6ca1\\u6709\\u95ee\\uff0c\\u7ed3\\u679c\\u4f60\\u4e5f\\u4e0d\\u77e5\\u9053\\u4e3a\\u4ec0\\u4e48\\uff0c\\u89c9\\u5f97\\u5e8a\\u4e0b\\u6709\\u4e1c\\u897f\\uff0c\\u4f60\\u770b\\u4e86\\u4e00\\u773c\\uff0c\\u6709\\u4e00\\u4e2a\\u5c0f\\u5b69\\u5b50\\uff0c\\u6b63\\u5728\\u5e8a\\u4e0b\\u73a9\\u73a9\\u5177\\uff01\\u6ca1\\u60f3\\u5230\\u8fd9\\u4e2a\\u5c0f\\u5b69\\u7adf\\u662f\\u4e00\\u4e2a\\u5389\\u9b3c\\uff0c\\u7ed3\\u679c......\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u6d3b\\u5230\\u4e86\\u7b2c\\u5341\\u5173\\uff0c\\u51fb\\u8d25\\u4e86\\u5168\\u56fd96%\\u7684\\u4eba\\uff0c\\u4f60\\u80fd\\u6d3b\\u5230\\u7b2c\\u51e0\\u5173\\uff1f\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}" },
		{"content":"{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\",\"img\":\"quce\\/quiz-3561-bttEKcAs7w.jpg\",\"desc\":\"\\u4f60\\u6ca1\\u6709\\u542c\\u5973\\u8001\\u677f\\u7684\\u8bdd\\uff0c\\u53bb\\u95ee\\u4e86\\u5973\\u4eba\\uff0c\\u770b\\u6765\\u5973\\u4eba\\u662f\\u4e2a\\u597d\\u201c\\u9b3c\\u201d\\uff0c\\u5979\\u544a\\u8bc9\\u4f60\\u65c1\\u8fb9\\u6709\\u9b3c\\uff0c\\u5e76\\u9080\\u8bf7\\u4f60\\u6765\\u5979\\u7684\\u623f\\u95f4\\uff0c\\u4f60\\u5e73\\u5b89\\u7684\\u5ea6\\u8fc7\\u4e86\\u4e00\\u4e2a\\u591c\\u665a\\u3002\\u7b2c\\u4e8c\\u5929\\u4e00\\u65e9\\uff0c\\u4f60\\u4fbf\\u5728\\u5973\\u4eba\\u7684\\u6307\\u5f15\\u4e0b\\u79bb\\u5f00\\u4e86\\u8fd9\\u4e2a\\u5371\\u9669\\u7684\\u5730\\u65b9\\u3002\",\"sharetitle\":\"\\u201c\\u751f\\u6b7b\\u9009\\u62e9\\u9898\\u201d\\u6211\\u5c45\\u7136\\u901a\\u5173\\u4e86\\uff01\\u636e\\u8bf4\\u901a\\u5173\\u7684\\u4eba\\u5168\\u4e16\\u754c\\u4e0d\\u52300.01%\\uff01\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e00\\u5173\"},{\"threshold\":\"B\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e8c\\u5173\"},{\"threshold\":\"C\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e09\\u5173\"},{\"threshold\":\"D\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u56db\\u5173\"},{\"threshold\":\"E\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e94\\u5173\"},{\"threshold\":\"F\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516d\\u5173\"},{\"threshold\":\"G\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e03\\u5173\"},{\"threshold\":\"H\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u516b\\u5173\"},{\"threshold\":\"I\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u4e5d\\u5173\"},{\"threshold\":\"J\",\"title\":\"\\u751f\\u6b7b\\u7b2c\\u5341\\u5173\"},{\"threshold\":\"K\",\"title\":\"\\u5168\\u90e8\\u901a\\u5173\\uff01\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1513738945DW7OK.png\",\"account\":1003}"}
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

