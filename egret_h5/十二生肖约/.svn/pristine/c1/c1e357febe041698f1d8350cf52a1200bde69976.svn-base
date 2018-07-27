var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Invitation_Tab = (function (_super) {
    __extends(UI_Invitation_Tab, _super);
    function UI_Invitation_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushInvitation(14, -1);
        return _this;
    }
    UI_Invitation_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.invitation.addDataListener(this.refreshInvitation, this);
        this.invitationBtn.setTextSize(23);
        this.invitationBtn.setText("马上邀请");
        this.invitationBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Invitation_Tab.prototype.onDestroy = function () {
        DataManager.inst.invitation.removeDataListener(this.refreshInvitation, this);
        this.invitationBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Invitation_Tab.prototype.refreshInvitation = function (e) {
        var data = e.data;
        this.invitationList.setData(data.invitationsArr);
    };
    UI_Invitation_Tab.prototype.clickedBtn = function (e) {
        setShareInfo("lianggehaoshuai", true, ["必胜，啦啦啦啦", "呦呦，嘿嘿嘿"]);
    };
    Object.defineProperty(UI_Invitation_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/invitation/UI_Invitation_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Invitation_Tab;
}(UI_Base_Activity));
__reflect(UI_Invitation_Tab.prototype, "UI_Invitation_Tab");
//# sourceMappingURL=UI_Invitation_Tab.js.map