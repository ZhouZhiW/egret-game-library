var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ElementTypeParse = (function () {
    function ElementTypeParse() {
    }
    ElementTypeParse.creatElementTypeData = function (val) {
        GameData.elementTypes = val;
    };
    return ElementTypeParse;
}());
__reflect(ElementTypeParse.prototype, "ElementTypeParse");
//# sourceMappingURL=ElementTypeParse.js.map