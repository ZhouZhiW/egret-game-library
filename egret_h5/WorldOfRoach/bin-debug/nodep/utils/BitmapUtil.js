var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 位图的应用工具
 * 通过资源名称创建一个位图,
 * @author nodep
 * @version 1.0
 */
var BitmapUtil = (function () {
    function BitmapUtil() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    BitmapUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return BitmapUtil;
}());
__reflect(BitmapUtil.prototype, "BitmapUtil");
//# sourceMappingURL=BitmapUtil.js.map