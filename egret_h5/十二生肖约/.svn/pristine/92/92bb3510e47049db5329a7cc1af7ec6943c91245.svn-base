var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Online_Item = (function (_super) {
    __extends(UI_Online_Item, _super);
    function UI_Online_Item() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = "resource/skins/ui/activity/online/UI_Online_ItemSkin.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Online_Item.prototype.onCreate = function () {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
        this.itemBtn.setTextSize(22);
        this.itemBtn.setText("领取");
    };
    UI_Online_Item.prototype.onDestroy = function () {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Online_Item.prototype.dataChanged = function () {
        this.itemData = this.data;
        this.caption.text = this.itemData.description;
        this.index = this.itemData.index;
        this.rewardsGroup.removeChildren();
        for (var i = 0; i < this.itemData.rewards.length; i++) {
            var reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }
        if (this.itemData.state == 0 && this.timeTx.visible) {
            this.timeTx.visible = true;
            this.itemBtn.visible = false;
            this.timeTx.text = Utils.formatLongTime(this.itemData.time - this.itemData.sumOnlineTime);
        }
        if (this.itemData.state == 1) {
            this.timeTx.visible = false;
            this.itemBtn.visible = true;
            this.itemBtn.enabled = true;
        }
        if (this.itemData.state == 2) {
            this.timeTx.visible = false;
            this.itemBtn.visible = true;
            this.itemBtn.setText("已领取");
            this.itemBtn.enabled = false;
        }
    };
    UI_Online_Item.prototype.clickedBtn = function (e) {
        NetEventManager.inst.pushOnline(16, this.index);
    };
    UI_Online_Item.prototype.timerEvent = function () {
        if (this.timeTx.visible) {
            var offsetTime = this.itemData.time - (this.itemData.timeCount + this.itemData.sumOnlineTime);
            if (offsetTime < 0) {
                this.timeTx.visible = false;
                NetEventManager.inst.pushOnline(16, -1);
                return;
            }
            this.timeTx.text = Utils.formatLongTime(offsetTime);
        }
    };
    return UI_Online_Item;
}(eui.ItemRenderer));
__reflect(UI_Online_Item.prototype, "UI_Online_Item");
//# sourceMappingURL=UI_Online_Item.js.map