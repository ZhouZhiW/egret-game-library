var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_Main = (function (_super) {
    __extends(UI_Home_Main, _super);
    function UI_Home_Main() {
        var _this = _super.call(this) || this;
        _this.tipManager = new TipManager();
        return _this;
    }
    UI_Home_Main.prototype.onCreate = function () {
        var offline = DataManager.inst.offline;
        if (offline.offlineTime > 0) {
            new UI_Home_Offline_Dialog(offline).show();
        }
    };
    UI_Home_Main.prototype.onDestroy = function () {
    };
    Object.defineProperty(UI_Home_Main.prototype, "tips", {
        get: function () {
            return this.tipManager;
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_Main.prototype.showTab = function (tabIndex, subIndex) {
        if (subIndex === void 0) { subIndex = 0; }
        this.closeTab();
        switch (tabIndex) {
            case 0:
                this.currentTab = new UI_Up_Tab();
                break;
            case 1:
                this.currentTab = new UI_Gem_Main_Tab();
                break;
            case 2:
                this.currentTab = new UI_Backpack_Tab();
                break;
            case 3:
                this.currentTab = new UI_Mission_Main_Tab();
                break;
            case 4:
                this.currentTab = new UI_Rank_Main_Tab(subIndex);
                break;
            case 5:
                this.currentTab = new UI_Mail_Tab();
                break;
        }
        if (this.currentTab != null) {
            this.footer.showTab(tabIndex);
            this.addChild(this.currentTab);
            this.swapChildren(this.footer, this.currentTab);
        }
    };
    UI_Home_Main.prototype.closeTab = function () {
        if (this.currentTab != null) {
            if (this.currentTab.parent != null) {
                this.currentTab.parent.removeChild(this.currentTab);
            }
            this.currentTab = null;
        }
        this.footer.closeTab();
    };
    UI_Home_Main.prototype.showActivity = function (activityId) {
        this.closeActivity();
        switch (activityId) {
            case 10:
                this.currentActivity = new UI_FirstPayment_Tab(10);
                ;
                break;
            case 11:
                this.currentActivity = new UI_FirstPayment_Tab(11);
                break;
            case 12:
                this.currentActivity = new UI_FirstPayment_Tab(12);
                break;
            case 13:
                this.currentActivity = new UI_TopUp_Tab();
                break;
            case 14:
                this.currentActivity = new UI_Invitation_Tab();
                break;
            case 15:
                this.currentActivity = new UI_Daily_Tab();
                break;
            case 16:
                this.currentActivity = new UI_Online_Tab();
                break;
        }
        if (this.currentActivity != null) {
            this.addChild(this.currentActivity);
        }
    };
    UI_Home_Main.prototype.closeActivity = function () {
        if (this.currentActivity != null) {
            if (this.currentActivity.parent != null) {
                this.currentActivity.parent.removeChild(this.currentActivity);
            }
            this.currentActivity = null;
        }
    };
    Object.defineProperty(UI_Home_Main.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_MainSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Home_Main;
}(BaseComponent));
__reflect(UI_Home_Main.prototype, "UI_Home_Main");
//# sourceMappingURL=UI_Home_Main.js.map