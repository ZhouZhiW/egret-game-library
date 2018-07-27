var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UI_TreasuresManager = (function () {
    function UI_TreasuresManager() {
        this.treasures = [];
        DataManager.inst.treasures.addDataListener(this.refreshTreasures, this);
    }
    UI_TreasuresManager.prototype.refreshTreasures = function (e) {
        var data = e.data;
        if (data.treasures.length < 1) {
            return;
        }
        for (var i = 0; i < data.treasures.length; i++) {
            this.treasures.push(data.treasures[i]);
        }
        this.popTreasure();
    };
    UI_TreasuresManager.prototype.popTreasure = function () {
        if (this.currentPop != null || this.treasures.length < 1) {
            return;
        }
        var data = this.treasures.shift();
        this.currentPop = new UI_Treasures(this, data);
        UILayer.inst.addChild(this.currentPop);
    };
    UI_TreasuresManager.prototype.popEnd = function () {
        if (this.currentPop != null) {
            UILayer.inst.removeChild(this.currentPop);
        }
        this.currentPop = null;
        this.popTreasure();
    };
    return UI_TreasuresManager;
}());
__reflect(UI_TreasuresManager.prototype, "UI_TreasuresManager");
//# sourceMappingURL=UI_TreasuresManager.js.map