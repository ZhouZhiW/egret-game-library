var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_TopIp_Image = (function (_super) {
    __extends(UI_TopIp_Image, _super);
    function UI_TopIp_Image() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_TopIp_Image.prototype.onCreate = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtnOwn, this);
    };
    UI_TopIp_Image.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtnOwn, this);
    };
    UI_TopIp_Image.prototype.clickedBtnOwn = function (e) {
        NetEventManager.inst.pushPay(this.data.productId);
    };
    UI_TopIp_Image.prototype.setOwnData = function (data) {
        if (data == null) {
            return;
        }
        this.data = data;
        this.source = "resource/res/ui/activity/topUp/topUp_rmb_" + this.data.productId + ".png";
    };
    return UI_TopIp_Image;
}(eui.Image));
__reflect(UI_TopIp_Image.prototype, "UI_TopIp_Image");
//# sourceMappingURL=UI_TopUp_Image.js.map