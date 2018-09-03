/* 结果统计页 公用js */
var gameresult;
var gid = gameData['id'];
var resultdata = [];
var num = 0;
var maxwidth = 0;
var resultflag = true;
var listindex = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var tplid = gameData['tpl_id'];

function initTjdata(result,maxwidthflag){
	appendHtml();
	for (var i = 0; i < gameresult.length; i++) {
		resultdata[i] = [];
		resultdata[i]['level'] = gameresult[i]['threshold'];
		resultdata[i]['title'] = gameresult[i]['title'];
		resultdata[i]['num'] = 1;
	};
	ajaxGet( url+gid , function(data){
		var tjdata = eval(data);
		for (var i = 0; i < resultdata.length; i++) {
			var thisindex = resultdata[i]['level'];
			var flag = true;
			if(tjdata){
				for (var j = 0; j < tjdata.length; j++) {	
					if( tjdata[j]['level'] == thisindex || tjdata[j]['level'] == listindex[i]){
						resultdata[i]['num'] = +tjdata[j]['num'];
						flag = false;
					}
				}
			}else{
				flag = false;
			}
			if(flag){
				resultdata[i]['num'] = 1;
			}
			num += resultdata[i]['num'];
		}
		for (var i = 0; i < resultdata.length; i++) {
			resultdata[i]['percent'] = resultdata[i]['num']/num*100;
			if(resultdata[i]['percent'] < 1) resultdata[i]['percent'] = 1;
			if(maxwidth < resultdata[i]['percent'] ){
				maxwidth = Math.round(resultdata[i]['percent']);
			}
		}
		setTimeout(function() {
			setWidth(result,maxwidthflag);
		}, 520);
	});
}
function appendHtml(){
	var htmltext = '';
	for (var i = 0; i < gameresult.length; i++) {
		htmltext += '<div id="tj-result'+listindex[i]+'" class="tj-result"><p class="tj-tesult-title">'+listindex[i]+'.'+gameresult[i]['title']+'</p><p class="tj-percent"> <span id="tj-per'+listindex[i]+'" class="tj-per"></span><span id="tj-num'+listindex[i]+'" class="tj-num">0%</span></p></div>';
	};
	document.getElementById('tj-played').innerHTML = (gameData['view']*3/1000).toFixed(2);
	document.getElementById('tj-box').innerHTML = htmltext;
}
/*appendHtml();*/
function setWidth(result,maxwidthflag){
	var docw = window.innerWidth > 640 ? 640 : window.innerWidth;
	for (var i = 0; i < resultdata.length; i++) {
		addClass(document.getElementById('tj-per'+listindex[i]),'peranimation');
		var width = Math.round(resultdata[i]['percent'])/maxwidth * docw * 0.6;
		if(maxwidthflag){
			width = Math.round(resultdata[i]['percent'])/maxwidth * docw * 0.8;
		}
		document.getElementById('tj-per'+listindex[i]).style.width = width+'px';
		document.getElementById('tj-num'+listindex[i]).innerHTML = Math.round(resultdata[i]['percent'])+"%";

		if( resultdata[i]['level'] == result['threshold'] ){
			var tjtitle = document.getElementById('tj-num'+listindex[i]).innerHTML;
			document.getElementById('tj-title').innerHTML = tjtitle;
			addClass(document.getElementById('tj-result'+listindex[i]),'user-result');
		}
	};
}
