var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**与StoryTitle关联，用于展现中间文字
 *
 */
var SceneUtil = (function () {
    function SceneUtil() {
        /**与该类关联的类的名字，便于查询
         *
         */
        this.name = null;
        /**标题内容--第xxx章
         *
         */
        this.titleName = null;
        /**内容-轮回地狱
         *
         */
        this.contentName = null;
    }
    return SceneUtil;
}());
__reflect(SceneUtil.prototype, "SceneUtil");
//# sourceMappingURL=SceneUtil.js.map