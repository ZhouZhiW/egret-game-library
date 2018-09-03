var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 历史数据简装类
 */
var HistoryData = (function () {
    function HistoryData() {
        this.hasData = false;
        this.has = 0;
    }
    /**
     * 初始化玩家历史数据
     */
    HistoryData.prototype.initHistoryData = function (obj) {
        this.hasData = obj["has"] == 1;
    };
    return HistoryData;
}());
__reflect(HistoryData.prototype, "HistoryData");
//# sourceMappingURL=HistoryData.js.map