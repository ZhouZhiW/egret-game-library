var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Inventory_Goods = (function (_super) {
    __extends(UI_Inventory_Goods, _super);
    function UI_Inventory_Goods(data) {
        var _this = _super.call(this, data) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    UI_Inventory_Goods.prototype.onCreate = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
    };
    UI_Inventory_Goods.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
    };
    UI_Inventory_Goods.prototype.onClickIcon = function (e) {
        // if (this.getMaterialData().type == DataType_Material.Unread || this.getMaterialData().type == DataType_Material.Unread) {
        //     this.getMaterialData().type;
        //     const d = new UI_Backpack_MailDialog(this.gridData.mailData.emailId);
        //     d.setData(this.gridData.mailData);
        //     d.show();
        // }
        // if (this.getMaterialData().type == DataType_Material.Equip_Luxury_Down || this.getMaterialData().type == DataType_Material.Equip_Luxury_Up
        //     || this.getMaterialData().type == DataType_Material.Equip_Normal_Down || this.getMaterialData().type == DataType_Material.Equip_Normal_Up) {
        //     const d = new UI_Backpack_EquipDialog(this.gridData.equipData.clotheId, this.gridData.equipData.btnStatus);
        //     d.setData(this.gridData.equipData);
        //     d.show();
        // }
    };
    UI_Inventory_Goods.prototype.test = function () {
    };
    return UI_Inventory_Goods;
}(ImageMaterial));
__reflect(UI_Inventory_Goods.prototype, "UI_Inventory_Goods");
//# sourceMappingURL=UI_Inventory_Goods.js.map