var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Rank_Tab = (function (_super) {
    __extends(UI_Rank_Rank_Tab, _super);
    function UI_Rank_Rank_Tab() {
        var _this = _super.call(this) || this;
        _this.currentSelectIndex = -1;
        return _this;
    }
    UI_Rank_Rank_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        UI_Rank_Rank_Tab.inst = this;
        this.horoscopeAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        for (var i = 0; i < this.horoscopeGroup.numChildren; i++) {
            var item = this.horoscopeGroup.getChildAt(i);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        }
        DataManager.inst.rank.addDataListener(this.refresRank, this);
        this.setHoroscopeIndex(0);
    };
    UI_Rank_Rank_Tab.refresh = function () {
        if (UI_Rank_Rank_Tab.inst != null) {
            if (UI_Rank_Rank_Tab.inst.currentSelectIndex) {
                NetEventManager.inst.pushRank(UI_Rank_Rank_Tab.inst.currentSelectIndex);
            }
        }
    };
    UI_Rank_Rank_Tab.prototype.onDestroy = function () {
        UI_Rank_Rank_Tab.inst = null;
        for (var i = 0; i < this.horoscopeGroup.numChildren; i++) {
            var item = this.horoscopeGroup.getChildAt(i);
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickedTitleBtn, this);
        }
        DataManager.inst.rank.removeDataListener(this.refresRank, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Rank_Rank_Tab.prototype.refresRank = function (e) {
        this.data = e.data;
        if (this.data.rank == "0") {
            this.userRank.text = "暂无";
        }
        else {
            this.userRank.text = this.data.rank;
        }
        this.rankList.setDatas(this.data.rankUser);
    };
    Object.defineProperty(UI_Rank_Rank_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/rank/UI_Rank_Rank_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Rank_Rank_Tab.prototype.setHoroscopeIndex = function (index) {
        if (this.currentSelectIndex == index) {
            return;
        }
        this.currentSelectIndex = index;
        this.horoscopeAll.selected = this.currentSelectIndex == 0;
        for (var i = 0; i < this.horoscopeGroup.numChildren; i++) {
            var item = this.horoscopeGroup.getChildAt(i);
            item.selected = i == this.currentSelectIndex - 1;
        }
        NetEventManager.inst.pushRank(this.currentSelectIndex);
    };
    UI_Rank_Rank_Tab.prototype.clickedTitleBtn = function (e) {
        var btn = e.currentTarget;
        btn.selected = true;
        this.setHoroscopeIndex(btn == this.horoscopeAll ? 0 : (this.horoscopeGroup.getChildIndex(btn) + 1));
    };
    return UI_Rank_Rank_Tab;
}(BaseComponent));
__reflect(UI_Rank_Rank_Tab.prototype, "UI_Rank_Rank_Tab");
//# sourceMappingURL=UI_Rank_Rank_Tab.js.map