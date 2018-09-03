var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**荧幕类
 *
 */
var StoryTitle = (function (_super) {
    __extends(StoryTitle, _super);
    function StoryTitle(title, content) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/commponentsSkin/StoryTitleSkin.exml";
        _this.config = RES.getRes(GameConfig.STORYTITLE_CONFIG);
        _this.title.text = title;
        _this.content.text = content;
        return _this;
    }
    /**添加到舞台触发此事件
     *
     * @param event
     */
    StoryTitle.prototype.addToStage = function (event) {
        this.tweenStart();
    };
    /**从舞台移除触发此事件
     *
     * @param event
     */
    StoryTitle.prototype.removeFromStage = function (event) {
        this.dispose();
    };
    /**设置标题和内容
     *
     * @param title 标题
     * @param content 内容
     */
    StoryTitle.prototype.setContent = function (title, content) {
        this.title.text = title;
        this.content.text = content;
    };
    /**tween动画开始展现
     *
     */
    StoryTitle.prototype.tweenStart = function () {
        var config = this.config;
        this.rectTween(this.topRect, config.topRectTween_endScale, config.topRectTween_tweenTime);
        this.rectTween(this.bottomRect, config.bottomRectTween_endScale, config.bottomRectTween_tweenTime);
        this.contentTween(this.title, config.titleTween_endAlpha, config.titleTween_waitTime, config.titleTween_tweenTime);
        this.contentTween(this.content, config.contentTween_endAlpha, config.contentTween_waitTime, config.contentTween_tweenTime, this.onTweenComplete);
    };
    /**内容tween展现
     *
     * @param label  eui.bitmapLabel
     * @param alpha  透明度
     * @param waitTime 等待动画执行时间
     * @param tweenTime 动画时间
     * @param callBack 回调函数
     */
    StoryTitle.prototype.contentTween = function (label, alpha, waitTime, tweenTime, callBack) {
        var tween = egret.Tween.get(label);
        tween.wait(waitTime);
        tween.to({ alpha: alpha }, tweenTime);
        if (callBack != null) {
            tween.call(callBack, this);
        }
    };
    /**tween动画完成事件
     *
     */
    StoryTitle.prototype.onTweenComplete = function () {
        ControlStage.ins.setStage(this, this.nextStage);
    };
    /**rect添加动画
     *
     * @param rect 对象
     * @param scale scale值
     * @param tweenTime 动画时间
     */
    StoryTitle.prototype.rectTween = function (rect, scale, tweenTime) {
        egret.Tween.get(rect, {
            loop: false
        })
            .to({ scaleY: scale }, tweenTime, egret.Ease.quintInOut);
    };
    /**显式释放掉tween动画
     *
     */
    StoryTitle.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        egret.Tween.removeTweens(this.topRect);
        egret.Tween.removeTweens(this.bottomRect);
        egret.Tween.removeTweens(this.title);
        egret.Tween.removeTweens(this.content);
    };
    return StoryTitle;
}(BaseStage));
__reflect(StoryTitle.prototype, "StoryTitle");
//# sourceMappingURL=StoryTitle.js.map