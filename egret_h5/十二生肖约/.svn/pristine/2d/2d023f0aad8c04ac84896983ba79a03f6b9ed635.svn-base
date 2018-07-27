var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameStatistics = (function () {
    function GameStatistics() {
        this.reset();
    }
    GameStatistics.prototype.addPlayerAttackCount = function (count) {
        if (count === void 0) { count = 1; }
        if (count > 0) {
            this.clickCount += count;
        }
    };
    GameStatistics.prototype.addPlayerCriCount = function (count) {
        if (count === void 0) { count = 1; }
        if (count > 0) {
            this.criticalCount += count;
        }
    };
    GameStatistics.prototype.reset = function () {
        this.clickCount = 0;
        this.criticalCount = 0;
    };
    return GameStatistics;
}());
__reflect(GameStatistics.prototype, "GameStatistics");
//# sourceMappingURL=GameStatistics.js.map