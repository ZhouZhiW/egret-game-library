var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 河流
 */
var River = (function () {
    function River() {
        this.downsteams = new Array();
    }
    return River;
}());
__reflect(River.prototype, "River");
//# sourceMappingURL=River.js.map