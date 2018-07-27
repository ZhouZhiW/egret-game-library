var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ITextElementObj = (function () {
    function ITextElementObj(str, mtextColor) {
        this.text = str;
        this.style = new ITextStyleObj(mtextColor);
    }
    return ITextElementObj;
}());
__reflect(ITextElementObj.prototype, "ITextElementObj");
//# sourceMappingURL=ITextElementObj.js.map