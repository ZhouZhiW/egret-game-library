var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UI_Tre_TreasuresManager = (function () {
    function UI_Tre_TreasuresManager() {
        this.showTreasures = [];
        DataManager.inst.treasures.addDataListener(this.refreshTreasures, this);
    }
    UI_Tre_TreasuresManager.prototype.refreshTreasures = function (e) {
        var data = e.data;
        if (data.treasures.length < 1) {
            return;
        }
        var isStart = (this.showTreasures.length < 1);
        for (var i = 0; i < data.treasures.length; i++) {
        }
        if (isStart) {
            this.popTreasure();
        }
    };
    UI_Tre_TreasuresManager.prototype.popTreasure = function () {
        if (this.showTreasures.length < 1) {
            return;
        }
        var data = this.showTreasures.shift();
        var t = new UI_Tie_Treasures(data);
        t.setDestroyListener(this.popTreasure, this);
        DialogLayer.inst.addChild(t);
    };
    return UI_Tre_TreasuresManager;
}());
__reflect(UI_Tre_TreasuresManager.prototype, "UI_Tre_TreasuresManager");
//# sourceMappingURL=UI_Tre_TreasuresManager.js.map