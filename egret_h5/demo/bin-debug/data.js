var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 */
var Data = (function () {
    function Data() {
    }
    Data.setHeroIndex = function (val) {
        this._heroIndex = val;
    };
    Data.getHeroIndex = function () {
        return this._heroIndex;
    };
    Data.setCurScore = function (val) {
        this._curScore = val;
    };
    Data.getCurScore = function () {
        return this._curScore;
    };
    Data._heroIndex = 1;
    Data._curScore = 0;
    return Data;
}());
__reflect(Data.prototype, "Data");
