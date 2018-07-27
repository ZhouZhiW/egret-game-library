var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Online_List = (function (_super) {
    __extends(UI_Online_List, _super);
    function UI_Online_List() {
        return _super.call(this) || this;
    }
    UI_Online_List.prototype.onCreate = function () {
        this.onlineTimer = new egret.Timer(1000, 0);
        this.onlineTimer.addEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
        this.onlineTimer.start();
    };
    UI_Online_List.prototype.onDestroy = function () {
        if (this.onlineTimer != null) {
            this.onlineTimer.stop();
            this.onlineTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerEvent, this);
            this.onlineTimer = null;
        }
    };
    UI_Online_List.prototype.timerEvent = function () {
        for (var i = 0; i < this.dataGroup.numChildren; i++) {
            var child = this.dataGroup.getChildAt(i);
            if (child instanceof UI_Online_Item) {
                child.timerEvent();
            }
        }
    };
    UI_Online_List.prototype.setData = function (datas) {
        _super.prototype.setData.call(this, datas);
    };
    UI_Online_List.prototype.getItemRenderer = function () {
        return UI_Online_Item;
        ;
    };
    return UI_Online_List;
}(BaseList));
__reflect(UI_Online_List.prototype, "UI_Online_List");
//# sourceMappingURL=UI_Online_List.js.map