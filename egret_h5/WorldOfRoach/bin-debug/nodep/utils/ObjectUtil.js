var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象属性的批量操作
 * @author nodep
 * @version 1.0
 */
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    /**
     * 拷贝属性,并不是创建，而是将from中的属性都拷贝到to中
     * 前提是to对象必须拥有这些属性的暴露
     */
    ObjectUtil.copyTo = function (from, to) {
        var key;
        for (key in from)
            to[key] = from[key];
    };
    return ObjectUtil;
}());
__reflect(ObjectUtil.prototype, "ObjectUtil");
//# sourceMappingURL=ObjectUtil.js.map