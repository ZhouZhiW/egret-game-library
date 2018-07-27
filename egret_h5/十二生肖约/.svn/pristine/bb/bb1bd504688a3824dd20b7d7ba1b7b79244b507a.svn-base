var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Mission_Main_Tab = (function (_super) {
    __extends(UI_Mission_Main_Tab, _super);
    function UI_Mission_Main_Tab() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Mission_Main_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/mission/UI_Mission_Main_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Mission_Main_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.missionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.achievedBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.missionBtn.selected = true;
        this.setTab(0);
    };
    UI_Mission_Main_Tab.prototype.onDestroy = function () {
        this.missionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        this.achievedBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Mission_Main_Tab.prototype.setTab = function (index) {
        var subTab = null;
        this.missionBtn.selected = index == 0;
        this.achievedBtn.selected = index == 1;
        switch (index) {
            case 0:
                if (this.currtenSubTab instanceof UI_Mission_Tab) {
                    return;
                }
                subTab = new UI_Mission_Tab();
                break;
            case 1:
                if (this.currtenSubTab instanceof UI_Achieved_Tab) {
                    return;
                }
                subTab = new UI_Achieved_Tab();
                break;
        }
        if (this.currtenSubTab != null) {
            this.removeChild(this.currtenSubTab);
        }
        this.currtenSubTab = subTab;
        this.addChild(this.currtenSubTab);
        this.currtenSubTab.x = 28;
        this.currtenSubTab.y = 152;
    };
    UI_Mission_Main_Tab.prototype.clickedTitleBtn = function (e) {
        var btn = e.currentTarget;
        if (!btn.selected) {
            btn.selected = true;
            return;
        }
        switch (btn) {
            case this.missionBtn:
                this.setTab(0);
                break;
            case this.achievedBtn:
                this.setTab(1);
                break;
        }
    };
    UI_Mission_Main_Tab.prototype.setToggleBtn = function (index) {
        switch (index) {
            case 0:
                this.missionBtn.selected = true;
                this.achievedBtn.selected = false;
                break;
            case 1:
                this.missionBtn.selected = false;
                this.achievedBtn.selected = true;
                break;
        }
    };
    return UI_Mission_Main_Tab;
}(UI_Base_Tab));
__reflect(UI_Mission_Main_Tab.prototype, "UI_Mission_Main_Tab");
//# sourceMappingURL=UI_Mission_Main_Tab.js.map