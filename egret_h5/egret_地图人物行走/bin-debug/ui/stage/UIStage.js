var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**界面展示的按钮之类的
 *
 */
var UIStage = (function (_super) {
    __extends(UIStage, _super);
    function UIStage(gameManager) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/stageSkin/UIStageSkin.exml";
        _this.moveBar.gameManager = gameManager;
        return _this;
    }
    return UIStage;
}(BaseStage));
__reflect(UIStage.prototype, "UIStage");
//# sourceMappingURL=UIStage.js.map