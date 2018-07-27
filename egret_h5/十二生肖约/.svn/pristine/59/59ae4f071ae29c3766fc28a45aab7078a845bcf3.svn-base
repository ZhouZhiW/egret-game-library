var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Friends_Tab = (function (_super) {
    __extends(UI_Rank_Friends_Tab, _super);
    function UI_Rank_Friends_Tab() {
        var _this = _super.call(this) || this;
        NetEventManager.inst.pushFriends(0);
        return _this;
    }
    UI_Rank_Friends_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        DataManager.inst.friends.addDataListener(this.refreshFriends, this);
    };
    UI_Rank_Friends_Tab.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    UI_Rank_Friends_Tab.prototype.refreshFriends = function (e) {
        var data = e.data;
        this.friendsList.setDatas(data.friendsUser);
    };
    Object.defineProperty(UI_Rank_Friends_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/rank/UI_Rank_Friends_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Rank_Friends_Tab;
}(BaseComponent));
__reflect(UI_Rank_Friends_Tab.prototype, "UI_Rank_Friends_Tab");
//# sourceMappingURL=UI_Rank_Friends_Tab.js.map