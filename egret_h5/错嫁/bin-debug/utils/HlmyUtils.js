var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var HlmyUtils = (function () {
    function HlmyUtils() {
    }
    HlmyUtils.HlmyOnpay = function (hobj) {
        try {
            HLMYonPay(hobj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "zhifu" };
            //            alert("支付错误！请重新开始游戏");
        }
    };
    HlmyUtils.HlmyFollow = function () {
        try {
            HLMYfollow();
        }
        catch (e) {
            //统计
            var matobj = { exception: "guanzhu" };
            //            alert("关注错误！请重新开始游戏");
        }
    };
    HlmyUtils.HlmyAdaptParams = function () {
        try {
            HLMYAdaptParams();
        }
        catch (e) {
        }
    };
    HlmyUtils.HlmyCheckFollow = function () {
        try {
            HLMYCheckFollow();
        }
        catch (e) {
            //统计
            var matobj = { exception: "guanzhu" };
            //            alert("查询关注状态错误！请重新开始游戏");
        }
    };
    HlmyUtils.HlmySetShareInfo = function (hobj) {
        try {
            HLMYsetShareInfo(hobj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "fenxiang" };
            //            alert("分享错误！请重新开始游戏");
        }
    };
    HlmyUtils.HlmysetBaseState = function (str) {
        try {
            HLMYsetBaseState(str);
        }
        catch (e) {
        }
    };
    HlmyUtils.HlmyInit = function (hobj) {
        try {
            HLMYinit(hobj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "chushihua" };
            //            alert("初始化错误！请重新开始游戏");
        }
    };
    HlmyUtils.HLMYCheckAd = function () {
        try {
            HLMYcheckAd();
        }
        catch (e) {
            //统计
            var matobj = { exception: "chaxunganggao" };
            //            alert("查询是否有广告");
        }
    };
    HlmyUtils.HLMYShowAd = function (id) {
        try {
            HLMYshowAd(id);
        }
        catch (e) {
            //统计
            var matobj = { exception: "HLMYshowAd" };
            //            alert("初始化错误！请重新开始游戏");
        }
    };
    HlmyUtils.HLMYPlayAd = function (str, id) {
        try {
            HLMYplayAd(str, id);
        }
        catch (e) {
            //统计
            var matobj = { exception: "HLMYPlayAd" };
            //            alert("播放广告错误");
        }
    };
    HlmyUtils.HlmyRoleInfo = function (obj) {
        try {
            HLMYroleInfo(obj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "RoleInfo" };
            //            alert("角色信息");
        }
    };
    HlmyUtils.HlmyExecute = function (obj) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = sendMsg;时是给好友发消息，此时有obj{fgid，content}
        try {
            HLMYexecute(obj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    };
    HlmyUtils.HlmyExecuteSendMsg = function (gid, con) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = sendMsg;时是给好友发消息，此时有obj{fgid，content}
        try {
            var obj = {
                name: "sendMsg", fgid: gid, content: con, callback: function (result) {
                }
            };
            HLMYexecute(obj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    };
    HlmyUtils.HlmyExecuteRecall = function (gid, con) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = recall;召回
        try {
            var obj = {
                name: "recall", recall: gid, content: con, callback: function (result) {
                }
            };
            HLMYexecute(obj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    };
    HlmyUtils.HlmyAuth = function (obj) {
        //获取登录信息
        try {
            HLMYauth(obj);
        }
        catch (e) {
            //统计
            var matobj = { exception: "auth" };
        }
    };
    HlmyUtils.HlmyFace = function (obj) {
        //人脸识别
        try {
            HLMYFace(obj);
            //     HLMY_FACE.init({
            // 	appKey:'',
            // 	gid:'',
            // 	hlmy_gw:''
            // })
        }
        catch (e) {
            //统计
            var matobj = { exception: "face" };
        }
    };
    return HlmyUtils;
}());
__reflect(HlmyUtils.prototype, "HlmyUtils");
//# sourceMappingURL=HlmyUtils.js.map