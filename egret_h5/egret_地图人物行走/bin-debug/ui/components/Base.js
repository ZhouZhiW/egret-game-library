var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**背景颜色基类
 *
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/commponentsSkin/DecratorHSkin.exml";
        return _this;
    }
    return Base;
}(eui.Component));
__reflect(Base.prototype, "Base");
//# sourceMappingURL=Base.js.map