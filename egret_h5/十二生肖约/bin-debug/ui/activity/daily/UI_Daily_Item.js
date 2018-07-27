var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Daily_Item = (function (_super) {
    __extends(UI_Daily_Item, _super);
    function UI_Daily_Item() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = "resource/skins/ui/activity/daily/UI_Daily_ItemSkin.exml";
        _this.itemBtn.setTextSize(22);
        _this.itemBtn.setText("领取");
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Daily_Item.prototype.onCreate = function () {
        this.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Daily_Item.prototype.onDestroy = function () {
        this.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedBtn, this);
    };
    UI_Daily_Item.prototype.dataChanged = function () {
        this.itemData = this.data;
        this.rest.text == "";
        this.rest.visible = false;
        // console.log(this.itemData.description + "index: " + this.itemData.index);
        if (this.itemData.index == 1) {
            this.rest.visible = !(this.itemData.restDay == 0);
            this.rest.text = "剩余" + this.itemData.restDay + "天";
        }
        this.rewardsGroup.removeChildren();
        if (this.itemData.state == 2) {
            this.itemBtn.setText("已领取");
        }
        else {
            this.itemBtn.setText("领取");
        }
        this.caption.text = this.itemData.description;
        this.index = this.itemData.index;
        this.itemBtn.enabled = this.itemData.state == 1;
        for (var i = 0; i < this.itemData.rewards.length; i++) {
            var reward = new IconImageMaterial();
            reward.setMaterialData(this.itemData.rewards[i]);
            this.rewardsGroup.addChild(reward);
        }
    };
    //0:终生卡 1:月卡 2：充值 3：英雄 4：星尘 5：领取 6：不能领取
    UI_Daily_Item.prototype.setBtn = function (type) {
        if (type == 5 || type == 6) {
            this.itemBtn.setText("领取");
            this.itemBtn.enabled = type == 5;
        }
        else {
            this.itemBtn.setText("前往");
        }
    };
    UI_Daily_Item.prototype.clickedBtn = function (e) {
        NetEventManager.inst.pushDaily(15, this.index);
        // switch (this.btnType) {
        //     case 0:
        //         UILayer.inst.home.showActivity(12);
        //         break;
        //     case 1:
        //         UILayer.inst.home.showActivity(11);
        //         break;
        //     case 2:
        //         UILayer.inst.home.showActivity(13);
        //         break;
        //     case 3:
        //         UILayer.inst.home.showTab(0);
        //         UILayer.inst.home.closeActivity();
        //         break;
        //     case 4:
        //         UILayer.inst.home.showTab(1);
        //         UILayer.inst.home.closeActivity();
        //         break;
        //     case 7:
        //         UILayer.inst.home.showTab(4);
        //         UILayer.inst.home.closeActivity();
        //         break;
        // }
    };
    return UI_Daily_Item;
}(eui.ItemRenderer));
__reflect(UI_Daily_Item.prototype, "UI_Daily_Item");
//# sourceMappingURL=UI_Daily_Item.js.map