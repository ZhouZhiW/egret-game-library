var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Hero_List = (function (_super) {
    __extends(UI_Visit_Hero_List, _super);
    function UI_Visit_Hero_List() {
        var _this = _super.call(this) || this;
        _this.dataGroup = new eui.DataGroup();
        _this.upDatas = new eui.ArrayCollection();
        return _this;
    }
    UI_Visit_Hero_List.prototype.setData = function (datas) {
        this.upDatas.replaceAll(datas);
    };
    UI_Visit_Hero_List.prototype.createChildren = function () {
        this.viewport = this.dataGroup;
        this.addChild(this.dataGroup);
        this.dataGroup.dataProvider = this.upDatas;
        this.dataGroup.itemRenderer = UI_Visit_Hero_Item;
    };
    return UI_Visit_Hero_List;
}(eui.Scroller));
__reflect(UI_Visit_Hero_List.prototype, "UI_Visit_Hero_List");
//# sourceMappingURL=UI_Visit_Hero_List.js.map