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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"img\":\"quce\\/quiz-6000-FbPp87nFy2.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u5929\\u771f\\u3001\\u6d3b\\u6cfc\\u7684\\u4eba\\uff0c\\u5feb\\u4e50\\u7684\\u65f6\\u5019\\u50cf\\u4e2a\\u5b69\\u5b50\\uff0c\\u4f24\\u5fc3\\u7684\\u65f6\\u5019\\u4f1a\\u54ed\\u5f97\\u5fd8\\u8bb0\\u6240\\u6709\\u3002\\u4f60\\u7684\\u5b9e\\u9645\\u5e74\\u9f84\\u4e0e\\u5fc3\\u7406\\u5e74\\u9f84\\u5dee\\u8ddd\\u5f88\\u5927\\u3002\\u4f60\\u5f88\\u5bb9\\u6613\\u76f8\\u4fe1\\u522b\\u4eba\\uff0c\\u6240\\u4ee5\\uff0c\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u8fd9\\u4e2a\\u7f8e\\u597d\\u800c\\u5929\\u771f\\u7684\\u65f6\\u4ee3\\uff0c\\u6240\\u6709\\u4eba\\u90fd\\u662f\\u90a3\\u4e48\\u7684\\u968f\\u548c\\uff0c\\u90a3\\u4e48\\u7684\\u5176\\u4e50\\u878d\\u878d\\u3002\\u8db3\\u4ee5\\u8ba9\\u4f60\\u70c2\\u6f2b\\u3001\\u65e0\\u90aa\\u7684\\u751f\\u6d3b\\u4e0b\\u53bb!\",\"sharetitle\":\"\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u54ea\\u4e2a\\u65f6\\u4ee3\\uff1f\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"},{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"},{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578817N5uFz.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"img\":\"quce\\/quiz-6000-8FBZpwSPNR.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u9a84\\u50b2\\uff0c\\u597d\\u80dc\\u5fc3\\u6781\\u5f3a\\u7684\\u4eba\\u3002\\u9762\\u5bf9\\u80dc\\u5229\\u7684\\u8bf1\\u60d1\\uff0c\\u7cbe\\u529b\\u5145\\u6c9b\\u7684\\u4f60\\u6218\\u65e0\\u4e0d\\u80dc\\u3002\\u56e0\\u6b64\\uff0c\\u4f60\\u5f88\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u53ef\\u4ee5\\u5c3d\\u60c5\\u6311\\u6218\\u7684\\u4e09\\u56fd\\u65f6\\u671f\\uff0c\\u7528\\u80dc\\u5229\\u6765\\u8bc1\\u660e\\u81ea\\u5df1\\uff01\",\"sharetitle\":\"\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u54ea\\u4e2a\\u65f6\\u4ee3\\uff1f\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"},{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"},{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578817N5uFz.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"img\":\"quce\\/quiz-6000-jeCbDTBBNb.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u7b80\\u5355\\u3001\\u968f\\u548c\\u7684\\u4eba\\uff0c\\u81ea\\u7136\\u4e5f\\u5f88\\u559c\\u6b22\\u5e73\\u548c\\u7684\\u751f\\u6d3b\\u3002\\u4e2a\\u6027\\u7a33\\u91cd\\u7684\\u4f60\\u5f88\\u5584\\u89e3\\u4eba\\u610f\\uff0c\\u4f1a\\u7528\\u4e00\\u9897\\u4ec1\\u6148\\u7684\\u4eba\\u5305\\u5bb9\\u4e00\\u5207\\u3002\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u5510\\u5b8b\\u8fd9\\u6837\\u7e41\\u534e\\u7684\\u65f6\\u4ee3\\uff0c\\u5b89\\u9038\\u7684\\u751f\\u6d3b\\u5f88\\u7b26\\u5408\\u4f60\\u7684\\u8ffd\\u6c42\\uff0c\\u4e5f\\u80fd\\u6ee1\\u8db3\\u4f60\\u4e00\\u5207\\u60f3\\u8981\\u7684\\u5e78\\u798f!\",\"sharetitle\":\"\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u54ea\\u4e2a\\u65f6\\u4ee3\\uff1f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"},{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"},{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578817N5uFz.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"img\":\"quce\\/quiz-6000-P7NJaWa2zm.png\",\"desc\":\"\\u4f60\\u662f\\u4e00\\u4e2a\\u73b0\\u5b9e\\u7684\\u4eba\\uff0c\\u4e0d\\u559c\\u6b22\\u7eb7\\u4e89\\u548c\\u5e7b\\u60f3\\u3002\\u53ea\\u6709\\u6700\\u771f\\u5b9e\\u6700\\u5e73\\u6de1\\u7684\\u751f\\u6d3b\\u9002\\u5408\\u4f60\\u3002\\u4f60\\u4f1a\\u53bb\\u7406\\u89e3\\u90a3\\u4e9b\\u4e0d\\u5c3d\\u4eba\\u610f\\uff0c\\u4e5f\\u4f1a\\u901a\\u8fc7\\u81ea\\u5df1\\u7684\\u52aa\\u529b\\u53bb\\u8ffd\\u6c42\\u4e3b\\u6d41\\u751f\\u6d3b\\u3002\\u4f60\\u9002\\u5e94\\u529b\\u5f88\\u5f3a\\uff0c\\u73b0\\u5b9e\\u793e\\u4f1a\\u7684\\u65e0\\u5948\\u4f1a\\u628a\\u4f60\\u78e8\\u7ec3\\u7684\\u66f4\\u52a0\\u5f3a\\u5927\\uff01\",\"sharetitle\":\"\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u54ea\\u4e2a\\u65f6\\u4ee3\\uff1f\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"},{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"},{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578817N5uFz.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"img\":\"quce\\/quiz-6000-Gzzf3tN8hP.png\",\"desc\":\"\\u672a\\u6765\\u662f\\u4ec0\\u4e48\\uff1f\\u662f\\u65e0\\u6cd5\\u9884\\u8ba1\\u3001\\u672a\\u77e5\\u7684\\u4e00\\u5207\\u3002\\u4f60\\u7684\\u601d\\u7ef4\\u65b9\\u5f0f\\u5df2\\u7ecf\\u8fdc\\u8fdc\\u9886\\u5148\\u4e8e\\u8eab\\u8fb9\\u7684\\u4eba\\uff0c\\u521b\\u65b0\\u3001\\u63a2\\u7d22\\u3001\\u8fdc\\u89c1\\u6b63\\u662f\\u4f60\\u7684\\u5173\\u952e\\u8bcd\\u3002\\u6216\\u8bb8\\uff0c\\u4f60\\u672c\\u8eab\\u5c31\\u662f\\u4e00\\u4e2a\\u6765\\u81ea\\u672a\\u6765\\u7684\\u4eba\\u4e5f\\u8bf4\\u4e0d\\u5b9a\\u54e6\\uff01\",\"sharetitle\":\"\\u4f60\\u9002\\u5408\\u751f\\u6d3b\\u5728\\u54ea\\u4e2a\\u65f6\\u4ee3\\uff1f\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5c27\\u821c\\u65f6\\u4ee3br\\u4eba\\u5fc3\\u6df3\\u6734\\uff0c\\u6d3b\\u5f97\\u65e0\\u5fe7\\u65e0\\u8651\",\"oldimg\":\"quce\\/15179124645U9ZY.jpg\"},{\"threshold\":\"B\",\"title\":\"\\u4e09\\u56fd\\u65f6\\u4ee3br\\u4e71\\u4e16\\u51fa\\u82f1\\u96c4\\uff0c\\u6311\\u6218\\u81ea\\u6211\",\"oldimg\":\"quce\\/1517912416VDqX2.png\"},{\"threshold\":\"C\",\"title\":\"\\u5510\\u5b8b\\u65f6\\u671fbr\\u4eab\\u53d7\\u5b89\\u9038\\u7684\\u5c0f\\u5e78\\u798f\",\"oldimg\":\"quce\\/15179123780T8PJ.jpg\"},{\"threshold\":\"D\",\"title\":\"\\u5f53\\u4e0b\\u73b0\\u4e16br\\u7406\\u6027\\u73b0\\u5b9e\\uff0c\\u6d3b\\u5728\\u5f53\\u4e0b\",\"oldimg\":\"quce\\/1517912505gXS0L.png\"},{\"threshold\":\"E\",\"title\":\"\\u672a\\u6765br\\u6478\\u7d22\\u63a2\\u65b0\\uff0c\\u6311\\u6218\\u6ee1\\u6ee1\",\"oldimg\":\"quce\\/1517912246uVT1J.jpg\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520578817N5uFz.png\",\"account\":1003}"},


	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 12) {
		data = data1[4];

	} else if (_num < 18 && _num >= 12) {
		data = data1[3];

	} else if (_num < 23 && _num >= 18) {
		data = data1[2];

	} else if (_num < 27 &&_num >= 23) {
		data = data1[1];
	}else if (_num >= 27) {
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

