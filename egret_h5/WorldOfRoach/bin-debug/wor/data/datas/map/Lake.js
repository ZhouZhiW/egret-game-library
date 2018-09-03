var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 湖泊
 */
var Lake = (function () {
    function Lake() {
        this._areas = new Array();
        Lake.ccId++;
        this.id = Lake.ccId;
    }
    /**添加一个区域ID */
    Lake.prototype.addArea = function (areaId) {
        if (this._areas.indexOf(areaId) < 0)
            this._areas.push(areaId);
    };
    /**获取区域 */
    Lake.prototype.getAreas = function () {
        return this._areas;
    };
    Lake.prototype.checkSefl = function () {
        LogTrace.log("LakeID=" + this.id + " AreaCount=" + this._areas.length);
    };
    return Lake;
}());
Lake.ccId = 0;
__reflect(Lake.prototype, "Lake");
//# sourceMappingURL=Lake.js.map