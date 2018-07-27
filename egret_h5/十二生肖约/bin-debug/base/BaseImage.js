var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseImage = (function (_super) {
    __extends(BaseImage, _super);
    function BaseImage(source) {
        if (source === void 0) { source = null; }
        var _this = _super.call(this) || this;
        if (source != null) {
            _this.source = source;
        }
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    BaseImage.prototype.onCreate = function () {
        // this.validateNow();
    };
    BaseImage.prototype.onDestroy = function () {
    };
    return BaseImage;
}(eui.Image));
__reflect(BaseImage.prototype, "BaseImage");
//# sourceMappingURL=BaseImage.js.map