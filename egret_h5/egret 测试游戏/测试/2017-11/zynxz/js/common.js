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

function toogleClass(obj, cls) {
	if (hasClass(obj, cls)) {
		removeClass(obj, cls);
	} else {
		addClass(obj, cls);
	}
}

function aboutUS() {
	location.href = aboutUrl;
}

function random(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
/*  common function */
function ajaxGet(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			// var d= xmlHttp.responseText;
			//$result = JSON.parse(d);
			callback && callback(xmlHttp.responseText);
		}
	}
	xmlHttp.send();
}

function ajaxPost(url, data, callback, error) {
	var postData = data;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if (typeof (postData) === 'object') {
		postData = (function (obj) { // 转成post需要的字符串.
			var str = "";
			for (var prop in obj) {
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}
	xhr.onreadystatechange = function () {
		var XMLHttpReq = xhr;
		if (XMLHttpReq.readyState == 4) {
			if (XMLHttpReq.status == 200) {
				var text = XMLHttpReq.responseText;
				callback && callback(text);
			} else {
				xhr.abort();
				error && error(XMLHttpReq.status);
			}
		}
	};
	xhr.send(postData);
}

function updateRecord(gameId, record, level) {
	var data = {};
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
function getResult(serser, gid, option, callback) {
	var timerCnt = 0,
		getOk = 0,
		waitTime = 5;
	var getTimer = setInterval(function () {
		timerCnt++;
	}, 1000);
	var checkTimer = setInterval(function () {
		if (getOk) {
			clearInterval(checkTimer);
		}
	}, 1000);

	var postData = {
		id: gid,
		option: option,
		acid: acid
	};
	if (typeof (postData) === 'object') {
		postData = (function (obj) { // 转成post需要的字符串.
			var str = "";
			for (var prop in obj) {
				str += prop + "=" + obj[prop] + "&"
			}
			return str;
		})(postData);
	}

	var data1 = [
		{ "content": "{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\",\"img\":\"quce\\/quiz-5398-abaShTT6eZ.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u53cc\\u9c7c\\u4f7f\\u4f60\\u62e5\\u6709\\u6e29\\u548c\\u7684\\u5904\\u4e8b\\u6001\\u5ea6\\uff0c\\u4f60\\u6700\\u6015\\u5f97\\u7f6a\\u4ed6\\u4eba\\uff0c\\u78b0\\u5230\\u611f\\u89c9\\u96be\\u529e\\u7684\\u4e8b\\u60c5\\uff0c\\u5e72\\u8106\\u5c31\\u7741\\u4e00\\u53ea\\u773c\\u95ed\\u4e00\\u53ea\\u773c\\uff0c\\u4f46\\u8fd9\\u4e0d\\u4ee3\\u8868\\u4f60\\u6ca1\\u6709\\u8d23\\u4efb\\u5fc3\\u54e6\\uff01\\u4f60\\u53f3\\u8111\\u7684\\u72ee\\u5b50\\u5ea7\\u4f1a\\u5728\\u7d27\\u8981\\u5173\\u5934\\u633a\\u8eab\\u800c\\u51fa\\uff0c\\u7528\\u5e73\\u65f6\\u5927\\u5bb6\\u4e0d\\u5e38\\u770b\\u5230\\u7684\\u9738\\u6c14\\u6837\\u8c8c\\u641e\\u5b9a\\u4e00\\u5207\\uff0c\\u5e05\\u6c14\\u7684\\u8ba9\\u8eab\\u8fb9\\u7684\\u4eba\\u90fd\\u610f\\u60f3\\u4e0d\\u5230\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50\\uff0c\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\",\"img\":\"quce\\/quiz-5398-7xQ2mSTMsi.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u6c34\\u74f6\\u5ea7\\u7ed9\\u4e86\\u4f60\\u65e0\\u7a77\\u65e0\\u5c3d\\u7684\\u60f3\\u50cf\\u529b\\uff0c\\u4f60\\u7684\\u8111\\u5e26\\u4e2d\\u6709\\u7740\\u5404\\u5f0f\\u5404\\u6837\\u5929\\u9a6c\\u884c\\u7a7a\\u7684\\u60f3\\u6cd5\\uff0c\\u518d\\u52a0\\u4e0a\\u9047\\u4e8b\\u51b7\\u9759\\u7684\\u7279\\u70b9\\uff0c\\u96be\\u602a\\u8eab\\u8fb9\\u7684\\u670b\\u53cb\\u4eec\\u4e60\\u60ef\\u5728\\u9047\\u5230\\u56f0\\u96be\\u540e\\u5148\\u53bb\\u627e\\u4f60\\uff01\\u8fd8\\u6709\\u4f60\\u53f3\\u8111\\u53cc\\u5b50\\u5ea7\\u7684\\u52a0\\u6301\\uff0c\\u7075\\u6d3b\\u7684\\u8111\\u888b\\u52a0\\u4e0a\\u80fd\\u8a00\\u5584\\u9053\\u7684\\u53e3\\u624d\\uff0c\\u4f60\\u7684\\u4eba\\u7f18\\u7b80\\u76f4\\u597d\\u7684\\u4e0d\\u5f97\\u4e86\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50\\uff0c\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\",\"img\":\"quce\\/quiz-5398-JtMBkwkSXm.jpg\",\"desc\":\"\\u5de6\\u8111\\u5929\\u874e\\u5ea7\\u7684\\u4f60\\u5e73\\u65f6\\u7684\\u884c\\u4e8b\\u98ce\\u683c\\u706b\\u8fa3\\u9739\\u96f3\\uff0c\\u7231\\u6068\\u5206\\u660e\\uff0c\\u76f8\\u5f53\\u4e0d\\u597d\\u60f9\\uff01\\u4f46\\u5b9e\\u9645\\u4e0a\\u4f60\\u7684\\u60c5\\u611f\\u5374\\u662f\\u53d7\\u53f3\\u8111\\u7684\\u5904\\u5973\\u5ea7\\u63a7\\u5236\\uff0c\\u5728\\u611f\\u60c5\\u65b9\\u9762\\u4f60\\u603b\\u662f\\u754f\\u754f\\u7f29\\u7f29\\uff0c\\u6015\\u4f24\\u5bb3\\u522b\\u4eba\\u4e5f\\u6015\\u81ea\\u5df1\\u53d7\\u4f24\\uff0c\\u5176\\u5b9e\\u5230\\u6700\\u540e\\u662f\\u82e6\\u4e86\\u81ea\\u5df1\\u554a..\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973\\uff0c\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\",\"img\":\"quce\\/quiz-5398-38bsMByNSD.jpg\",\"desc\":\"\\u4f60\\u5728\\u4ed6\\u4eba\\u773c\\u4e2d\\u5927\\u591a\\u65f6\\u5019\\u90fd\\u662f\\u5de6\\u53f3\\u9022\\u6e90\\u7684\\uff0c\\u5de6\\u8111\\u7684\\u5929\\u79e4\\u5f71\\u54cd\\u7740\\u4f60\\u7684\\u884c\\u4e3a\\u6a21\\u5f0f\\uff0c\\u4f60\\u603b\\u662f\\u80fd\\u628a\\u8eab\\u8fb9\\u7684\\u4e8b\\u60c5\\u5904\\u7406\\u7684\\u5341\\u5206\\u5b8c\\u5584\\uff0c\\u8fd9\\u79cd\\u6c38\\u8fdc\\u6709\\u6761\\u4e0d\\u7d0a\\u7684\\u80fd\\u529b\\u8ba9\\u4eba\\u7fa1\\u6155\\u4e0d\\u5df2\\uff01\\u4f46\\u4e8b\\u5b9e\\u4e0a\\uff0c\\u53d7\\u53f3\\u8111\\u91cc\\u7684\\u6469\\u7faf\\u5ea7\\u5f71\\u54cd\\uff0c\\u4f60\\u5e76\\u4e0d\\u4eab\\u53d7\\u8fd9\\u79cd\\u548c\\u4eba\\u6253\\u4ea4\\u9053\\u7684\\u611f\\u89c9\\uff0c\\u4f60\\u79c1\\u5e95\\u4e0b\\u7684\\u751f\\u6d3b\\u53ef\\u80fd\\u4f1a\\u8ba9\\u8eab\\u8fb9\\u7684\\u4eba\\u611f\\u5230\\u4e4f\\u5473\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7faf\\uff0c\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\",\"img\":\"quce\\/quiz-5398-eQ5WdKjnYQ.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u5904\\u5973\\u8d4b\\u4e88\\u4e86\\u4f60\\u4fdd\\u5b88\\u5185\\u655b\\u7684\\u6c14\\u8d28\\uff0c\\u5e73\\u65f6\\u5904\\u7406\\u4e8b\\u60c5\\u65f6\\u7684\\u4f60\\u603b\\u662f\\u5f88\\u6709\\u6761\\u6709\\u7406\\uff0c\\u5b8c\\u7f8e\\u7ec6\\u81f4\\u5230\\u8ba9\\u4eba\\u611f\\u5230\\u9f9f\\u6bdb\\u7684\\u7a0b\\u5ea6\\uff0c\\u4f46\\u8fd9\\u4e5f\\u4ec5\\u9650\\u4e8e\\u505a\\u6b63\\u4e8b\\u7684\\u65f6\\u5019\\u5566\\u3002\\u5728\\u559c\\u6b22\\u7684\\u4eba\\u9762\\u524d\\u4f60\\u662f\\u51e0\\u4e4e\\u6ca1\\u6709\\u7406\\u667a\\u53ef\\u8a00\\u7684\\uff0c\\u751a\\u81f3\\u53ef\\u4ee5\\u79f0\\u4e3a\\u662f\\u9760\\u4e0b\\u534a\\u8eab\\u601d\\u8003\\u52a8\\u7269....\\u54b3\\u54b3\\uff0c\\u8001\\u5b9e\\u8bf4\\uff0c\\u5c31\\u7b97\\u4f60\\u4e0d\\u60f3\\u627f\\u8ba4\\u4e5f\\u65e0\\u6cd5\\u554a.\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8a\\uff0c\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{"content": "{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\",\"img\":\"quce\\/quiz-5398-ffTWwGF37s.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u72ee\\u5b50\\u4e3b\\u7ba1\\u4f60\\u7684\\u884c\\u4e3a\\u6a21\\u5f0f\\uff0c\\u6240\\u4ee5\\u5e73\\u65f6\\u7684\\u4f60\\u603b\\u662f\\u4e00\\u526f\\u9738\\u6c14\\u51db\\u7136\\u7684\\u5f62\\u8c61\\uff0c\\u4eab\\u53d7\\u8eab\\u8fb9\\u4eba\\u7684\\u5938\\u5956\\u548c\\u63a8\\u5d07\\uff0c\\u597d\\u9762\\u5b50\\u7684\\u5c5e\\u6027\\u8ba9\\u4f60\\u4e0d\\u613f\\u610f\\u5728\\u4efb\\u4f55\\u4eba\\u9762\\u524d\\u4f4e\\u4e0b\\u5934\\u6765\\u3002\\u7136\\u800c\\u53f3\\u8111\\u7684\\u53cc\\u9c7c\\u5ea7\\u5219\\u4f1a\\u6084\\u6084\\u7684\\u5f71\\u54cd\\u4f60\\u7684\\u60c5\\u611f\\uff0c\\u4f60\\u4f1a\\u5728\\u4e00\\u4e2a\\u4eba\\u7684\\u65f6\\u5019\\u80e1\\u601d\\u4e71\\u60f3\\u81ea\\u6211\\u6000\\u7591\\uff0c\\u6d41\\u9732\\u51fa\\u591a\\u6101\\u5584\\u611f\\u7684\\u4e00\\u9762\\u3002\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7c\\uff0c\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\",\"img\":\"quce\\/quiz-5398-iKP5RSAZ8c.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u6469\\u7faf\\u7684\\u4f60\\u5e38\\u7ed9\\u522b\\u4eba\\u7559\\u4e0b\\u6c89\\u7a33\\u7684\\u5370\\u8c61\\uff0c\\u4f60\\u5728\\u5904\\u7406\\u5de5\\u4f5c\\u4e4b\\u7c7b\\u7684\\u6b63\\u4e8b\\u65f6\\uff0c\\u603b\\u662f\\u80fd\\u8ba9\\u8eab\\u8fb9\\u7684\\u4eba\\u611f\\u5230\\u8e0f\\u5b9e\\u53ef\\u9760\\u3002\\u4f46\\u5f53\\u4f60\\u4e00\\u4e2a\\u4eba\\u7684\\u65f6\\u5019\\uff0c\\u5f80\\u5f80\\u559c\\u6b22\\u53d1\\u5446\\uff0c\\u751a\\u81f3\\u5f88\\u5bb9\\u6613\\u611f\\u5230\\u65e0\\u6240\\u9002\\u4ece\\uff0c\\u548c\\u5e73\\u65f6\\u7684\\u6837\\u5b50\\u5168\\u7136\\u4e0d\\u540c\\uff0c\\u8fd9\\u662f\\u56e0\\u4e3a\\u53f3\\u8111\\u7684\\u5de8\\u87f9\\u5ea7\\u5c31\\u8dd1\\u51fa\\u6765\\u6363\\u4e71\\u4e86\\u54e6\\u301c\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9\\uff0c\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\",\"img\":\"quce\\/quiz-5398-WeiB4DKByX.jpg\",\"desc\":\"\\u4e24\\u8fb9\\u5927\\u8111\\u90fd\\u662f\\u53cc\\u5b50\\u5ea7\\u7684\\u4f60\\u4e5f\\u662f\\u771f\\u7684\\u5389\\u5bb3\\u4e86\\u554a\\u301c\\u53cc\\u91cd\\u4eba\\u683c\\u5c31\\u5df2\\u7ecf\\u591f\\u5934\\u5927\\u4e86\\uff0c\\u62e5\\u6709\\u56db\\u4e2a\\u5206\\u8eab\\u7684\\u4f60\\u60f3\\u5fc5\\u5728\\u505a\\u9009\\u62e9\\u4e0a\\u4e00\\u5b9a\\u662f\\u96be\\u4e0a\\u52a0\\u96be\\u5427\\uff01\\u5927\\u6982\\u6ca1\\u6709\\u4eba\\u6709\\u6bd4\\u4f60\\u66f4\\u4e25\\u91cd\\u7684\\u9009\\u62e9\\u56f0\\u96be\\u75c7\\u5019\\u7fa4\\u4e86\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50\\uff0c\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\",\"img\":\"quce\\/quiz-5398-mctPc5AYYD.jpg\",\"desc\":\"\\u5de6\\u8111\\u7684\\u5c04\\u624b\\u7ed9\\u4e86\\u4f60\\u65e0\\u7a77\\u65e0\\u5c3d\\u7684\\u6d3b\\u529b\\uff0c\\u4f60\\u751f\\u6d3b\\u4e2d\\u8868\\u73b0\\u51fa\\u7684\\u6837\\u5b50\\u603b\\u662f\\u5f88\\u6d12\\u8131\\u4e0d\\u53d7\\u62d8\\u675f\\uff0c\\u6709\\u65f6\\u5019\\u751a\\u81f3\\u7ed9\\u522b\\u4eba\\u76f8\\u5f53\\u4e0d\\u53ef\\u9760\\u7684\\u611f\\u89c9\\u3002\\u4f46\\u79c1\\u4e0b\\u91cc\\u5176\\u5b9e\\u4f60\\u5c31\\u50cf\\u4e2a\\u95f7\\u846b\\u82a6\\u4e00\\u6837\\uff0c\\u559c\\u6b22\\u4e00\\u4e2a\\u4eba\\u5b89\\u9759\\u4e0d\\u8bf4\\u8bdd\\uff0c\\u601d\\u8003\\u95ee\\u9898\\u8fd8\\u6709\\u70b9\\u559c\\u6b22\\u94bb\\u725b\\u89d2\\u5c16\\uff0c\\u8fd9\\u90fd\\u662f\\u4f60\\u53f3\\u8111\\u6709\\u4e2a\\u91d1\\u725b\\u7684\\u7f18\\u6545\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725b\\uff0c\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{ "content": "{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\",\"img\":\"quce\\/quiz-5398-4i64SWhKdt.jpg\",\"desc\":\"\\u5de6\\u8111\\u767d\\u7f8a\\u7684\\u4f60\\u5e73\\u65f6\\u505a\\u4e8b\\u5341\\u5206\\u7684\\u7c97\\u5fc3\\uff0c\\u4e0d\\u5728\\u4e4e\\u7ec6\\u8282\\uff0c\\u5904\\u7406\\u4e00\\u4e9b\\u5c0f\\u4e8b\\u65f6\\u7ecf\\u5e38\\u4f1a\\u4e0d\\u5728\\u72b6\\u51b5\\u5185\\uff0c\\u6240\\u4ee5\\u5bb9\\u6613\\u7ed9\\u670b\\u53cb\\u4eec\\u4e00\\u79cd\\u5929\\u7136\\u5446\\u7684\\u5370\\u8c61\\uff0c\\u4f46\\u8fd9\\u4e0d\\u4ee3\\u8868\\u4f60\\u5c31\\u4e0d\\u53ef\\u9760\\u54e6\\uff01\\u6bd5\\u7adf\\u4f60\\u7684\\u53f3\\u8111\\u4f4f\\u7740\\u5f3a\\u52bf\\u5230\\u4e0d\\u884c\\u7684\\u5929\\u874e\\u5ea7\\u554a\\uff01\\u5f53\\u9047\\u5230\\u5927\\u4e8b\\u60c5\\u7684\\u65f6\\u5019\\uff0c\\u4f60\\u7684\\u51b7\\u9759\\u6c89\\u7740\\u771f\\u7684\\u4f1a\\u8ba9\\u5927\\u5bb6\\u773c\\u775b\\u4e3a\\u4e4b\\u4e00\\u4eae\\u5462\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874e\\uff0c\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"}", "status": 200, "total": "[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]", "attention": "{\"qrcode\":\"quce\\/qrcode\\/1513580423pyu5F.png\",\"account\":1003}" },
		{"content":"{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\",\"img\":\"quce\\/quiz-5398-brDXz3sjGt.jpg\",\"desc\":\"\\u5de6\\u8111\\u91d1\\u725b\\u7684\\u4f60\\u603b\\u662f\\u7528\\u5f88\\u4e25\\u8c28\\u7684\\u65b9\\u5f0f\\u5904\\u7406\\u4e00\\u5207\\u5927\\u5927\\u5c0f\\u5c0f\\u7684\\u95ee\\u9898\\uff0c\\u867d\\u7136\\u5e73\\u65f6\\u4e0d\\u82df\\u8a00\\u7b11\\u4e0d\\u8fc7\\u4f60\\u662f\\u4e00\\u4e2a\\u975e\\u5e38\\u6ce8\\u91cd\\u751f\\u6d3b\\u54c1\\u8d28\\u548c\\u4f11\\u95f2\\u7684\\u4eba\\uff01\\u800c\\u53f3\\u8111\\u4f4f\\u7740\\u7684\\u5929\\u79e4\\u8bf4\\u660e\\u4f60\\u6ce8\\u91cd\\u5ba1\\u7f8e\\u611f\\uff0c\\u5e38\\u5e38\\u5f85\\u5728\\u4f60\\u8eab\\u8fb9\\u7684\\u8bdd\\uff0c\\u4f60\\u670b\\u53cb\\u7684\\u5ba1\\u7f8e\\u89c2\\u4e5f\\u4e0d\\u77e5\\u4e0d\\u89c9\\u7684\\u63d0\\u9ad8\\u4e86\\u5462\\uff01\",\"sharetitle\":\"\\u4f60\\u7684\\u5de6\\u53f3\\u8111\\u5206\\u522b\\u5c5e\\u4e8e\\u4ec0\\u4e48\\u661f\\u5ea7\\uff1f\\u6211\\u662f\\uff1a\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4\\uff0c\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"}","status":200,"total":"[{\"threshold\":\"A\",\"title\":\"\\u5de6\\u8111\\u91d1\\u725b\\uff0b\\u53f3\\u8111\\u5929\\u79e4br\\u4e25\\u8c28\\u7406\\u6027\\uff0c\\u827a\\u672f\\u611f\\u5f88\\u5f3a\"},{\"threshold\":\"B\",\"title\":\"\\u5de6\\u8111\\u767d\\u7f8a\\uff0b\\u53f3\\u8111\\u5929\\u874ebr\\u4e00\\u534a\\u7c97\\u5fc3\\u4e00\\u534a\\u7a33\\u91cd\"},{\"threshold\":\"C\",\"title\":\"\\u5de6\\u8111\\u5c04\\u624b\\uff0b\\u53f3\\u8111\\u91d1\\u725bbr\\u6d12\\u8131\\u968f\\u6027\\uff0c\\u5185\\u655b\\u5b89\\u9759\"},{\"threshold\":\"D\",\"title\":\"\\u5de6\\u8111\\u53cc\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u6015\\u662f\\u4e2a\\u7cbe\\u5206\\u60a3\\u8005\\u5427\"},{\"threshold\":\"E\",\"title\":\"\\u5de6\\u8111\\u6469\\u7faf\\uff0b\\u53f3\\u8111\\u5de8\\u87f9br\\u6c89\\u7a33\\u53ef\\u9760\\uff0c\\u6e29\\u67d4\\u987e\\u5bb6\"},{\"threshold\":\"F\",\"title\":\"\\u5de6\\u8111\\u72ee\\u5b50\\uff0b\\u53f3\\u8111\\u53cc\\u9c7cbr\\u4e00\\u9762\\u9738\\u6c14\\u4e00\\u9762\\u67d4\\u60c5\"},{\"threshold\":\"G\",\"title\":\"\\u5de6\\u8111\\u5904\\u5973\\uff0b\\u53f3\\u8111\\u767d\\u7f8abr\\u8ffd\\u6c42\\u5b8c\\u7f8e\\uff0c\\u5374\\u603b\\u653e\\u98de\\u81ea\\u6211\"},{\"threshold\":\"H\",\"title\":\"\\u5de6\\u8111\\u5929\\u79e4\\uff0b\\u53f3\\u8111\\u6469\\u7fafbr\\u4eba\\u751f\\u5982\\u620f\\uff0c\\u5168\\u9760\\u6f14\\u6280\"},{\"threshold\":\"I\",\"title\":\"\\u5de6\\u8111\\u5929\\u874e\\uff0b\\u53f3\\u8111\\u5904\\u5973br\\u5200\\u5b50\\u5634\\u8c46\\u8150\\u5fc3\"},{\"threshold\":\"J\",\"title\":\"\\u5de6\\u8111\\u6c34\\u74f6\\uff0b\\u53f3\\u8111\\u53cc\\u5b50br\\u8111\\u6d1e\\u5927\\u51fa\\u5929\\u9645\"},{\"threshold\":\"K\",\"title\":\"\\u5de6\\u8111\\u53cc\\u9c7c\\uff0b\\u53f3\\u8111\\u72ee\\u5b50br\\u6e29\\u67d4\\u53c8\\u9738\\u6c14\"}]","attention":"{\"qrcode\":\"quce\\/qrcode\\/1513587611eREWB.png\",\"account\":1003}"}
	]
	var _num=0;
	var data;
	for(var i=0;i<option.length;i++){
		_num+=option[i];
	}
	if(_num<10){
		data=data1[0];
		
	}else if(_num<=12&&_num>10) {
		data=data1[1];
	
	}else if(_num<=14&&_num>12){
		data=data1[2];
	
	}else if(_num<=16&&_num>14){
		data=data1[3];
		
	}else if(_num<=18&&_num>16){
		data=data1[3];
		
	}else if(_num<=20&&_num>18){
		data=data1[5];
		
	}else if(_num==21){
		data=data1[6];
		
	}else if(_num<=23&&_num>21){
		data=data1[7];
		
	}else if(_num==24){
		data=data1[8];
		
	}else if(_num==25){
		data=data1[9];
		
	}else if(_num<_num>=26){
		data=data1[10];
	}
	if (data.status == 200) {
		var result = JSON.parse(data['content']);
		var attention = JSON.parse(data['attention']);
		result['attention'] = attention;
		if (result['img']) {
			result['img'] = "./" + result['img'];
		}

		callback(result, JSON.parse(data['total']), 3);
	}
	
}