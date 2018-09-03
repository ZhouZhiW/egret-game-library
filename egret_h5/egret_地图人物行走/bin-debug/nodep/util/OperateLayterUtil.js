var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**操作layer的类
 *
 */
var OperateLayterUtil = (function () {
    function OperateLayterUtil() {
        /**需要删除的地图快名字的集合
         *
         */
        this.deleteMbArray = new Array();
        /**需要添加的地图块集合
         *
         */
        this.needMbArray = new Array();
    }
    return OperateLayterUtil;
}());
__reflect(OperateLayterUtil.prototype, "OperateLayterUtil");
//# sourceMappingURL=OperateLayterUtil.js.map