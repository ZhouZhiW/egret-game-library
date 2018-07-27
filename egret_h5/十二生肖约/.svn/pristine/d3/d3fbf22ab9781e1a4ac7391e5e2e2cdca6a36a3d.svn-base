var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Mail_Tab = (function (_super) {
    __extends(UI_Mail_Tab, _super);
    function UI_Mail_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushMAIL();
        return _this;
    }
    Object.defineProperty(UI_Mail_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/mail/UI_Mail_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Mail_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.topUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickedBtn, this);
        this.topUp.setStyle(2);
        this.topUp.setTextSize(16);
        this.topUp.setText("充值");
        DataManager.inst.mail.addDataListener(this.refreshMail, this);
        DataManager.inst.asset.addDataListener(this.refreshAsset, this);
    };
    UI_Mail_Tab.prototype.onDestroy = function () {
        this.topUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickedBtn, this);
        DataManager.inst.mail.removeDataListener(this.refreshMail, this);
        DataManager.inst.asset.removeDataListener(this.refreshAsset, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Mail_Tab.prototype.refreshAsset = function (e) {
        var data = e.data;
        this.diamondNums.text = EasyNumber.easyNum(data.diamond);
    };
    UI_Mail_Tab.prototype.refreshMail = function (e) {
        var data = e.data;
        this.mailList.setData(data.shops);
    };
    UI_Mail_Tab.prototype.onClickedBtn = function (e) {
        UILayer.inst.home.showActivity(13);
    };
    return UI_Mail_Tab;
}(UI_Base_Tab));
__reflect(UI_Mail_Tab.prototype, "UI_Mail_Tab");
//# sourceMappingURL=UI_Mail_Tab.js.map