var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * @author
 *
 */
var EventData = (function (_super) {
    __extends(EventData, _super);
    function EventData(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    EventData.DATA_TIME = "shareTimelineCallBack";
    EventData.DATA_FRIEND = "shareFriendCallBack";
    EventData.DATA_GAMEFOLLOW = "gamefollowCallBack";
    EventData.DATA_LISTFOLLOW = "listfollowCallBack";
    EventData.DATA_CLOSESAVEIMAGE = "closeimageCallBack";
    EventData.DATA_ADAPT_PARAMS = "adaptparamsCallBack";
    EventData.DATA_TENCENT_FRIENDLIST = "tencentFriendListCallBack";
    EventData.DATA_SHOWAD = "showadCallBack";
    EventData.DATA_PLAYAD = "playadCallBack";
    EventData.DATA_ADDSHORTCUT = "addshortcutCallBack";
    EventData.DATA_XUANYAO = "xuanyaoCallBack";
    EventData.DATA_ONPAY_SUCCEED = "onpaysucceedCallBack";
    EventData.DATA_AUTH_SUCCEED = "authsucceedCallBack";
    EventData.DATA_AUTH_FAILED = "authfailedCallBack";
    EventData.DATA_QQBACKGROUND = "qqbackgroundCallBack";
    EventData.DATA_CHECK_TOKEN_FAILED = "checktokenCallBack";
    return EventData;
}(egret.Event));
__reflect(EventData.prototype, "EventData");
//# sourceMappingURL=EventData.js.map