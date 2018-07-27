var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseList = (function (_super) {
    __extends(BaseList, _super);
    function BaseList() {
        var _this = _super.call(this) || this;
        _this.dataGroup = new eui.DataGroup();
        _this.upDatas = new eui.ArrayCollection();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    BaseList.prototype.onCreate = function () {
    };
    BaseList.prototype.onDestroy = function () {
    };
    BaseList.prototype.createChildren = function () {
        this.viewport = this.dataGroup;
        this.addChild(this.dataGroup);
        this.dataGroup.dataProvider = this.upDatas;
        this.dataGroup.itemRenderer = this.getItemRenderer();
    };
    BaseList.prototype.setData = function (datas) {
        this.upDatas.replaceAll(datas);
    };
    BaseList.prototype.getItemRenderer = function () {
        return null;
    };
    return BaseList;
}(eui.Scroller));
__reflect(BaseList.prototype, "BaseList");
//# sourceMappingURL=BaseList.js.map