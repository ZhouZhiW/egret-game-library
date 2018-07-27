var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TipManager = (function () {
    function TipManager() {
        this.tips = [];
        DataManager.inst.tips.addDataListener(this.refreshTips, this);
    }
    TipManager.prototype.refreshTips = function (e) {
        var data = e.data;
        this.dataTips = data.tips;
        for (var i = 0; i < this.tips.length; i++) {
            var tip = this.tips[i];
            var status_1 = this.getTipStatus(tip.getTipIndex());
            tip.onTipStatus(status_1);
        }
    };
    TipManager.prototype.addTip = function (tip) {
        this.tips.push(tip);
        tip.onTipStatus(this.getTipStatus(tip.getTipIndex()));
    };
    TipManager.prototype.removeTip = function (tip) {
        for (var i = 0; i < this.tips.length; i++) {
            if (this.tips[i].getTipIndex() == tip.getTipIndex())
                this.tips.splice(i, 1);
            return;
        }
    };
    TipManager.prototype.getTipStatus = function (index) {
        if (this.dataTips == null) {
            console.log("this.dataTips == null");
            return 0;
        }
        for (var i = 0; i < this.dataTips.length; i++) {
            var dataTip = this.dataTips[i];
            if (dataTip.index == index) {
                return dataTip.status;
            }
        }
        return 0;
    };
    return TipManager;
}());
__reflect(TipManager.prototype, "TipManager");
//# sourceMappingURL=TipManager.js.map