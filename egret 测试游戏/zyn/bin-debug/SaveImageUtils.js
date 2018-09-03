var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SaveImageUtils = (function () {
    function SaveImageUtils() {
    }
    SaveImageUtils.imageTagVisible = function (visible) {
        if (visible) {
            document.getElementById("saveContainer").style.display = "block";
        }
        else {
            document.getElementById("saveContainer").style.display = "none";
        }
    };
    SaveImageUtils.drawCanvasimages = function () {
        var num = Math.floor(Math.random() * 10);
        var str1 = _data.game_result[num].strleft;
        var str2 = _data.game_result[num].strright;
        var str3 = _data.game_result[num].str;
        CanvasToimages_1(str1, str2, str3);
    };
    return SaveImageUtils;
}());
__reflect(SaveImageUtils.prototype, "SaveImageUtils");
//# sourceMappingURL=SaveImageUtils.js.map