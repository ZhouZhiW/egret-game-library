var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**摄像机和人物移动的类，不做存储
 *
 */
var MoveUtil = (function () {
    function MoveUtil(scrollPosition, realPosition) {
        this.scrollPosition = scrollPosition;
        this.realPosition = realPosition;
    }
    return MoveUtil;
}());
__reflect(MoveUtil.prototype, "MoveUtil");
//# sourceMappingURL=MoveUtil.js.map