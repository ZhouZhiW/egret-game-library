var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Invitation_item = (function (_super) {
    __extends(UI_Invitation_item, _super);
    function UI_Invitation_item() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = "resource/skins/ui/activity/invitation/UI_Invitation_itemSkin.exml";
        _this.itemBtn.setTextSize(22);
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Invitation_item.prototype.onCreate = function () {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Invitation_item.prototype.onDestroy = function () {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Invitation_item.prototype.clickedBtn = function (e) {
        NetEventManager.inst.pushInvitation(14, this.index);
    };
    UI_Invitation_item.prototype.dataChanged = function () {
        this.itemData = this.data;
        this.index = this.itemData.index;
        this.caption.text = this.itemData.description;
        this.setState(this.itemData.state);
        this.rewardsGroup.removeChildren();
        for (var i = 0; i < this.itemData.rewards.length; i++) {
            var reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }
    };
    UI_Invitation_item.prototype.setState = function (state) {
        switch (state) {
            case 0:
                if (this.itemData.restTime > 0) {
                    this.timeTx.visible = true;
                    this.timeTx.text = Utils.formatLongTime(this.itemData.restTime);
                }
                else {
                    this.timeTx.visible = false;
                }
                this.itemBtn.visible = false;
                this.progress.visible = true;
                this.progress.text = this.itemData.currStatus + "/" + this.itemData.target;
                break;
            case 1:
                this.progress.visible = false;
                this.itemBtn.visible = true;
                this.itemBtn.setText("领取");
                break;
            case 2:
                this.progress.visible = false;
                this.itemBtn.visible = true;
                this.itemBtn.setText("已领取");
                break;
        }
        this.itemBtn.enabled = this.itemData.state == 1;
    };
    UI_Invitation_item.prototype.timerEvent = function () {
        if (this.timeTx.visible) {
            var offsetTime = this.itemData.restTime - this.itemData.timeCount;
            if (offsetTime < 0) {
                this.timeTx.visible = false;
                NetEventManager.inst.pushInvitation(14, -1);
                return;
            }
            this.timeTx.text = Utils.formatLongTime(offsetTime);
        }
    };
    return UI_Invitation_item;
}(eui.ItemRenderer));
__reflect(UI_Invitation_item.prototype, "UI_Invitation_item");
//# sourceMappingURL=UI_Invitation_item.js.map