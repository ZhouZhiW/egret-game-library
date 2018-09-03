var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeroUtil = (function () {
    function HeroUtil() {
        /**x坐标
         *
         */
        this.posX = null;
        /**y坐标
         *
         */
        this.posY = null;
        /**名字字体--未考虑其他属性
         *
         */
        this.font = null;
        /**名字
         *
         */
        this.name = null;
        /**记录在哪个地图
         *
         */
        this.onMap = null;
    }
    return HeroUtil;
}());
__reflect(HeroUtil.prototype, "HeroUtil");
//# sourceMappingURL=HeroUtil.js.map