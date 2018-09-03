var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 底部按钮:主角(装备),背包（背包是万能,把几乎所有的功能都归纳到背包里）,天赋
 */
var BottomBar = (function (_super) {
    __extends(BottomBar, _super);
    function BottomBar() {
        var _this = _super.call(this) || this;
        _this.typeName = WorWindowType.BOTTOM_TOOLBAR;
        _this.layerType = LayerType.LAYER_MENU;
        _this.align(AlignType.BOTTOM_CENTER, 0, 0);
        return _this;
    }
    BottomBar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return BottomBar;
}(GameWindow));
__reflect(BottomBar.prototype, "BottomBar", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BottomBar.js.map