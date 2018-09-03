var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对齐方式
 * @author nodep
 */
var AlignType = (function () {
    function AlignType() {
    }
    return AlignType;
}());
AlignType.TOP_LEFT = "TOP_LEFT";
AlignType.TOP_CENTER = "TOP_CENTER";
AlignType.TOP_RIGHT = "TOP_RIGHT";
AlignType.CENTER = "CENTER";
AlignType.BOTTOM_LEFT = "BOTTOM_LEFT";
AlignType.BOTTOM_CENTER = "BOTTOM_CENTER";
AlignType.BOTTOM_RIGHT = "BOTTOM_RIGHT";
AlignType.NONE = "NONE";
__reflect(AlignType.prototype, "AlignType");
//# sourceMappingURL=AlignType.js.map