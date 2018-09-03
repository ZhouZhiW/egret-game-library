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
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05br\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"img\":\"quce\\/quiz-5475-8cMwnBsSD2.png\",\"desc\":\"\\u4eb2\\u5728\\u5fc3\\u4eea\\u7684\\u4eba\\u9762\\u524d\\u4f60\\u4f1a\\u53d8\\u5f97\\u975e\\u5e38\\u52c7\\u6562\\u800c\\u4e14\\u61c2\\u5f97\\u8fd0\\u7528\\u7b56\\u7565\\u3002\\u867d\\u7136\\u4f60\\u4f1a\\u4e3b\\u52a8\\u51fa\\u51fb\\uff0c\\u4f46\\u662f\\u4f60\\u5584\\u4e8e\\u4ee5\\u67d4\\u514b\\u521a\\u8ba9\\u5bf9\\u65b9\\u52a8\\u5bb9\\uff0c\\u5e76\\u53e6\\u8fd8\\u4f1a\\u8ba9\\u5bf9\\u65b9\\u8ba4\\u4e3a\\u4ed6\\u81ea\\u5df1\\u662f\\u4e3b\\u5bfc\\u8005\\u5904\\u4e8e\\u4f18\\u52bf\\u3002\\u5176\\u5b9e\\u771f\\u6b63\\u5728\\u4e0a\\u98ce\\u7684\\u662f\\u4f60\\uff0c\\u56e0\\u4e3a\\u4f60\\u7684\\u806a\\u6167\\uff0c\\u4e0d\\u4ec5\\u8ba9\\u4ed6\\u6709\\u4e00\\u79cd\\u6210\\u5c31\\u611f\\u800c\\u4e14\\u4e5f\\u987e\\u53ca\\u5230\\u5bf9\\u65b9\\u7684\\u5927\\u7537\\u5b50\\u4e3b\\u4e49\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05\\uff0c\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"oldimg\":\"quce\\/quiz-5475-YJQddfA4PC.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05br\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"oldimg\":\"quce\\/quiz-5475-YJQddfA4PC.png\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05br\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"oldimg\":\"quce\\/quiz-5475-FpxpHGPTX5.png\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05br\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"oldimg\":\"quce\\/quiz-5475-3Q2WnCAEAZ.png\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05br\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\uff0c\\u9b45\\u529b\\u65e0\\u9650\",\"oldimg\":\"quce\\/quiz-5475-MG34MknMTP.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520564474crBVv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"B\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05br\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"img\":\"quce\\/quiz-5475-FepmJcFSTs.png\",\"desc\":\"\\u4eb2\\u5e76\\u4e0d\\u64c5\\u957f\\u548c\\u5f02\\u6027\\u653b\\u5fc3\\uff0c\\u4f60\\u975e\\u5e38\\u76f4\\u7387\\u4e0d\\u592a\\u559c\\u6b22\\u64a9\\u6c49\\u7684\\u5c0f\\u624b\\u6bb5\\u3002\\u4f60\\u8ba4\\u4e3a\\u7231\\u5c31\\u662f\\u7231\\uff0c\\u4e0d\\u7231\\u5c31\\u79bb\\u5f00\\uff0c\\u8ba9\\u4f60\\u5fc3\\u52a8\\u7684\\u5f02\\u6027\\u662f\\u771f\\u7684\\u8d70\\u8fdb\\u4e86\\u4f60\\u7684\\u5185\\u5fc3\\u6df1\\u5904\\u3002\\u4f60\\u5fc3\\u7231\\u4e4b\\u4eba\\u64a9\\u59b9\\u529f\\u529b\\u6bd4\\u8f83\\u5389\\u5bb3\\uff0c\\u975e\\u5e38\\u61c2\\u5f97\\u4f60\\u7684\\u5fc3\\u601d\\u3002\\u867d\\u7136\\u4f60\\u6709\\u65f6\\u5019\\u4e0d\\u559c\\u6b22\\u8868\\u8fbe\\u81ea\\u5df1\\u7684\\u5fc3\\u610f\\uff0c\\u4f46\\u662f\\u4ed6\\u5f88\\u975e\\u5e38\\u660e\\u767d\\u4f60\\u7684\\u6d53\\u6d53\\u7231\\u610f\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05\\uff0c\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"oldimg\":\"quce\\/quiz-5475-FpxpHGPTX5.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05br\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"oldimg\":\"quce\\/quiz-5475-YJQddfA4PC.png\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05br\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"oldimg\":\"quce\\/quiz-5475-FpxpHGPTX5.png\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05br\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"oldimg\":\"quce\\/quiz-5475-3Q2WnCAEAZ.png\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05br\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\uff0c\\u9b45\\u529b\\u65e0\\u9650\",\"oldimg\":\"quce\\/quiz-5475-MG34MknMTP.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520564474crBVv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"C\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05br\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"img\":\"quce\\/quiz-5475-d5GsQbx4SX.png\",\"desc\":\"\\u4f60\\u7ed9\\u4eba\\u4e00\\u79cd\\u5c0f\\u5bb6\\u78a7\\u7389\\u7684\\u611f\\u89c9\\uff0c\\u4e0d\\u4ec5\\u8ba9\\u5f02\\u6027\\u89c9\\u5f97\\u5c0f\\u9e1f\\u4f9d\\u4eba\\u800c\\u4e14\\u5bb9\\u6613\\u8ba9\\u5bf9\\u65b9\\u4ea7\\u751f\\u601c\\u60dc\\u5b88\\u62a4\\u4e4b\\u60c5\\u3002\\u751f\\u6d3b\\u4e2d\\u7684\\u4f60\\u867d\\u7136\\u770b\\u4f3c\\u67d4\\u5f31\\uff0c\\u4f46\\u662f\\u975e\\u5e38\\u597d\\u5f3a\\u72ec\\u7acb\\uff0c\\u4f60\\u4e0e\\u4f17\\u4e0d\\u540c\\u7684\\u4e2a\\u6027\\u6b63\\u662f\\u6233\\u4e2d\\u4e86\\u4ed6\\u7684\\u5fc3\\u3002\\u4f60\\u8ba9\\u5bf9\\u65b9\\u89c9\\u5f97\\u975e\\u5e38\\u6e29\\u6696\\u800c\\u4e14\\u4ed6\\u4e5f\\u5341\\u5206\\u8ba4\\u53ef\\u5e76\\u503e\\u60c5\\u4e8e\\u4f60\\u7684\\u7f8e\\u8c8c\\u548c\\u5185\\u6db5\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05\\uff0c\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"oldimg\":\"quce\\/quiz-5475-3Q2WnCAEAZ.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05br\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"oldimg\":\"quce\\/quiz-5475-YJQddfA4PC.png\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05br\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"oldimg\":\"quce\\/quiz-5475-FpxpHGPTX5.png\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05br\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"oldimg\":\"quce\\/quiz-5475-3Q2WnCAEAZ.png\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05br\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\uff0c\\u9b45\\u529b\\u65e0\\u9650\",\"oldimg\":\"quce\\/quiz-5475-MG34MknMTP.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520564474crBVv.png\",\"account\":1003}"},
		{"content":"{\"threshold\":\"D\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05br\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\uff0c\\u9b45\\u529b\\u65e0\\u9650\",\"img\":\"quce\\/quiz-5475-eBNmH532Js.png\",\"desc\":\"\\u4f60\\u5c5e\\u4e8e\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\u7684\\u5b8c\\u7f8e\\u578b\\uff0c\\u867d\\u7136\\u4f60\\u975e\\u5e38\\u5bb9\\u6613\\u5438\\u5f15\\u5f02\\u6027\\u7684\\u76ee\\u5149\\uff0c\\u4f46\\u662f\\u5bf9\\u4e8e\\u64a9\\u6c49\\u6765\\u8bf4\\u4f60\\u8fd8\\u662f\\u7a0d\\u663e\\u7a1a\\u5ae9\\u3002\\u8ddf\\u559c\\u6b22\\u7684\\u4eba\\u5728\\u4e00\\u8d77\\u4f60\\u4f1a\\u6709\\u65f6\\u5019\\u80e1\\u601d\\u4e71\\u60f3\\u7f3a\\u4e4f\\u5b89\\u5168\\u611f\\uff0c\\u8ba9\\u81ea\\u5df1\\u539f\\u6709\\u7684\\u9b45\\u529b\\u4e0d\\u77e5\\u5982\\u4f55\\u91ca\\u653e\\u3002\\u4f46\\u662f\\u6b63\\u662f\\u56e0\\u4e3a\\u4f60\\u7684\\u77dc\\u6301\\u8c28\\u614e\\uff0c\\u8ba9\\u5bf9\\u65b9\\u66f4\\u52a0\\u5728\\u4e4e\\u4f60\\u7684\\u611f\\u53d7\\uff0c\\u4ed6\\u6df1\\u77e5\\u4f60\\u662f\\u4e00\\u4f4d\\u975e\\u5e38\\u7a33\\u91cd\\u7684\\u597d\\u59d1\\u5a18\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\u6709\\u591a\\u9ad8\\uff1f\\u6211\\u7684\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05\\uff0c\\u957f\\u76f8\\u5929\\u751f\\u5c31\\u5360\\u4f18\\u52bf\",\"oldimg\":\"quce\\/quiz-5475-MG34MknMTP.png\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a300\\uff05br\\u806a\\u6167\\u72e1\\u9ee0\\uff0c\\u63a2\\u5f97\\u4eba\\u5fc3\",\"oldimg\":\"quce\\/quiz-5475-YJQddfA4PC.png\"},{\"threshold\":\"B\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a99\\uff05br\\u7b80\\u5355\\u76f4\\u7387\\u8ba8\\u4eba\\u559c\",\"oldimg\":\"quce\\/quiz-5475-FpxpHGPTX5.png\"},{\"threshold\":\"C\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a150\\uff05br\\u5916\\u67d4\\u5185\\u521a\\u60f9\\u4eba\\u601c\",\"oldimg\":\"quce\\/quiz-5475-3Q2WnCAEAZ.png\"},{\"threshold\":\"D\",\"title\":\"\\u64a9\\u6c49\\u6c34\\u5e73\\uff1a200\\uff05br\\u7f8e\\u8c8c\\u4e0e\\u667a\\u6167\\u5e76\\u5b58\\uff0c\\u9b45\\u529b\\u65e0\\u9650\",\"oldimg\":\"quce\\/quiz-5475-MG34MknMTP.png\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1520564474crBVv.png\",\"account\":1003}"},
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


}

