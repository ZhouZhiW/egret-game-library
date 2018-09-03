var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RoleBase = (function (_super) {
    __extends(RoleBase, _super);
    /**role的基类
     *
     * @param name 名字
     * @param font 名字字体
     */
    function RoleBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/roleBaseSkin/RoleBaseSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.removeFromStage, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beTouched, _this);
        return _this;
    }
    /**添加到舞台触发事件
     *
     * @param event
     */
    RoleBase.prototype.addToStage = function (event) {
    };
    /**从舞台移除触发事件
     *
     * @param event
     */
    RoleBase.prototype.removeFromStage = function (event) {
        this.dispose();
    };
    /**删除掉监听的对象
     *
     */
    RoleBase.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.beTouched, this);
    };
    return RoleBase;
}(eui.Component));
__reflect(RoleBase.prototype, "RoleBase");
//# sourceMappingURL=RoleBase.js.map