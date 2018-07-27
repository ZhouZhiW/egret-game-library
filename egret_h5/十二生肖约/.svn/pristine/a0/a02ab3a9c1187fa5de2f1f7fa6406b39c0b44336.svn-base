var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Inventory_Tab = (function (_super) {
    __extends(UI_Inventory_Tab, _super);
    function UI_Inventory_Tab() {
        var _this = _super.call(this) || this;
        _this.pageNums = 0;
        _this.pageNow = 0;
        return _this;
        // NetEventManager.inst.pushBackpack();
    }
    Object.defineProperty(UI_Inventory_Tab.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/backpack/UI_Backpack_TabSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Inventory_Tab.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        // this.leftArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        // this.rightArrow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        // DataManager.inst.backpack.addDataListener(this.refreshBackpack, this);
    };
    UI_Inventory_Tab.prototype.onDestroy = function () {
        // DataManager.inst.backpack.removeDataListener(this.refreshBackpack, this);
        // this.leftArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
        // this.rightArrow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
        _super.prototype.onDestroy.call(this);
    };
    UI_Inventory_Tab.prototype.refreshBackpack = function (e) {
        this.datas = e.data;
        this.pageNums = Math.ceil(this.datas.bpGrids.length / 20);
        this.setArrow(this.pageNow);
    };
    UI_Inventory_Tab.prototype.clickLeft = function (e) {
        if (this.pageNow > 0) {
            this.setArrow(this.pageNow - 1);
        }
    };
    UI_Inventory_Tab.prototype.clickRight = function (e) {
        if (this.pageNow < this.pageNums - 1) {
            this.setArrow(this.pageNow + 1);
        }
    };
    UI_Inventory_Tab.prototype.setArrow = function (n) {
        this.pageNow = n;
        if (this.pageNow > 0) {
            this.setArrowImage(false, true);
        }
        else {
            this.setArrowImage(false, false);
        }
        if (this.pageNow < this.pageNums - 1) {
            this.setArrowImage(true, true);
        }
        else {
            this.setArrowImage(true, false);
        }
        this.setData();
    };
    UI_Inventory_Tab.prototype.setArrowImage = function (arrowType, isFocus) {
        var img = arrowType ? this.rightArrow : this.leftArrow;
        var path = arrowType ? "resource/res/ui/gem/gs_arr_right" : "resource/res/ui/gem/gs_arr_left";
        path += isFocus ? "_a.png" : "_u.png";
        img.source = path;
    };
    UI_Inventory_Tab.prototype.setData = function () {
        this.backpackGroup.removeChildren();
        var l = this.datas.bpGrids.length - (20 * this.pageNow);
        var b = new Data_Material(l);
        if (this.pageNow < this.pageNums - 1) {
            for (var i = this.pageNow * 20; i < (this.pageNow + 1) * 20; i++) {
                this.backpackGroup.addChild(new UI_Inventory_Goods(b));
            }
        }
        else {
            for (var i = this.pageNow * 20; i < this.pageNow * 20 + l; i++) {
                this.backpackGroup.addChild(new UI_Inventory_Goods(b));
            }
            for (var i = 0; i < (20 - l); i++) {
                var type = DataType_Material.Null;
                var matirals = new Data_Material(type);
                var goods = new UI_Inventory_Goods(matirals);
                this.backpackGroup.addChild(goods);
            }
        }
    };
    return UI_Inventory_Tab;
}(UI_Base_Tab));
__reflect(UI_Inventory_Tab.prototype, "UI_Inventory_Tab");
//# sourceMappingURL=UI_Inventory_Tab.js.map