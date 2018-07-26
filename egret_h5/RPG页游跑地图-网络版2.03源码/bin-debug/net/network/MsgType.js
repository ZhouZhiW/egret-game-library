/**
 *
 * @author
 *
 */
var MsgType = (function () {
    function MsgType() {
    }
    var d = __define,c=MsgType,p=c.prototype;
    /** 状态消息*/
    MsgType.msgA = "0";
    /** 内容消息*/
    MsgType.msgB = "1";
    MsgType.msgC = "2";
    MsgType.msgD = "3";
    /** 状态 连接至服务器成功*/
    MsgType.msgA_a = "0";
    /** 状态 尚未建立连接*/
    MsgType.msgA_b = "1";
    /** 状态 已有连接，勿重复*/
    MsgType.msgA_c = "2";
    /** A星路径 */
    MsgType.msgB_a = "0";
    return MsgType;
})();
egret.registerClass(MsgType,'MsgType');
//# sourceMappingURL=MsgType.js.map