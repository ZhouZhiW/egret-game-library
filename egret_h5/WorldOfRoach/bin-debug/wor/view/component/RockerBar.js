var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏基础摇杆
 */
var RockerBar = (function (_super) {
    __extends(RockerBar, _super);
    function RockerBar() {
        var _this = _super.call(this) || this;
        _this.layerType = LayerType.LAYER_UI;
        _this.typeName = WorWindowType.ROCKER_LEFT;
        _this.align(AlignType.BOTTOM_LEFT, 150, -150);
        return _this;
    }
    RockerBar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._contorller = new RockBarContorller(this.getChildByName("barBtn"), this.x, this.y);
        this.drawC();
    };
    //绘制背景
    RockerBar.prototype.drawC = function () {
        if (!this._bgShape) {
            this._bgShape = new egret.Shape();
            this.addChildAt(this._bgShape, 0);
            this._bgShape.touchEnabled = false;
        }
        this._bgShape.graphics.clear();
        this._bgShape.graphics.beginFill(0xFFFFFF, 0.5);
        this._bgShape.graphics.drawCircle(this.getChildByName("barBtn").anchorOffsetX, this.getChildByName("barBtn").anchorOffsetY, GameConfig.rocker_bar_sensitivity);
        this._bgShape.graphics.endFill();
    };
    return RockerBar;
}(GameWindow));
__reflect(RockerBar.prototype, "RockerBar", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=RockerBar.js.map