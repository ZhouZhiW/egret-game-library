var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Rank_List = (function (_super) {
    __extends(UI_Rank_Rank_List, _super);
    function UI_Rank_Rank_List() {
        return _super.call(this) || this;
    }
    UI_Rank_Rank_List.prototype.onCreate = function () {
        this.rankTimer = new egret.Timer(1000, 0);
        this.rankTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.rankTimer.start();
    };
    UI_Rank_Rank_List.prototype.onDestroy = function () {
        if (this.rankTimer != null) {
            this.rankTimer.stop();
            this.rankTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.rankTimer = null;
        }
    };
    UI_Rank_Rank_List.prototype.timerEvent = function () {
        for (var i = 0; i < this.dataGroup.numChildren; i++) {
            var child = this.dataGroup.getChildAt(i);
            if (child instanceof UI_Rank_Rank_Item) {
                child.timerEvent();
            }
        }
    };
    UI_Rank_Rank_List.prototype.setDatas = function (datas) {
        _super.prototype.setData.call(this, datas);
    };
    UI_Rank_Rank_List.prototype.getItemRenderer = function () {
        return UI_Rank_Rank_Item;
    };
    return UI_Rank_Rank_List;
}(BaseList));
__reflect(UI_Rank_Rank_List.prototype, "UI_Rank_Rank_List");
//# sourceMappingURL=UI_Rank_Rank_List.js.map