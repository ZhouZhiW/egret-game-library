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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a599%br\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\",\"img\":\"quce\\/quiz-5987-NpXKQCySJj.jpg\",\"desc\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u5df2\\u7ecf\\u5341\\u5206\\u4e25\\u91cd\\u4e86\\uff0c\\u4f60\\u5e38\\u4ee5\\u5341\\u5168\\u5341\\u7f8e\\u7684\\u9ad8\\u6807\\u51c6\\u6765\\u8981\\u6c42\\u81ea\\u5df1\\uff0c\\u4e3a\\u6b64\\uff0c\\u4f60\\u5e38\\u611f\\u5230\\u7126\\u8651\\u4e0d\\u5b89\\u3002\\u6709\\u65f6\\u4f60\\u7684\\u4f5c\\u4e3a\\u5e76\\u975e\\u81ea\\u5df1\\u6240\\u80fd\\u63a7\\u5236\\u5f97\\u4f4f\\uff0c\\u8d8a\\u662f\\u4e0d\\u60f3\\u505a\\u4ec0\\u4e48\\uff0c\\u5374\\u8d8a\\u662f\\u65e0\\u6cd5\\u505c\\u6b62\\u3002\\u662f\\u65f6\\u5019\\u653e\\u677e\\u4e0b\\u5fc3\\u60c5\\uff0c\\u7ed9\\u81ea\\u5df1\\u7f13\\u89e3\\u4e00\\u4e0b\\u538b\\u529b\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570599%\\uff0c\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a599%br\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\"},{\"threshold\":\"B\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a266%br\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\"},{\"threshold\":\"C\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a99%br\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a30%br\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615207eQnMg.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a266%br\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\",\"img\":\"quce\\/quiz-5987-ePC6NNbDQA.jpg\",\"desc\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u73b0\\u5728\\u4e5f\\u5f88\\u4e25\\u91cd\\u5462\\uff01\\u4f60\\u662f\\u4e2a\\u76f8\\u5f53\\u8d1f\\u8d23\\u4efb\\u7684\\u4eba\\uff0c\\u4ece\\u4e0d\\u5931\\u4fe1\\u4e8e\\u4eba\\uff0c\\u4f60\\u5bf9\\u81ea\\u5df1\\u6709\\u5f88\\u9ad8\\u7684\\u8981\\u6c42\\uff0c\\u5e73\\u65f6\\u603b\\u662f\\u5439\\u6bdb\\u6c42\\u75b5\\uff0c\\u4e0d\\u5141\\u8bb8\\u81ea\\u5df1\\u51fa\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\\uff0c\\u867d\\u7136\\u8fd9\\u79cd\\u5f3a\\u8feb\\u75c7\\u8ba9\\u4f60\\u517b\\u6210\\u4e86\\u4e25\\u8c28\\u7684\\u4f5c\\u98ce\\uff0c\\u4f46\\u6709\\u65f6\\u5019\\u4e5f\\u4f1a\\u7ed9\\u81ea\\u5df1\\u592a\\u5927\\u7684\\u538b\\u529b\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570266%\\uff0c\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a599%br\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\"},{\"threshold\":\"B\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a266%br\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\"},{\"threshold\":\"C\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a99%br\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a30%br\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615207eQnMg.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a99%br\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\",\"img\":\"quce\\/quiz-5987-mJJZHhnh5x.jpg\",\"desc\":\"\\u4f60\\u5f88\\u5c11\\u53d7\\u5f3a\\u8feb\\u75c7\\u7684\\u5f71\\u54cd\\uff0c\\u751f\\u6d3b\\u968f\\u6027\\u7684\\u4f60\\u51e0\\u4e4e\\u770b\\u4e0d\\u5230\\u5f3a\\u8feb\\u75c7\\u7684\\u5f71\\u5b50\\uff0c\\u4f60\\u603b\\u662f\\u6d3b\\u5f97\\u5341\\u5206\\u8f7b\\u677e\\u81ea\\u5728\\u3002\\u4f46\\u662f\\u5728\\u4e00\\u4e9b\\u7279\\u5b9a\\u7684\\u6761\\u4ef6\\u4e0b\\uff0c\\u6bd4\\u5982\\u4e00\\u5411\\u7231\\u5e72\\u51c0\\u7684\\u4f60\\u770b\\u5230\\u81ea\\u5df1\\u5bb6\\u91cc\\u88ab\\u5f04\\u7684\\u4e71\\u4e03\\u516b\\u7cdf\\uff0c\\u8fd9\\u65f6\\u5019\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u5c31\\u4f1a\\u53d1\\u4f5c\\uff0c\\u4e0d\\u628a\\u5bb6\\u91cc\\u6253\\u626b\\u5e72\\u51c0\\u5c31\\u53d7\\u4e0d\\u4e86\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u657099%\\uff0c\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a599%br\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\"},{\"threshold\":\"B\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a266%br\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\"},{\"threshold\":\"C\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a99%br\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a30%br\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615207eQnMg.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a30%br\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\",\"img\":\"quce\\/quiz-5987-2SkQzfJYSP.jpg\",\"desc\":\"\\u4f60\\u51e0\\u4e4e\\u662f\\u6ca1\\u6709\\u5f3a\\u8feb\\u75c7\\u7684\\uff0c\\u8fd9\\u4f7f\\u5f97\\u4f60\\u4e00\\u76f4\\u90fd\\u65e0\\u5fe7\\u65e0\\u8651\\u7684\\u751f\\u6d3b\\u7740\\u3002\\u5bf9\\u522b\\u4eba\\u7684\\u4e8b\\u60c5\\u4f60\\u5f88\\u5c11\\u70e6\\u5fc3\\uff0c\\u5bf9\\u81ea\\u5df1\\u4e5f\\u6bd4\\u8f83\\u5bbd\\u5bb9\\uff0c\\u662f\\u4e2a\\u76f8\\u5f53\\u4f1a\\u751f\\u6d3b\\u7684\\u4eba\\u3002\\u4f60\\u4ece\\u6765\\u4e0d\\u613f\\u610f\\u8003\\u8651\\u90a3\\u4e9b\\u7e41\\u590d\\u3001\\u590d\\u6742\\u7684\\u4e8b\\u60c5\\uff0c\\u4f60\\u505a\\u4e8b\\u968f\\u6027\\uff0c\\u4e0d\\u4f1a\\u8ba9\\u591a\\u4f59\\u7684\\u70e6\\u607c\\u6346\\u7ed1\\u7740\\u4f60\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u5f3a\\u8feb\\u75c7\\u6307\\u657030%\\uff0c\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\\u3002\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a599%br\\u5df2\\u7ecf\\u653e\\u5f03\\u6cbb\\u7597\\u4e86\"},{\"threshold\":\"B\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a266%br\\u4e0d\\u80fd\\u5fcd\\u53d7\\u4e00\\u70b9\\u70b9\\u5dee\\u9519\"},{\"threshold\":\"C\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a99%br\\u514b\\u5236\\u4e0d\\u4f4f\\u7684\\u6d2a\\u8352\\u4e4b\\u529b\"},{\"threshold\":\"D\",\"title\":\"\\u5f3a\\u8feb\\u75c7\\u6307\\u6570\\uff1a30%br\\u795e\\u7ecf\\u5927\\u6761\\uff0c\\u65e0\\u5fe7\\u65e0\\u8651\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1516615207eQnMg.png\",\"account\":1003}"},

	]
	var _num = 0;
	var data;
	for (var i = 0; i < option.length; i++) {
		_num += option[i];
	}
	if (_num < 10) {
		data = data1[3];

	} else if (_num < 15 && _num >= 10) {
		data = data1[2];

	} else if (_num < 20&& _num >= 15) {
		data = data1[1];

	} else if (_num >= 20) {
		data = data1[0];
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

