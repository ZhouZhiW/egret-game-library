var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LargeImageDialog = (function (_super) {
    __extends(LargeImageDialog, _super);
    function LargeImageDialog(imagePath) {
        var _this = _super.call(this, false, true) || this;
        _this.image.source = imagePath;
        _this.addButton("确定");
        return _this;
    }
    LargeImageDialog.prototype.onCreate = function () {
    };
    LargeImageDialog.prototype.onDestroy = function () {
    };
    LargeImageDialog.prototype.setScroller = function (flag) {
        this.scroller.scrollPolicyV = (flag ? eui.ScrollPolicy.ON : eui.ScrollPolicy.OFF);
    };
    Object.defineProperty(LargeImageDialog.prototype, "style", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LargeImageDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/dialog/CustomImageDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return LargeImageDialog;
}(CustomDialog));
__reflect(LargeImageDialog.prototype, "LargeImageDialog");
//# sourceMappingURL=LargeImageDialog.js.map