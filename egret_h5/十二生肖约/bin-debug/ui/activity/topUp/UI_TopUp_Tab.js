var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_TopUp_Tab = (function (_super) {
    __extends(UI_TopUp_Tab, _super);
    function UI_TopUp_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushTopUp();
        return _this;
    }
    UI_TopUp_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.topUp.addDataListener(this.refreshTopUp, this);
    };
    UI_TopUp_Tab.prototype.onDestroy = function () {
        DataManager.inst.topUp.removeDataListener(this.refreshTopUp, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_TopUp_Tab.prototype.clickedProduct = function (e) {
        var image = e.currentTarget;
        NetEventManager.inst.pushPay(this.panelGroup.getChildIndex(image));
    };
    UI_TopUp_Tab.prototype.refreshTopUp = function (e) {
        var data = e.data;
        this.panelGroup.removeChildren();
        for (var i = 0; i < data.products.length; i++) {
            // const child = new UI_TopUp_ChildPanel(data.products[i].productId);
            // this.panelGroup.addChild(child);
            var product = new UI_TopIp_Image();
            product.setOwnData(data.products[i]);
            this.panelGroup.addChild(product);
        }
    };
    Object.defineProperty(UI_TopUp_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/topUp/UI_TopUp_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_TopUp_Tab;
}(UI_Base_Activity));
__reflect(UI_TopUp_Tab.prototype, "UI_TopUp_Tab");
//# sourceMappingURL=UI_TopUp_Tab.js.map