var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IconImageMaterial = (function (_super) {
    __extends(IconImageMaterial, _super);
    function IconImageMaterial() {
        return _super.call(this) || this;
    }
    Object.defineProperty(IconImageMaterial.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/activity/IconImageMaterialSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    IconImageMaterial.prototype.setMaterialData = function (data) {
        if (data == null) {
            return;
        }
        this.icon.source = data.getIconSource();
        this.count.text = "x" + EasyNumber.easyNum(data.getCounts());
    };
    return IconImageMaterial;
}(BaseComponent));
__reflect(IconImageMaterial.prototype, "IconImageMaterial");
//# sourceMappingURL=IconImageMaterial.js.map