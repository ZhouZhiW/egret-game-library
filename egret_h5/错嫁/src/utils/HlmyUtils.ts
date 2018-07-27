/**
 *
 * @author 
 *
 */
class HlmyUtils {
    public constructor() {
    }
    public static HlmyOnpay(hobj: Object) {
        try {
            HLMYonPay(hobj);
        } catch (e) {
            //统计
            var matobj = { exception: "zhifu" };
            //            alert("支付错误！请重新开始游戏");
        }
    }
    public static HlmyFollow() {
        try {
            HLMYfollow();
        } catch (e) {
            //统计
            var matobj = { exception: "guanzhu" };
            //            alert("关注错误！请重新开始游戏");
        }
    }
    public static HlmyAdaptParams() {
        try {
            HLMYAdaptParams();
        } catch (e) {
        }
    }
    public static HlmyCheckFollow() {
        try {
            HLMYCheckFollow();
        } catch (e) {
            //统计
            var matobj = { exception: "guanzhu" };
            //            alert("查询关注状态错误！请重新开始游戏");
        }
    }
    public static HlmySetShareInfo(hobj: Object) {
        try {
            HLMYsetShareInfo(hobj);
        } catch (e) {
            //统计
            var matobj = { exception: "fenxiang" };
            //            alert("分享错误！请重新开始游戏");
        }
    }
    public static HlmysetBaseState(str: string) {
        try {
            HLMYsetBaseState(str);
        } catch (e) {
        }
    }
    public static HlmyInit(hobj: Object) {
        try {
            HLMYinit(hobj);
        } catch (e) {
            //统计
            var matobj = { exception: "chushihua" };
            //            alert("初始化错误！请重新开始游戏");
        }
    }
    public static HLMYCheckAd() {
        try {
            HLMYcheckAd();
        } catch (e) {
            //统计
            var matobj = { exception: "chaxunganggao" };
            //            alert("查询是否有广告");
        }
    }
    public static HLMYShowAd(id: number) {
        try {
            HLMYshowAd(id);
        } catch (e) {
            //统计
            var matobj = { exception: "HLMYshowAd" };
            //            alert("初始化错误！请重新开始游戏");
        }
    }
    public static HLMYPlayAd(str: string, id: number) {
        try {
            HLMYplayAd(str, id);
        } catch (e) {
            //统计
            var matobj = { exception: "HLMYPlayAd" };
            //            alert("播放广告错误");
        }
    }
    public static HlmyRoleInfo(obj: Object) {
        try {
            HLMYroleInfo(obj);
        } catch (e) {
            //统计
            var matobj = { exception: "RoleInfo" };
            //            alert("角色信息");
        }
    }
    public static HlmyExecute(obj: Object) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = sendMsg;时是给好友发消息，此时有obj{fgid，content}
        try {
            HLMYexecute(obj);
        } catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    }
    public static HlmyExecuteSendMsg(gid: string, con: string) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = sendMsg;时是给好友发消息，此时有obj{fgid，content}
        try {
            var obj: Object = {
                name: "sendMsg", fgid: gid, content: con, callback: function (result) {

                }
            };
            HLMYexecute(obj);
        } catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    }
    public static HlmyExecuteRecall(gid: string, con: string) {
        //只有str时快捷图标到桌面，str = addShortcut;
        //str = recall;召回
        try {
            var obj: Object = {
                name: "recall", recall: gid, content: con, callback: function (result) {

                }
            };
            HLMYexecute(obj);
        } catch (e) {
            //统计
            var matobj = { exception: "execute" };
        }
    }
    public static HlmyAuth(obj: Object) {
        //获取登录信息
        try {
            HLMYauth(obj);
        } catch (e) {
            //统计
            var matobj = { exception: "auth" };
        }
    }
     public static HlmyFace(obj: Object) {
        //人脸识别
        try {
            HLMYFace(obj);
            //     HLMY_FACE.init({
            // 	appKey:'',
            // 	gid:'',
            // 	hlmy_gw:''
            // })
        } catch (e) {
            //统计
            var matobj = { exception: "face" };
        }
    }
}
