var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_Main_Tab = (function (_super) {
    __extends(UI_Gem_Main_Tab, _super);
    function UI_Gem_Main_Tab() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Gem_Main_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/gem/UI_Gem_Main_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Gem_Main_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.subBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.subBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.titleHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        this.setTab(0);
    };
    UI_Gem_Main_Tab.prototype.onDestroy = function () {
        this.subBtn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.subBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.titleHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Gem_Main_Tab.prototype.setTab = function (index) {
        var subTab = null;
        this.subBtn1.selected = index == 0;
        this.subBtn2.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Gem_Tab) {
                    return;
                }
                subTab = new UI_Gem_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Gem_Pedestal_Tab) {
                    return;
                }
                subTab = new UI_Gem_Pedestal_Tab();
                break;
        }
        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = this.subTabArea.x;
        this.currtenSubTab.y = this.subTabArea.y;
    };
    UI_Gem_Main_Tab.prototype.clickedTitleBtn = function (e) {
        var btn = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.subBtn1:
                this.setTab(0);
                break;
            case this.subBtn2:
                this.setTab(1);
                break;
        }
    };
    UI_Gem_Main_Tab.prototype.clickedHelpBtn = function (e) {
        var helpDialog = new LargeImageDialog("resource/res/ui/gem/gs_tab_help_info.png ");
        helpDialog.setScroller(true);
        helpDialog.show();
    };
    return UI_Gem_Main_Tab;
}(UI_Base_Tab));
__reflect(UI_Gem_Main_Tab.prototype, "UI_Gem_Main_Tab");
//# sourceMappingURL=UI_Gem_Main_Tab.js.map