var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Main_Tab = (function (_super) {
    __extends(UI_Rank_Main_Tab, _super);
    function UI_Rank_Main_Tab(index) {
        if (index === void 0) { index = 0; }
        var _this = _super.call(this) || this;
        _this.setTab(index);
        return _this;
    }
    Object.defineProperty(UI_Rank_Main_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/rank/UI_Rank_Main_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Rank_Main_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.friendsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.rankHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
    };
    UI_Rank_Main_Tab.prototype.onDestroy = function () {
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.friendsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.rankHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedHelpBtn, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Rank_Main_Tab.prototype.setTab = function (index) {
        var subTab = null;
        this.rankBtn.selected = index == 0;
        this.friendsBtn.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Rank_Rank_Tab) {
                    return;
                }
                subTab = new UI_Rank_Rank_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Rank_Friends_Tab) {
                    return;
                }
                subTab = new UI_Rank_Friends_Tab();
                break;
        }
        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = 24;
        this.currtenSubTab.y = 142;
    };
    UI_Rank_Main_Tab.prototype.clickedTitleBtn = function (e) {
        var btn = e.currentTarget;
        switch (btn) {
            case this.rankBtn:
                this.setTab(0);
                break;
            case this.friendsBtn:
                this.setTab(1);
                break;
        }
    };
    UI_Rank_Main_Tab.prototype.clickedHelpBtn = function (e) {
        var helpDialog = new LargeImageDialog("resource/res/ui/rank/rk_tab_help_info.png ");
        helpDialog.show();
    };
    return UI_Rank_Main_Tab;
}(UI_Base_Tab));
__reflect(UI_Rank_Main_Tab.prototype, "UI_Rank_Main_Tab");
//# sourceMappingURL=UI_Rank_Main_Tab.js.map