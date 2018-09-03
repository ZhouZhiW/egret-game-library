var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 右手操作区
 */
var CurbBar = (function (_super) {
    __extends(CurbBar, _super);
    function CurbBar() {
        var _this = _super.call(this) || this;
        _this.scaleX = _this.scaleY = WinsManager.scaleX;
        _this.typeName = WorWindowType.CURB_BAR;
        _this.layerType = LayerType.LAYER_MENU;
        _this.align(AlignType.BOTTOM_RIGHT, 0, 0);
        return _this;
    }
    CurbBar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._optBtn = this.getChildByName("optBtn");
        this.addEventTap("optBtn");
        this.initOptTarget();
    };
    //刷新opt目标
    CurbBar.prototype.initOptTarget = function () {
        this._optBtn.visible = WorldManager.getIns().focusOptionRole != null;
    };
    /**
     * tap响应函数
     */
    CurbBar.prototype.tapCallback = function (childName) {
        switch (childName) {
            case "optBtn":
                break;
        }
    };
    CurbBar.prototype.update = function (updateType, updateObject) {
        switch (updateType) {
            case UpdateType.MAP_OPT_CHANGE:
                this.initOptTarget();
                break;
        }
    };
    return CurbBar;
}(GameWindow));
__reflect(CurbBar.prototype, "CurbBar", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CurbBar.js.map