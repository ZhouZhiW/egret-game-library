var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 模块分类
 */
var ModuleType = (function () {
    function ModuleType() {
    }
    return ModuleType;
}());
/**
 * 玩家信息基础
 */
ModuleType.USER = 1;
__reflect(ModuleType.prototype, "ModuleType");
//# sourceMappingURL=ModuleType.js.map