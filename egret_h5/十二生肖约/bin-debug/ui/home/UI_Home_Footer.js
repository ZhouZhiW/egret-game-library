var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_Footer = (function (_super) {
    __extends(UI_Home_Footer, _super);
    function UI_Home_Footer() {
        return _super.call(this) || this;
    }
    UI_Home_Footer.prototype.onCreate = function () {
        for (var i = 0; i < this.tabGroup.numChildren; i++) {
            this.tabGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTab, this);
        }
    };
    UI_Home_Footer.prototype.onDestroy = function () {
        for (var i = 0; i < this.tabGroup.numChildren; i++) {
            this.tabGroup.getChildAt(i).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTab, this);
        }
    };
    UI_Home_Footer.prototype.clickTab = function (e) {
        var selectBtn = e.currentTarget;
        var index = this.tabGroup.getChildIndex(selectBtn);
        if (selectBtn.selected) {
            UILayer.inst.home.showTab(index);
        }
        else {
            UILayer.inst.home.closeTab();
        }
    };
    UI_Home_Footer.prototype.showTab = function (tabIndex) {
        this.tabGroup.getChildAt(tabIndex).selected = true;
        ;
    };
    UI_Home_Footer.prototype.closeTab = function () {
        for (var i = 0; i < this.tabGroup.numChildren; i++) {
            this.tabGroup.getChildAt(i).selected = false;
        }
    };
    return UI_Home_Footer;
}(BaseComponent));
__reflect(UI_Home_Footer.prototype, "UI_Home_Footer");
var FooterButton = (function (_super) {
    __extends(FooterButton, _super);
    function FooterButton() {
        var _this = _super.call(this) || this;
        _this.width = 78;
        _this.height = 86;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    FooterButton.prototype.onCreate = function () {
        UILayer.inst.home.tips.addTip(this);
    };
    FooterButton.prototype.onDestroy = function () {
        UILayer.inst.home.tips.removeTip(this);
    };
    FooterButton.prototype.getTipIndex = function () {
        return Number(this.name);
    };
    FooterButton.prototype.onTipStatus = function (status) {
        if (status == 0) {
            if (this.tip != null) {
                this.removeChild(this.tip);
                this.tip = null;
            }
        }
        else {
            if (this.tip == null) {
                this.tip = Utils.getTipIcon();
                this.tip.x = this.width - 4;
                this.tip.y = 4;
                this.addChild(this.tip);
            }
        }
    };
    return FooterButton;
}(eui.ToggleButton));
__reflect(FooterButton.prototype, "FooterButton", ["ITipListener"]);
//# sourceMappingURL=UI_Home_Footer.js.map