var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Rank_Friends_List = (function (_super) {
    __extends(UI_Rank_Friends_List, _super);
    function UI_Rank_Friends_List() {
        return _super.call(this) || this;
    }
    UI_Rank_Friends_List.prototype.setDatas = function (datas) {
        _super.prototype.setData.call(this, datas);
    };
    UI_Rank_Friends_List.prototype.getItemRenderer = function () {
        return UI_Rank_Friends_Item;
    };
    return UI_Rank_Friends_List;
}(BaseList));
__reflect(UI_Rank_Friends_List.prototype, "UI_Rank_Friends_List");
//# sourceMappingURL=UI_Rank_Friends_List.js.map