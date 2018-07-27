function onShareTimeline() {
	  var share = new JsCallBackEvent.CallBack();
    share.shareTimelineCallBack();
}
function onShareFriend() {
	  var share = new JsCallBackEvent.CallBack();
    share.shareFriendCallBack();
}
function HLMYonPay(obj){
	 window.HLMY_SDK.pay(obj);
}
function HLMYfollow(){
	window.HLMY_SDK.follow();
}
function HLMYsetShareInfo(obj){
	window.HLMY_SDK.setShareInfo(obj);
}
function HLMYsetBaseState(str){
	window.HLMY_SDK.setBaseState(str);
}
function HLMYinit(obj){
	window.HLMY_SDK.init(obj);
}
function HLMYCheckFollow(){
	window.HLMY_SDK.checkFollow(function(obj){
			 var share = new JsCallBackEvent.CallBack();
       share.followCallBack(obj);
		});
}
function HLMYAdaptParams(){
	window.HLMY_SDK.adaptParams(function(obj){
			 var share = new JsCallBackEvent.CallBack();
       share.adaptParamsCallBack(obj);
		});
}
function HLMYcheckAd(){
		window.HLMY_SDK.checkAd(function(resData){
	     var share = new JsCallBackEvent.CallBack();
       share.checkAdCallBack(resData);
   });
}
function HLMYshowAd(cpid){
	   window.HLMY_SDK.showAd({
	   	cpPosId:cpid
	   	});
}
function HLMYplayAd(cpparam,cpid){
	window.HLMY_SDK.playAd({
	    cpParam:cpparam,
	    cpPosId:cpid,
	    callback:function(resData){
		     var share = new JsCallBackEvent.CallBack();
         share.playAdCallBack(resData);
	      }
    });
}
function HLMYroleInfo(obj){
	window.HLMY_SDK.roleInfo(obj);
}
function HLMYexecute(obj){
	window.HLMY_SDK.execute(obj);
}
function HLMYauth(obj){
	window.HLMY_SDK.auth(obj);
}
function HLMYFace(obj){
	window.HLMY_FACE.init(obj);
}
