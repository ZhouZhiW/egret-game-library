var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**stage的基类
 *
 */
var BaseStage = (function (_super) {
    __extends(BaseStage, _super);
    function BaseStage() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
        return _this;
    }
    /**当添加到舞台触发此事件
     *
     */
    BaseStage.prototype.addToStage = function (event) {
    };
    /**从舞台移除触发此事件
     *
     * @param event
     */
    BaseStage.prototype.removeFromStage = function (event) {
        this.dispose();
    };
    /**删除事件监听
     *
     */
    BaseStage.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    };
    return BaseStage;
}(eui.Component));
__reflect(BaseStage.prototype, "BaseStage");
//# sourceMappingURL=BaseStage.js.map