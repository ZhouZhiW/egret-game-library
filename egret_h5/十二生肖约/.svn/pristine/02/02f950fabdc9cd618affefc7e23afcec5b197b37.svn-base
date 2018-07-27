var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_ActivityGroup = (function (_super) {
    __extends(UI_Home_ActivityGroup, _super);
    function UI_Home_ActivityGroup() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Home_ActivityGroup.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_ActivityGroupSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_ActivityGroup.prototype.onCreate = function () {
        DataManager.inst.activitys.addDataListener(this.refreshData, this);
    };
    UI_Home_ActivityGroup.prototype.onDestroy = function () {
        DataManager.inst.activitys.removeDataListener(this.refreshData, this);
    };
    UI_Home_ActivityGroup.prototype.refreshData = function (e) {
        var data = e.data;
        this.activityGroup.removeChildren();
        if (data == null || data.activityInfos == null || data.activityInfos.length < 1) {
            return;
        }
        for (var i = 0; i < data.activityInfos.length; i++) {
            var activity = this.makeActivity(data.activityInfos[i]);
            if (activity != null) {
                this.activityGroup.addChild(activity);
            }
        }
    };
    UI_Home_ActivityGroup.prototype.makeActivity = function (data) {
        if (data.status != 0) {
            return new ActivityButton(data.index);
        }
        else {
            return null;
        }
    };
    return UI_Home_ActivityGroup;
}(BaseComponent));
__reflect(UI_Home_ActivityGroup.prototype, "UI_Home_ActivityGroup");
var ActivityButton = (function (_super) {
    __extends(ActivityButton, _super);
    function ActivityButton(id) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.id = id;
        _this.icon.source = "resource/res/ui/home/home_activity_" + id + ".png";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick, _this);
        return _this;
    }
    Object.defineProperty(ActivityButton.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_ActivityButtonSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    ActivityButton.prototype.onCreate = function () {
        UILayer.inst.home.tips.addTip(this);
    };
    ActivityButton.prototype.onDestroy = function () {
        UILayer.inst.home.tips.removeTip(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    ActivityButton.prototype.onclick = function () {
        UILayer.inst.home.showActivity(this.id);
    };
    ActivityButton.prototype.getTipIndex = function () {
        return this.id;
    };
    ActivityButton.prototype.onTipStatus = function (status) {
        if (status == 0) {
            this.tip.visible = false;
        }
        else {
            this.tip.visible = true;
        }
    };
    return ActivityButton;
}(BaseComponent));
__reflect(ActivityButton.prototype, "ActivityButton", ["ITipListener"]);
//# sourceMappingURL=UI_Home_ActivityGroup.js.map