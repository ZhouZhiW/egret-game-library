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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"img\":\"quce\\/quiz-6022-ynBzkKhBPp.png\",\"desc\":\"\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u5f88\\u9ad8\\uff01\\u4e00\\u65e6\\u4f60\\u51b3\\u5b9a\\u8981\\u505a\\u4ec0\\u4e48\\u4e8b\\u60c5\\uff0c\\u5c31\\u4e00\\u5b9a\\u4f1a\\u575a\\u6301\\u4e0b\\u53bb\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u5728\\u5de5\\u4f5c\\u7684\\u65f6\\u5019\\u5f88\\u6709\\u53ef\\u80fd\\u83b7\\u5f97\\u6210\\u529f\\uff0c\\u4f46\\u662f\\u5728\\u5b9e\\u9645\\u751f\\u6d3b\\u4e2d\\uff0c\\u96be\\u514d\\u7ed9\\u522b\\u4eba\\u504f\\u6267\\u7684\\u611f\\u89c9\\uff0c\\u8ba9\\u4eba\\u89c9\\u5f97\\u4e0d\\u80fd\\u548c\\u4f60\\u6b63\\u5e38\\u6c9f\\u901a\\u3002\\u5982\\u679c\\u4f60\\u60f3\\u62e5\\u6709\\u4e00\\u4e2a\\u548c\\u8c10\\u7684\\u4eba\\u9645\\u5173\\u7cfb\\uff0c\\u90a3\\u4e48\\u5728\\u9002\\u5f53\\u7684\\u8303\\u56f4\\u5185\\u5c0a\\u91cd\\u522b\\u4eba\\u7684\\u610f\\u89c1\\u662f\\u4e0d\\u9519\\u7684\\u9009\\u62e9\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%\\uff0c\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\\uff0c\\u6d4b\\u6d4b\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"},{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"},{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"},{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"},{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205644262URry.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"img\":\"quce\\/quiz-6022-7dmK6NxbZs.png\",\"desc\":\"\\u4f60\\u8ba4\\u4e3a\\u4eba\\u6d3b\\u7740\\uff0c\\u4e00\\u5b9a\\u8981\\u6309\\u7167\\u81ea\\u5df1\\u7684\\u5fc3\\u610f\\u505a\\u4e8b\\uff0c\\u4e0d\\u7136\\u4e8b\\u4e8b\\u542c\\u522b\\u4eba\\u7684\\uff0c\\u5c31\\u50cf\\u7827\\u677f\\u4e0a\\u7684\\u54b8\\u9c7c\\u4e00\\u6837\\u3002\\u4f60\\u6709\\u65f6\\u5019\\u56fa\\u6267\\u5730\\u4ec0\\u4e48\\u8bdd\\u4e5f\\u542c\\u4e0d\\u8fdb\\u53bb\\uff0c\\u81ea\\u987e\\u81ea\\u5730\\u94bb\\u725b\\u89d2\\u5c16\\uff0c\\u904d\\u4f53\\u9cde\\u4f24\\u4e86\\u624d\\u77e5\\u9053\\u9000\\u51fa\\u3002\\u5982\\u679c\\u4f60\\u89c9\\u5f97\\u8fc7\\u7684\\u8f9b\\u82e6\\uff0c\\u90a3\\u5c31\\u6162\\u6162\\u653e\\u4e0b\\u9762\\u5b50\\u5427\\uff0c\\u5176\\u5b9e\\u5e76\\u4e0d\\u4f1a\\u6709\\u4eba\\u5632\\u7b11\\u4f60\\uff0c\\u56e0\\u4e3a\\u6240\\u6709\\u4eba\\u90fd\\u4f1a\\u6709\\u8106\\u5f31\\u7684\\u65f6\\u523b\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%\\uff0c\\u6840\\u9a9c\\u4e0d\\u9a6f\\uff0c\\u6d4b\\u6d4b\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"},{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"},{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"},{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"},{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205644262URry.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"img\":\"quce\\/quiz-6022-Ym2PrxyaG3.png\",\"desc\":\"\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u4e00\\u822c\\uff01\\u4f60\\u662f\\u4e00\\u4e2a\\u61c2\\u5f97\\u53d8\\u901a\\u7684\\u4eba\\uff0c\\u5728\\u4e8b\\u60c5\\u5f00\\u59cb\\u65f6\\uff0c\\u4f60\\u4f1a\\u575a\\u6301\\u81ea\\u5df1\\u7684\\u6001\\u5ea6\\uff0c\\u5982\\u679c\\u522b\\u4eba\\u7ed9\\u4e86\\u4f60\\u66f4\\u597d\\u7684\\u5efa\\u8bae\\uff0c\\u90a3\\u4e48\\u4f60\\u4e0d\\u4f1a\\u56fa\\u6267\\u7684\\u8ba4\\u4e3a\\u81ea\\u5df1\\u7684\\u60f3\\u6cd5\\u4e00\\u5b9a\\u662f\\u6700\\u597d\\u7684\\uff0c\\u800c\\u662f\\u4f1a\\u91c7\\u53d6TA\\u7684\\u610f\\u89c1\\u3002\\u6240\\u4ee5\\u4f60\\u5728\\u5014\\u5f3a\\u65b9\\u9762\\u7684\\u201c\\u5ea6\\u201d\\u628a\\u63e1\\u7684\\u5f88\\u597d\\uff0c\\u8fd9\\u6837\\u6027\\u683c\\u7684\\u4f60\\u5728\\u6210\\u529f\\u7684\\u8def\\u4e0a\\u53ef\\u4ee5\\u8d70\\u7684\\u5f88\\u957f\\u8fdc\\uff01\",\"sharetitle\":\"\\u6211\\u7684\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%\\uff0c\\u8fbe\\u6743\\u901a\\u53d8\\uff0c\\u6d4b\\u6d4b\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"},{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"},{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"},{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"},{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205644262URry.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"img\":\"quce\\/quiz-6022-enzAKMK5yA.png\",\"desc\":\"\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u9887\\u4f4e\\uff01\\u5927\\u5bb6\\u90fd\\u89c9\\u5f97\\u548c\\u4f60\\u5728\\u4e00\\u8d77\\u6709\\u4e00\\u79cd\\u8212\\u9002\\u7684\\u611f\\u89c9\\u3002\\u901a\\u5e38\\u4f60\\u867d\\u4f1a\\u53d1\\u8868\\u81ea\\u5df1\\u7684\\u610f\\u89c1\\uff0c\\u4f46\\u662f\\u4e0d\\u4f1a\\u4e0e\\u4eba\\u4e89\\u8fa9\\uff0c\\u4f60\\u8ba4\\u4e3a\\u6bcf\\u4e2a\\u4eba\\u90fd\\u6709\\u575a\\u6301\\u81ea\\u5df1\\u7acb\\u573a\\u7684\\u6743\\u5229\\uff01\\u4f60\\u6e29\\u548c\\u7684\\u6001\\u5ea6\\uff0c\\u5f88\\u53d7\\u5927\\u5bb6\\u6b22\\u8fce\\uff0c\\u6240\\u4ee5\\u4f60\\u7684\\u670b\\u53cb\\u5f88\\u591a\\u3002\\u4f46\\u662f\\u5bf9\\u4e8e\\u81ea\\u5df1\\u7684\\u4e8b\\u60c5\\u4f60\\u8fd8\\u662f\\u8981\\u5b66\\u4f1a\\u638c\\u63a7\\u4e3b\\u5bfc\\u6743\\uff0c\\u4e0d\\u7136\\u4f1a\\u7ed9\\u4eba\\u4e00\\u79cd\\u6ca1\\u4e3b\\u89c1\\u7684\\u611f\\u89c9\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%\\uff0c\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u6d4b\\u6d4b\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"},{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"},{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"},{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"},{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205644262URry.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"img\":\"quce\\/quiz-6022-8FicneDfid.png\",\"desc\":\"\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u5f88\\u4f4e\\uff01\\u4f60\\u6709\\u5f88\\u591a\\u60f3\\u6cd5\\uff0c\\u6709\\u5f88\\u591a\\u60f3\\u505a\\u7684\\u4e8b\\uff0c\\u4f46\\u662f\\u901a\\u5e38\\u5728\\u884c\\u52a8\\u7684\\u8fc7\\u7a0b\\u4e2d\\u5bb9\\u6613\\u88ab\\u5176\\u4ed6\\u4e8b\\u60c5\\u5438\\u5f15\\uff0c\\u6240\\u4ee5\\u4f60\\u7684\\u575a\\u6301\\u5ea6\\u5f88\\u4f4e\\uff0c\\u6ca1\\u6709\\u51e0\\u4ef6\\u4e8b\\u4f60\\u53ef\\u4ee5\\u4ece\\u5934\\u505a\\u5230\\u5c3e\\u7684\\u3002\\u8fd9\\u6837\\u7684\\u4f60\\u8fc7\\u7684\\u81ea\\u7531\\u968f\\u6027\\uff0c\\u4f46\\u662f\\u968f\\u7740\\u5e74\\u9f84\\u7684\\u589e\\u957f\\uff0c\\u4f60\\u8fd9\\u6837\\u4e0b\\u53bb\\u4e0d\\u662f\\u529e\\u6cd5\\uff0c\\u56e0\\u4e3a\\u5f88\\u591a\\u4e8b\\u60c5\\u9700\\u8981\\u4e00\\u4efd\\u575a\\u6301\\u624d\\u80fd\\u6210\\u529f\\u3002\",\"sharetitle\":\"\\u6211\\u7684\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%\\uff0c\\u5584\\u53d8\\u968f\\u6027\\uff0c\\u6d4b\\u6d4b\\u4f60\\u7684\\u5014\\u5f3a\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a99%br\\u77e5\\u5176\\u4e0d\\u53ef\\u800c\\u4e3a\\u4e4b\",\"oldimg\":\"quce\\/quiz-2818-1492443386P4ezb4IiqJ.png\"},{\"threshold\":\"B\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a70%br\\u6840\\u9a9c\\u4e0d\\u9a6f\",\"oldimg\":\"quce\\/quiz-2818-14924433783EIUy5Y5a6.png\"},{\"threshold\":\"C\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a55%br\\u61c2\\u5f97\\u53d8\\u901a\",\"oldimg\":\"quce\\/quiz-2818-1492443380UQAy8yJlb0.png\"},{\"threshold\":\"D\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a32%br\\u6027\\u60c5\\u6e29\\u548c\\uff0c\\u5584\\u89e3\\u4eba\\u610f\",\"oldimg\":\"quce\\/quiz-2818-1492443382KseKO5H1NA.png\"},{\"threshold\":\"E\",\"title\":\"\\u5014\\u5f3a\\u6307\\u6570\\uff1a10%br\\u50cf\\u98ce\\u4e00\\u6837\\u4e0d\\u7740\\u8fb9\\u9645\",\"oldimg\":\"quce\\/quiz-2818-1492443384VqigaklZuI.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/15205644262URry.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 18) {
		data = data1[0];

	} else if (_num < 26 && _num >= 18) {
		data = data1[1];

	} else if (_num < 34 && _num >= 26) {
		data = data1[2];

	} else if (_num < 42 &&_num >= 34) {
		data = data1[3];
	}else if (_num >= 42) {
		data = data1[4];
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

