var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 顶部功能栏
 */
var TopToolBar = (function (_super) {
    __extends(TopToolBar, _super);
    function TopToolBar() {
        var _this = _super.call(this) || this;
        _this._btnNames = ["logBtn", "mapBtn", "optBtn"];
        _this.typeName = WorWindowType.TOP_TOOLBAR;
        _this.layerType = LayerType.LAYER_MENU;
        _this.align(AlignType.TOP_RIGHT, 0, 20);
        return _this;
    }
    TopToolBar.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventTap(this._btnNames);
    };
    /**tap响应函数*/
    TopToolBar.prototype.tapCallback = function (childName) {
        switch (childName) {
            case "logBtn":
                GameManager.getIns().openGameUI(LogWindow);
                break;
            case "mapBtn":
                WinsManager.getIns().switchWin(MiniMap);
                break;
            case "optBtn":
                GameManager.getIns().openGameUI(OptWindow);
                break;
            default:
                LogTrace.log("未处理的子对象");
        }
    };
    return TopToolBar;
}(GameWindow));
__reflect(TopToolBar.prototype, "TopToolBar", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TopToolBar.js.map