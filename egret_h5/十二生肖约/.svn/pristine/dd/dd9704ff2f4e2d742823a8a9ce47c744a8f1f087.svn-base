var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Stardust_Main_Tab = (function (_super) {
    __extends(UI_Visit_Stardust_Main_Tab, _super);
    function UI_Visit_Stardust_Main_Tab() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Visit_Stardust_Main_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/visit/UI_Visit_Stardust_Main_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Visit_Stardust_Main_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        NetEventManager.inst.pushGemPedestalUp(0);
        this.starDust.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.pedestal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.starDust.selected = true;
        this.setTab(0);
        this.gemHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
    };
    UI_Visit_Stardust_Main_Tab.prototype.onDestroy = function () {
        this.starDust.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.pedestal.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.gemHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Visit_Stardust_Main_Tab.prototype.setTab = function (index) {
        switch (index) {
            case 0:
                if (this.starDustTab == null) {
                    this.starDustTab = new UI_Visit_Stardust_Tab();
                }
                if (this.pedestalTab != null && this.totalGroup.getChildIndex(this.pedestalTab) > -1) {
                    this.totalGroup.removeChild(this.pedestalTab);
                }
                this.totalGroup.addChild(this.starDustTab);
                break;
            case 1:
                if (this.pedestalTab == null) {
                    this.pedestalTab = new UI_Visit_Pedestal_Tab();
                }
                if (this.starDustTab != null && this.totalGroup.getChildIndex(this.starDustTab) > -1) {
                    this.totalGroup.removeChild(this.starDustTab);
                }
                this.totalGroup.addChild(this.pedestalTab);
                break;
        }
    };
    UI_Visit_Stardust_Main_Tab.prototype.clickedTitleBtn = function (e) {
        var btn = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.starDust:
                this.setToggleBtn(0);
                this.setTab(0);
                break;
            case this.pedestal:
                this.setToggleBtn(1);
                this.setTab(1);
                break;
        }
    };
    UI_Visit_Stardust_Main_Tab.prototype.setToggleBtn = function (index) {
        switch (index) {
            case 0:
                this.starDust.selected = true;
                this.pedestal.selected = false;
                break;
            case 1:
                this.starDust.selected = false;
                this.pedestal.selected = true;
                break;
        }
    };
    UI_Visit_Stardust_Main_Tab.prototype.clickedHelpBtn = function (e) {
        var helpDialog = new LargeImageDialog("resource/res/ui/gem/gs_tab_help_info.png ");
        helpDialog.show();
    };
    return UI_Visit_Stardust_Main_Tab;
}(UI_Base_Tab));
__reflect(UI_Visit_Stardust_Main_Tab.prototype, "UI_Visit_Stardust_Main_Tab");
//# sourceMappingURL=UI_Visit_Stardust_Main_Tab.js.map