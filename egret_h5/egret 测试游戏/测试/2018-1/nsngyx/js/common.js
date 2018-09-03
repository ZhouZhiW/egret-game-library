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
		{ "content": "{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\",\"img\":\"quce\\/quiz-5349-Y8mY6QRY4s.jpg\",\"desc\":\"\\u4f60\\u5c31\\u50cf\\u662f\\u8521\\u6587\\u59ec\\uff0c\\u4e13\\u4e1a\\u8f85\\u52a9\\u4e00\\u767e\\u5e74\\uff0c\\u582a\\u79f0\\u53f2\\u4e0a\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\\uff01\\u5982\\u679c\\u8981\\u8bc4\\u9009\\u51fa\\u738b\\u8005\\u5ce1\\u8c37\\u91cc\\u8c01\\u6700\\u6696\\u7684\\u8bdd\\uff0c\\u90a3\\u4e00\\u5b9a\\u975e\\u8521\\u6587\\u59ec\\u83ab\\u5c5e\\u4e86\\uff01\\u867d\\u7136\\u4f60\\u6bd4\\u8f83\\u4f4e\\u8c03\\u4e0d\\u8d77\\u773c\\uff0c\\u4f46\\u5374\\u662f\\u67d4\\u60c5\\u4f3c\\u6c34\\uff0c\\u4e50\\u4e8e\\u52a9\\u4eba\\uff0c\\u5728\\u6551\\u6b7b\\u6276\\u4f24\\u8fd9\\u6761\\u9053\\u8def\\u4e0a\\u505a\\u5230\\u4e86\\u6781\\u81f4\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u8521\\u6587\\u59ec\\uff0c\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d!\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\",\"img\":\"quce\\/quiz-5349-2efkcy7Qrc.jpg\",\"desc\":\"\\u522b\\u4eba\\u773c\\u91cc\\u7684\\u4f60\\u662f\\u4e00\\u4e2a\\u8179\\u9ed1\\u7684\\u574f\\u5bb6\\u4f19\\uff0c\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\\uff0c\\u5e73\\u65f6\\u53c8\\u662f\\u6d3b\\u8e66\\u4e71\\u8df3\\u559c\\u6b22\\u800d\\u5e05\\u7684\\u6027\\u683c\\uff0c\\u4f46\\u4ed6\\u4eec\\u4e0d\\u77e5\\u9053\\u7684\\u662f\\uff0c\\u6240\\u6709\\u7684\\u4e8b\\u60c5\\u90fd\\u5728\\u4f60\\u7684\\u638c\\u63e1\\u4e4b\\u4e2d\\uff01\\u5c31\\u50cf\\u8bf8\\u845b\\u4eae\\uff0c\\u5f88\\u64c5\\u957f\\u57cb\\u4f0f\\u548c\\u5957\\u8def\\uff0c\\u7206\\u53d1\\u529b\\u5f88\\u5f3a\\uff0c\\u5b9e\\u6218\\u5168\\u9760\\u968f\\u673a\\u5e94\\u53d8\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u8bf8\\u845b\\u4eae\\uff0c\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\",\"img\":\"quce\\/quiz-5349-8sdhywbt5b.jpg\",\"desc\":\"\\u6e29\\u67d4\\u4f53\\u8d34\\u7684\\u4f60\\u6709\\u7740\\u5c5e\\u4e8e\\u81ea\\u5df1\\u7684\\u9ad8\\u50b2\\uff0c\\u6709\\u65f6\\u5019\\u4e5f\\u4f1a\\u72af\\u4e00\\u4e9b\\u5c0f\\u7cca\\u6d82\\uff0c\\u4f46\\u8fd9\\u5e76\\u4e0d\\u80fd\\u963b\\u6b62\\u4f60\\u5438\\u5f15\\u522b\\u4eba\\u7684\\u76ee\\u5149\\uff0c\\u800c\\u4f60\\u53c8\\u6709\\u4e00\\u4e9b\\u5c0f\\u6d01\\u7656\\uff0c\\u4e0d\\u5141\\u8bb8\\u964c\\u751f\\u4eba\\u7684\\u63a5\\u8fd1\\uff0c\\u5c31\\u50cf\\u662f\\u8c82\\u8749\\uff0c\\u62e5\\u6709\\u7edd\\u4e16\\u5bb9\\u989c\\uff0c\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\\u4ece\\u4e0d\\u9760\\u8fd1\\u654c\\u4eba\\uff0c\\u59cb\\u7ec8\\u4fdd\\u6301\\u7740\\u81ea\\u5df1\\u7684\\u6e05\\u9ad8\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u8c82\\u8749\\uff0c\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\",\"img\":\"quce\\/quiz-5349-QW8chRCXHM.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u5c31\\u50cf\\u738b\\u662d\\u541b\\uff0c\\u5916\\u8868\\u770b\\u8d77\\u6765\\u5c0f\\u4ed9\\u5973\\u7684\\u4f60\\u5341\\u5206\\u6162\\u70ed\\uff0c\\u53c8\\u6709\\u70b9\\u6728\\u8bb7\\u548c\\u4e0d\\u5584\\u8a00\\u8f9e\\uff0c\\u4f46\\u662f\\u5982\\u679c\\u6709\\u4eba\\u56e0\\u4e3a\\u8fd9\\u4e2a\\u5c31\\u89c9\\u5f97\\u4f60\\u597d\\u6b3a\\u8d1f\\uff0c\\u90a3\\u4f60\\u4e00\\u5b9a\\u4f1a\\u8ba9\\u4ed6\\u540e\\u6094\\uff0c\\u4f5c\\u4e3a\\u4f60\\u7684\\u670b\\u53cb\\u53c8\\u662f\\u5341\\u5206\\u5e78\\u8fd0\\u7684\\uff0c\\u6bd5\\u7adf\\u4f60\\u4e5f\\u662f\\u613f\\u610f\\u4e3a\\u670b\\u53cb\\u51b2\\u950b\\u9677\\u9635\\u7684\\u4eba\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u738b\\u662d\\u541b\\uff0c\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\",\"img\":\"quce\\/quiz-5349-ETHnnR35kh.jpg\",\"desc\":\"\\u4f60\\u7684\\u6027\\u683c\\u5c31\\u50cf\\u662f\\u5b59\\u8191\\uff0c\\u5173\\u952e\\u65f6\\u523b\\u53cd\\u5e94\\u673a\\u654f\\uff0c\\u61c2\\u5f97\\u968f\\u673a\\u5e94\\u53d8\\uff0c\\u4e0d\\u4ec5\\u9047\\u5230\\u4f55\\u79cd\\u56f0\\u96be\\u90fd\\u80fd\\u987a\\u5229\\u8131\\u8eab\\uff0c\\u5177\\u6709\\u5341\\u5206\\u5f3a\\u5927\\u7684\\u751f\\u5b58\\u80fd\\u529b\\u3002\\u5bf9\\u5f85\\u670b\\u53cb\\u867d\\u7136\\u5728\\u5e73\\u65f6\\u90fd\\u662f\\u9ed8\\u9ed8\\u65e0\\u95fb\\uff0c\\u4e0d\\u4e89\\u4e0d\\u62a2\\uff0c\\u5374\\u4e5f\\u662f\\u4f1a\\u5728\\u5173\\u952e\\u65f6\\u523b\\u633a\\u8eab\\u800c\\u51fa\\uff0c\\u800c\\u5371\\u673a\\u65f6\\u523b\\u52a9\\u4ed6\\u4e00\\u81c2\\u4e4b\\u529b\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u5b59\\u8191\\uff0c\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\",\"img\":\"quce\\/quiz-5349-i434sxGjij.jpg\",\"desc\":\"\\u674e\\u767d\\u662f\\u4e00\\u4e2a\\u70ed\\u7231\\u81ea\\u7531\\uff0c\\u653e\\u6d6a\\u4e0d\\u7f81\\uff0c\\u4e0d\\u559c\\u6b22\\u56e2\\u6218\\uff0c\\u5230\\u5904\\u6253\\u91ce\\u7684\\u89d2\\u8272\\uff0c\\u800c\\u4f60\\u5c31\\u50cf\\u4ed6\\u4e00\\u6837\\u603b\\u662f\\u795e\\u51fa\\u9b3c\\u6ca1\\uff0c\\u5173\\u952e\\u65f6\\u523b\\u53c8\\u603b\\u80fd\\u51f8\\u663e\\u81ea\\u5df1\\u7684\\u5e05\\u6c14\\uff0c\\u8fd9\\u4e00\\u70b9\\u8ba9\\u4f60\\u6536\\u83b7\\u4e86\\u5f88\\u591a\\u8ff7\\u59b9\\u3002\\u4f60\\u8fd8\\u662f\\u4e00\\u4e2a\\u6025\\u6027\\u5b50\\uff0c\\u505a\\u4e8b\\u603b\\u662f\\u8981\\u5f7b\\u5e95\\u5b8c\\u6210\\u540e\\u624d\\u80fd\\u5b89\\u5fc3\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u674e\\u767d\\uff0c\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\",\"img\":\"quce\\/quiz-5349-h8SSjshKCP.jpg\",\"desc\":\"\\u9732\\u5a1c\\u662f\\u4e00\\u4e2a\\u5341\\u5206\\u96be\\u9a7e\\u9a6d\\u7684\\u89d2\\u8272\\uff0c\\u4f60\\u7684\\u6027\\u683c\\u5c31\\u50cf\\u5979\\u4e00\\u6837\\u96be\\u4ee5\\u6349\\u6478\\uff0c\\u53ef\\u4ee5\\u4e00\\u9e23\\u60ca\\u4eba\\uff0c\\u4ee5\\u4e00\\u654c\\u4e94\\uff0c\\u4e5f\\u53ef\\u4ee5\\u65e0\\u9650\\u63a7\\u5927\\uff0c\\u6c14\\u7684\\u5bf9\\u624b\\u8fde\\u624b\\u673a\\u90fd\\u60f3\\u6254\\u6389\\u3002\\u4f5c\\u4e3a\\u6b63\\u4e49\\u5316\\u8eab\\u7684\\u6708\\u4eae\\u5973\\u795e\\uff0c\\u4f60\\u603b\\u662f\\u80fd\\u5728\\u56e2\\u6218\\u4e2d\\u62ef\\u6551\\u5927\\u5bb6\\uff0c\\u662f\\u5173\\u952e\\u65f6\\u523b\\u7684\\u6551\\u4e16\\u4e3b\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u9732\\u5a1c\\uff0c\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\",\"img\":\"quce\\/quiz-5349-ZAijjyDx5z.jpg\",\"desc\":\"\\u4e9a\\u745f\\u603b\\u662f\\u80fd\\u4e0d\\u754f\\u5f3a\\u654c\\uff0c\\u80fd\\u7387\\u5148\\u6df1\\u5165\\u654c\\u540e\\u6216\\u8005\\u62b5\\u6321\\u5728\\u961f\\u53cb\\u7684\\u524d\\u65b9\\uff0c\\u4e3a\\u961f\\u53cb\\u521b\\u9020\\u673a\\u4f1a\\u3002\\u800c\\u4f60\\u5c31\\u50cf\\u4e9a\\u745f\\uff0c\\u62e5\\u6709\\u5f88\\u5f3a\\u7684\\u81ea\\u4fe1\\u548c\\u8d23\\u4efb\\u5fc3\\uff0c\\u603b\\u662f\\u5728\\u56e2\\u961f\\u4e2d\\u626e\\u6f14\\u4e00\\u4e2a\\u9886\\u5bfc\\u8005\\u7684\\u89d2\\u8272\\uff0c\\u5c31\\u50cf\\u6e38\\u620f\\u6545\\u4e8b\\u8bbe\\u5b9a\\u7684\\u90a3\\u6837\\uff0c\\u662f\\u4e00\\u4e2a\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u4e9a\\u745f\\uff0c\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\",\"img\":\"quce\\/quiz-5349-bGBaX2ApJc.jpg\",\"desc\":\"\\u4f60\\u6709\\u7740\\u5f3a\\u608d\\u7684\\u903b\\u8f91\\u80fd\\u529b\\uff0c\\u80fd\\u591f\\u8fc5\\u901f\\u7684\\u5bf9\\u4e8b\\u60c5\\u505a\\u51fa\\u5206\\u6790\\u548c\\u5224\\u65ad\\uff0c\\u4f60\\u4e5f\\u5341\\u5206\\u61c2\\u5f97\\u56e2\\u961f\\u5408\\u4f5c\\uff0c\\u5c31\\u50cf\\u59dc\\u5b50\\u7259\\u80fd\\u591f\\u975e\\u5e38\\u6709\\u6548\\u7684\\u5224\\u65ad\\u51fa\\u654c\\u4eba\\u7684\\u4f4d\\u7f6e\\uff0c\\u6709\\u7740\\u6307\\u6325\\u56e2\\u961f\\u7684\\u80fd\\u529b\\uff0c\\u5927\\u90e8\\u5206\\u65f6\\u95f4\\u90fd\\u5728\\u79ef\\u84c4\\u529b\\u91cf\\uff0c\\u5173\\u952e\\u65f6\\u523b\\u624d\\u4f1a\\u7206\\u53d1\\u3002\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u59dc\\u5b50\\u7259\\uff0c\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\",\"img\":\"quce\\/quiz-5349-zceaZxHCYW.jpg\",\"desc\":\"\\u4f60\\u751f\\u6765\\u5c31\\u81ea\\u5e26\\u738b\\u8005\\u6c14\\u606f\\uff0c\\u4e0d\\u8fc7\\u603b\\u662f\\u56e0\\u4e3a\\u9738\\u6c14\\u4fa7\\u6f0f\\u800c\\u62c9\\u4ec7\\u6068\\uff0c\\u5c31\\u50cf\\u662f\\u738b\\u8005\\u5ce1\\u8c37\\u552f\\u4e00\\u4e00\\u4e2a\\u5168\\u8f93\\u51fa\\u7684\\u8fd1\\u6218\\u82f1\\u96c4\\u5b59\\u609f\\u7a7a\\uff0c\\u6709\\u7740\\u4e00\\u53bb\\u4e0d\\u8fd4\\u7684\\u6c14\\u52bf\\uff0c\\u4f60\\u80fd\\u591f\\u7206\\u53d1\\u51fa\\u5f3a\\u5927\\u7684\\u5a01\\u529b\\uff0c\\u5373\\u4f7f\\u9047\\u5230\\u56f0\\u5883\\u4e5f\\u4e0d\\u4f1a\\u9000\\u7f29\\uff0c\\u603b\\u662f\\u80fd\\u591f\\u8fce\\u96be\\u800c\\u4e0a\\uff01\",\"sharetitle\":\"\\u4f60\\u662f\\u738b\\u8005\\u8363\\u8000\\u91cc\\u7684\\u8c01\\uff1f\\u6211\\u662f\\u5b59\\u609f\\u7a7a\\uff0c\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\\uff01\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5b59\\u609f\\u7a7abr\\u6c38\\u4e0d\\u9000\\u7f29\\u7684\\u7cbe\\u795e\"},{\"threshold\":\"B\",\"title\":\"\\u59dc\\u5b50\\u7259br\\u903b\\u8f91\\u80fd\\u529b\\u5341\\u5206\\u5f3a\\u608d\"},{\"threshold\":\"C\",\"title\":\"\\u4e9a\\u745fbr\\u4e0e\\u751f\\u4ff1\\u6765\\u7684\\u738b\\u8005\"},{\"threshold\":\"D\",\"title\":\"\\u9732\\u5a1cbr\\u96be\\u4ee5\\u6349\\u6478\\u7684\\u6708\\u4eae\\u5973\\u795e\"},{\"threshold\":\"E\",\"title\":\"\\u674e\\u767dbr\\u4e0d\\u7f81\\u653e\\u7eb5\\u7231\\u81ea\\u7531\"},{\"threshold\":\"F\",\"title\":\"\\u5b59\\u8191br\\u5173\\u952e\\u65f6\\u523b\\u4f1a\\u633a\\u8eab\\u800c\\u51fa\"},{\"threshold\":\"G\",\"title\":\"\\u738b\\u662d\\u541bbr\\u4e0d\\u5584\\u8a00\\u8f9e\\u7684\\u5c0f\\u4ed9\\u5973\"},{\"threshold\":\"H\",\"title\":\"\\u8c82\\u8749br\\u81f3\\u6b7b\\u4e5f\\u8981\\u534e\\u4e3d\\u6f02\\u4eae\"},{\"threshold\":\"I\",\"title\":\"\\u8bf8\\u845b\\u4eaebr\\u4ece\\u4e0d\\u6309\\u5957\\u8def\\u51fa\\u724c\"},{\"threshold\":\"J\",\"title\":\"\\u8521\\u6587\\u59ecbr\\u6700\\u5f3a\\u5927\\u7684\\u201c\\u8d24\\u5185\\u52a9\\u201d\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1515481297VCjzX.png\",\"account\":1003}" },
	];



	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 6) {
		data = data1[0];
	} else if (_num < 11 && _num >= 6) {
		data = data1[1];
	} else if (_num < 14 && _num >= 11) {
		data = data1[2];
	} else if (_num < 17 &&_num >= 14) {
		data = data1[3];
	} else if (_num < 19 &&_num >= 17) {
		data = data1[4];
	} else if (_num < 21 &&_num >= 19) {
		data = data1[5];
	} else if (_num < 24 &&_num >= 21) {
		data = data1[6];
	}else if (_num < 28 &&_num >= 24) {
		data = data1[7];
	}else if (_num < 32 &&_num >= 28) {
		data = data1[8];
	}else if (_num >= 32) {
		data = data1[9];
	}

	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] =  "./"+ result['img'];
		}
		callback(result, JSON.parse(data['total']), 2);
	}
}

