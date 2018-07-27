var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Mail_Item = (function (_super) {
    __extends(UI_Mail_Item, _super);
    function UI_Mail_Item() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = "resource/skins/ui/mail/UI_Mail_ItemSkin.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Mail_Item.prototype.onCreate = function () {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickedBtn, this);
        this.buyBtn.setText("购买");
        this.buyBtn.setTextSize(16);
        this.buyBtn.setIconSize(18);
        this.buyBtn.setIcon(0);
    };
    UI_Mail_Item.prototype.onDestroy = function () {
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickedBtn, this);
    };
    UI_Mail_Item.prototype.onclickedBtn = function (e) {
        if (!this.itemData.canShop) {
            var d = new NTextDialog();
            d.setContent(this.itemData.errorDescription);
            d.show();
            return;
        }
        if (DataManager.inst.asset.diamond < this.itemData.cost) {
            var d = new PayDialog();
            d.setTipDiamond(this.itemData.cost);
            d.show();
        }
        else {
            var d = new DiamondDialog();
            d.setDiamond(this.itemData.cost);
            d.setClickListener(this.pushNet, this);
            d.show();
        }
    };
    UI_Mail_Item.prototype.pushNet = function () {
        NetEventManager.inst.pushBuy(this.itemData.index);
    };
    UI_Mail_Item.prototype.dataChanged = function () {
        this.itemData = this.data;
        this.buyBtn.setValue(this.itemData.cost);
        this.mailDescribe.text = this.itemData.description;
        this.maiIcon.source = this.getIcon(this.itemData.index);
    };
    UI_Mail_Item.prototype.getIcon = function (index) {
        var path;
        switch (index) {
            case 1:
                path = "resource/res/itemicon/mall/item_icon_mall_gold.png";
                break;
            case 2:
                path = "resource/res/itemicon/mall/item_icon_mall_firstgem.png";
                break;
            case 3:
                path = "resource/res/itemicon/mall/item_icon_mall_thirdgem.png";
                break;
            case 4:
                path = "resource/res/itemicon/mall/item_icon_mall_thirdgem10.png";
                break;
            case 5:
                path = "resource/res/itemicon/mall/item_icon_mall_ess.png";
                break;
            case 6:
                path = "resource/res/itemicon/mall/item_icon_mall_ess10.png";
                break;
            case 7:
                path = "resource/res/itemicon/mall/item_icon_mall_frg.png";
                break;
            case 8:
                path = "resource/res/itemicon/mall/item_icon_mall_frg10.png";
                break;
            case 9:
                path = "resource/res/itemicon/mall/item_icon_mall_equipnomal.png";
                break;
            case 10:
                path = "resource/res/itemicon/mall/item_icon_mall_equipLux.png";
                break;
        }
        return path;
    };
    return UI_Mail_Item;
}(eui.ItemRenderer));
__reflect(UI_Mail_Item.prototype, "UI_Mail_Item");
//# sourceMappingURL=UI_Mail_Item.js.map