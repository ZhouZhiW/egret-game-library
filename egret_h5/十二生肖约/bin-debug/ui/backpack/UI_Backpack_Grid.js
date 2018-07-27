var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Backpack_Grid = (function (_super) {
    __extends(UI_Backpack_Grid, _super);
    function UI_Backpack_Grid() {
        return _super.call(this) || this;
    }
    UI_Backpack_Grid.prototype.onCreate = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    };
    UI_Backpack_Grid.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
    };
    UI_Backpack_Grid.prototype.onClicked = function (e) {
        if (this.getMaterialData().getType() == DataType_Material.Mail) {
            var d = new UI_Backpack_MailDialog(this.getMaterialData().getMailId());
            d.setData(this.getMaterialData());
            d.show();
        }
        if (this.getMaterialData().getType() == DataType_Material.Equip) {
            var d = new UI_Backpack_EquipDialog(this.getMaterialData().getClotheId(), this.getMaterialData().getEquipState());
            d.setData(this.getMaterialData());
            d.show();
        }
    };
    return UI_Backpack_Grid;
}(BaseMaterial));
__reflect(UI_Backpack_Grid.prototype, "UI_Backpack_Grid");
//# sourceMappingURL=UI_Backpack_Grid.js.map