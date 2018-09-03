var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**当前地形 */
var StandType = (function () {
    function StandType() {
    }
    return StandType;
}());
StandType.SEA = 1;
StandType.LAND = 2;
StandType.LAKE = 3;
__reflect(StandType.prototype, "StandType");
//# sourceMappingURL=StandType.js.map