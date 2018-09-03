var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**重写Button按钮
 *
 */
var OvButton = (function (_super) {
    __extends(OvButton, _super);
    function OvButton() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/commponentsSkin/OvButtonSkin.exml";
        return _this;
    }
    return OvButton;
}(eui.Component));
__reflect(OvButton.prototype, "OvButton");
//# sourceMappingURL=OvButton.js.map