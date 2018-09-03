var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GemIcon = (function (_super) {
    __extends(GemIcon, _super);
    function GemIcon() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "resource/H5GameEuiSkins/GemIcoSkin.exml";
        return _this;
    }
    return GemIcon;
}(eui.Button));
__reflect(GemIcon.prototype, "GemIcon");
//# sourceMappingURL=GemIcon.js.map