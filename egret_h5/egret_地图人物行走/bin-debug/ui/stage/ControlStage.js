var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**代替Main成为整个加载界面的主类
 *
 */
var ControlStage = (function (_super) {
    __extends(ControlStage, _super);
    function ControlStage() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/stageSkin/ControlStageSkin.exml";
        return _this;
    }
    /**从舞台删除类，添加类到舞台
     *
     * @param removeStage 需要删除的类
     * @param addStage 需要添加的类
     */
    ControlStage.prototype.setStage = function (removeStage, addStage) {
        if (removeStage.parent == this) {
            this.removeChild(removeStage);
        }
        if (addStage == null) {
            return;
        }
        this.addChild(addStage);
    };
    /**添加到舞台触发此事件
     *
     * @param event
     */
    ControlStage.prototype.addToStage = function (event) {
        //添加开始界面
        this.addChild(StartGameStage.ins);
    };
    Object.defineProperty(ControlStage, "ins", {
        /**获取类单例，若为null则new一个
         *
         */
        get: function () {
            if (this._ins == null) {
                this._ins = new ControlStage();
            }
            return this._ins;
        },
        /**只能设置此为null
         *
         */
        set: function (value) {
            if (value != null) {
                return;
            }
            this._ins = value;
        },
        enumerable: true,
        configurable: true
    });
    return ControlStage;
}(BaseStage));
__reflect(ControlStage.prototype, "ControlStage");
//# sourceMappingURL=ControlStage.js.map