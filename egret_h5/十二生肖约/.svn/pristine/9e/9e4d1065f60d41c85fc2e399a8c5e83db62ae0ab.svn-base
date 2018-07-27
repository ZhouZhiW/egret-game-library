var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseMaterial = (function (_super) {
    __extends(BaseMaterial, _super);
    function BaseMaterial(data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this.setMaterialData(data);
        return _this;
    }
    BaseMaterial.prototype.setMaterialData = function (data) {
        this.data = data;
        if (data == null) {
            this.imageMaterial.source = "resource/res/itemicon/item_icon_null.png";
            return;
        }
        this.imageMaterial.source = this.data.getSource();
        this.count.text = "x" + EasyNumber.easyNum(data.getCounts());
        this.count.visible = data.getCounts() > 1;
    };
    BaseMaterial.prototype.getMaterialData = function () {
        return this.data;
    };
    Object.defineProperty(BaseMaterial.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/material/SubscriptMaterialSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return BaseMaterial;
}(BaseComponent));
__reflect(BaseMaterial.prototype, "BaseMaterial");
//# sourceMappingURL=BaseMaterial.js.map