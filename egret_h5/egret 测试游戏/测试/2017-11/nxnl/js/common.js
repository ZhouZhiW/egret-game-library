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
		{
			"content": "{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\",\"img\":\"quce\\/quiz-5323-XpTbERrefM.png\",\"desc\":\"\\u4f60\\u5c31\\u662f\\u4e00\\u4e2a\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\\uff0c\\u8eab\\u8fb9\\u4eba\\u773c\\u4e2d\\u7684\\u4e07\\u5e74\\u4e09\\u5c81\\uff01\\u4f60\\u6c38\\u8fdc\\u90fd\\u662f\\u6000\\u63e3\\u7740\\u4e00\\u9897\\u5929\\u771f\\u65e0\\u90aa\\u7684\\u5fc3\\u9762\\u5bf9\\u7740\\u4e00\\u5207\\uff0c\\u5bf9\\u8fd9\\u4e2a\\u4e16\\u754c\\u5145\\u6ee1\\u4e86\\u7f8e\\u597d\\u7684\\u5e7b\\u60f3\\uff0c\\u8eab\\u8fb9\\u4eba\\u4e5f\\u5e38\\u4f1a\\u88ab\\u4f60\\u7684\\u5355\\u7eaf\\u5584\\u826f\\u6240\\u6253\\u52a8\\uff0c\\u5982\\u6b64\\u7b80\\u5355\\u7684\\u4f60\\u81ea\\u7136\\u4e5f\\u662f\\u6df1\\u53d7\\u5468\\u56f4\\u4eba\\u7684\\u559c\\u7231\\u548c\\u75bc\\u60dc\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u6709\\u51e0\\u5c81\\uff1f\\u6211\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81\\uff0c\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/15132420559ikaD.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\",\"img\":\"quce\\/quiz-5323-s4WMA7kMA6.png\",\"desc\":\"\\u4f60\\u5c31\\u662f\\u4e00\\u4e2a\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\\uff0c\\u7b80\\u5355\\u7eaf\\u7cb9\\u5230\\u8ba9\\u4eba\\u4e00\\u773c\\u5c31\\u770b\\u900f\\u3002\\u4f60\\u5f00\\u5fc3\\u5c31\\u7b11\\uff0c\\u96be\\u8fc7\\u5c31\\u54ed\\uff0c\\u4ece\\u6765\\u4e0d\\u4f1a\\u63a9\\u9970\\u81ea\\u5df1\\u7684\\u60c5\\u7eea\\uff0c\\u5411\\u6765\\u90fd\\u662f\\u6709\\u4ec0\\u4e48\\u5c31\\u8bf4\\u4ec0\\u4e48\\u7684\\u5178\\u578b\\u76f4\\u80a0\\u5b50\\u3002\\u6027\\u683c\\u5f00\\u6717\\u7684\\u4f60\\u4e5f\\u662f\\u4e2a\\u4ea4\\u9645\\u9ad8\\u624b\\uff0c\\u80fd\\u5f88\\u5feb\\u7684\\u4e0e\\u8eab\\u8fb9\\u4eba\\u6253\\u6210\\u4e00\\u7247\\uff0c\\u548c\\u4f60\\u5728\\u4e00\\u8d77\\u603b\\u662f\\u80fd\\u4f53\\u4f1a\\u5230\\u65e0\\u9650\\u7684\\u6b22\\u4e50\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u6709\\u51e0\\u5c81\\uff1f\\u6211\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81\\uff0c\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/15132420559ikaD.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\",\"img\":\"quce\\/quiz-5323-7cdBGkxzC3.png\",\"desc\":\"\\u4e0d\\u7ba1\\u4f60\\u7684\\u5e74\\u9f84\\u662f\\u5426\\u5df2\\u7ecf\\u8fc7\\u4e86\\u9752\\u6625\\u671f\\uff0c\\u4f46\\u4f60\\u7684\\u884c\\u4e3a\\u4e3e\\u6b62\\u6c38\\u8fdc\\u90fd\\u662f\\u672a\\u6210\\u5e74\\uff0c\\u7231\\u73a9\\uff0c\\u7231\\u7b11\\u51e0\\u4e4e\\u662f\\u4f60\\u751f\\u6d3b\\u7684\\u5168\\u90e8\\u3002\\u751f\\u6027\\u7231\\u81ea\\u7531\\u7684\\u4f60\\u6700\\u8ba8\\u538c\\u88ab\\u675f\\u7f1a\\uff0c\\u8111\\u6d1e\\u6709\\u4e9b\\u5927\\u6240\\u4ee5\\u60f3\\u6cd5\\u5f88\\u591a\\uff0c\\u603b\\u662f\\u80fd\\u4e3a\\u8eab\\u8fb9\\u4eba\\u5e26\\u6765\\u5f88\\u591a\\u4e50\\u8da3\\uff0c\\u6240\\u4ee5\\u4f60\\u7684\\u670b\\u53cb\\u4e5f\\u5f88\\u591a\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u6709\\u51e0\\u5c81\\uff1f\\u6211\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81\\uff0c\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/15132420559ikaD.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\",\"img\":\"quce\\/quiz-5323-X7bd8s4JPj.png\",\"desc\":\"\\u4f60\\u7684\\u5fc3\\u7406\\u5e74\\u9f84\\u6b63\\u503c\\u9752\\u5e74\\uff0c23\\u5c81\\u5df2\\u4e0d\\u518d\\u9752\\u6da9\\u7a1a\\u5ae9\\uff0c\\u4f46\\u4e5f\\u8fc7\\u4e86\\u83bd\\u649e\\u51b2\\u52a8\\u7684\\u5e74\\u7eaa\\u3002\\u8fd9\\u662f\\u4e00\\u4e2a\\u521a\\u521a\\u597d\\u7684\\u5b8c\\u7f8e\\u65f6\\u671f\\uff0c\\u4f60\\u5bf9\\u751f\\u6d3b\\u4ecd\\u5145\\u6ee1\\u70ed\\u60c5\\u4e0e\\u5e0c\\u671b\\uff0c\\u52c7\\u4e8e\\u5c1d\\u8bd5\\u53bb\\u7a81\\u7834\\u81ea\\u6211\\uff0c\\u9762\\u5bf9\\u56f0\\u96be\\u65f6\\u65e0\\u6240\\u754f\\u60e7\\uff0c\\u800c\\u8fd9\\u4efd\\u679c\\u6562\\u548c\\u51b3\\u5fc3\\uff0c\\u6b63\\u662f\\u4f60\\u4e0d\\u65ad\\u8715\\u53d8\\u7684\\u63a8\\u52a8\\u529b\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u6709\\u51e0\\u5c81\\uff1f\\u6211\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81\\uff0c\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/15132420559ikaD.png\",\"account\":1003}"
		},
		{
			"content": "{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\",\"img\":\"quce\\/quiz-5323-xBsswFMfr7.png\",\"desc\":\"\\u4f60\\u62e5\\u6709\\u4e00\\u9897\\u6bd4\\u8f83\\u6210\\u719f\\u7684\\u5fc3\\uff01\\u4e0d\\u77e5\\u9053\\u662f\\u7ecf\\u5386\\u7684\\u591a\\u4e86\\u8fd8\\u662f\\u6210\\u957f\\u7684\\u8fc7\\u5feb\\uff0c\\u4f60\\u770b\\u8d77\\u6765\\u8981\\u6bd4\\u540c\\u9f84\\u4eba\\u90fd\\u7565\\u663e\\u6210\\u719f\\u3002\\u4f60\\u603b\\u662f\\u90a3\\u4e48\\u7684\\u4ece\\u5bb9\\u51b7\\u9759\\uff0c\\u61c2\\u5f97\\u5982\\u4f55\\u53bb\\u63a7\\u5236\\u81ea\\u5df1\\u7684\\u60c5\\u7eea\\uff0c\\u4ece\\u4e0d\\u559c\\u6b22\\u4e0e\\u4eba\\u4e89\\u5435\\uff0c\\u770b\\u900f\\u4e0d\\u8bf4\\u900f\\u662f\\u4f60\\u73b0\\u5728\\u7684\\u4eba\\u751f\\u4fe1\\u5ff5\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\u6709\\u51e0\\u5c81\\uff1f\\u6211\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81\\uff0c\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"}",
			"status": 200,
			"total": "[{\"threshold\":\"A\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a35\\u5c81br\\u6210\\u719f\\u7684\\u5c0f\\u5927\\u4eba\"},{\"threshold\":\"B\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a23\\u5c81br\\u6b63\\u503c\\u9752\\u6625\\u5f53\\u5e74\"},{\"threshold\":\"C\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a16\\u5c81br\\u6c38\\u8fdc\\u7684\\u672a\\u6210\\u5e74\"},{\"threshold\":\"D\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a10\\u5c81br\\u5e7c\\u7a1a\\u7684\\u5927\\u5c0f\\u5b69\"},{\"threshold\":\"E\",\"title\":\"\\u4f60\\u7684\\u5185\\u5fc3\\u5e74\\u9f84\\uff1a3\\u5c81br\\u957f\\u4e0d\\u5927\\u7684\\u5b69\\u5b50\"}]",
			"attention": "{\"qrcode\":\"quce\\/qrcode\\/15132420559ikaD.png\",\"account\":1003}"
		}
	]
	var _num=0;
	var data;
	for(var i=0;i<option.length;i++){
		_num+=option[i];
	}
	if(_num<10){
		data=data1[0];
		
	}else if(_num<12&&_num>=10) {
		data=data1[1];
	
	}else if(_num<14&&_num>=12){
		data=data1[2];
	
	}else if(_num<18&&_num>=14){
		data=data1[3];
		
	}else if(_num<_num>=18){
		data=data1[4];
	}
	console.log(_num);


	if(data.status == 200){
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if(result['img']){
			result['img'] = "./"+ result['img'];
		}
		//clearInterval(getTimer);
		//if(timerCnt < waitTime){
		//	waitTime -= timerCnt;
		//	callback(result, JSON.parse(data['total']), waitTime);
			callback(result, JSON.parse(data['total']), 4);
		//}else{
		//	callback(result, JSON.parse(data['total']), 0);
		}
	// "http://w.tiantianquce.com/index.php/wetest/entry/getresult"
	//$.ajax({
	//	// type: 'POST',
	//	type: 'GET',
	//	// url: serser,
	//	url: "./d.json",
	//	// data: postData,
	//	dataType: 'json',
	//	timeout: 20000,
	//	success: function(data){
	//		if(data.status == 200){
	//			var result = JSON.parse(data['content']);
	//			var attention = JSON.parse(data['attention']);
	//			result['attention'] = attention;
	//			if(result['img']){
	//				result['img'] = adminPath +"/"+ result['img'];
	//			}
	//			clearInterval(getTimer);
	//			if(timerCnt < waitTime){
	//				waitTime -= timerCnt;
	//				callback(result, JSON.parse(data['total']), waitTime);
	//			}else{
	//				callback(result, JSON.parse(data['total']), 0);
	//			}
	//		}else{
	//			clearInterval(checkTimer);
	//			clearInterval(getTimer);
	//			if(timerCnt < waitTime){
	//				setTimeout(function(){
	//					showError(data.status);
	//				}, (waitTime-timerCnt)*1000);
	//			}else{
	//				showError(data.status);
	//			}
	//		}
	//	},
	//	error: function(xhr, type){
	//		var errorinfo = xhr.status+" "+type;
	//		// console.log(errorinfo)
	//		showError(errorinfo);
	//	}
	//})
}

