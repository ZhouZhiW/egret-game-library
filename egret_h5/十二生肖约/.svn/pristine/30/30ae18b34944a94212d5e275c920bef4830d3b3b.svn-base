var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DialogLayer = (function (_super) {
    __extends(DialogLayer, _super);
    function DialogLayer() {
        return _super.call(this) || this;
    }
    Object.defineProperty(DialogLayer, "inst", {
        get: function () {
            if (DialogLayer.ins == null) {
                DialogLayer.ins = new DialogLayer();
            }
            return this.ins;
        },
        enumerable: true,
        configurable: true
    });
    DialogLayer.prototype.onCreate = function () {
        this.bgImg = new eui.Image();
        this.bgImg.visible = false;
        this.bgImg.source = "resource/res/base/base_black_bg.png";
        this.bgImg.alpha = 0.5;
        this.bgImg.width = this.width;
        this.bgImg.height = this.height;
        this.addChild(this.bgImg);
        _super.prototype.onCreate.call(this);
    };
    DialogLayer.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    DialogLayer.prototype.showDialog = function (dialog) {
        this.addChild(dialog);
        this.bgImg.visible = this.numChildren > 1;
    };
    DialogLayer.prototype.closeDialog = function (dialog) {
        if (this.getChildIndex(dialog) >= 0) {
            this.removeChild(dialog);
        }
        else {
            console.error(dialog.name + "is close!");
        }
        this.bgImg.visible = this.numChildren > 1;
    };
    return DialogLayer;
}(BaseLayer));
__reflect(DialogLayer.prototype, "DialogLayer");
//# sourceMappingURL=DialogLayer.js.map