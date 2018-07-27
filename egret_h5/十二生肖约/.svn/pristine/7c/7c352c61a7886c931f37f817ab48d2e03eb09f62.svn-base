var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_GemGroup = (function (_super) {
    __extends(UI_Gem_GemGroup, _super);
    function UI_Gem_GemGroup() {
        var _this = _super.call(this) || this;
        _this.pageNums = 0;
        return _this;
    }
    UI_Gem_GemGroup.prototype.onCreate = function () {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            v.setGroupID(i);
            v.setListener(this.gemListener.callback, this.gemListener.callbackThis);
        }
        this.gemGroupArrowLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TipLeftHandler, this);
        this.gemGroupArrowRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TipRightHandler, this);
    };
    UI_Gem_GemGroup.prototype.onDestroy = function () {
        this.gemGroupArrowLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TipLeftHandler, this);
        this.gemGroupArrowRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TipRightHandler, this);
        this.removeGemListener();
    };
    UI_Gem_GemGroup.prototype.setData = function (datas) {
        if (datas === void 0) { datas = []; }
        this.gemStoneDatas = datas;
        var p = Math.ceil(this.gemStoneDatas.length / 10);
        this.pageNums = p < 1 ? 1 : p;
        this.setPage(0);
    };
    UI_Gem_GemGroup.prototype.setGemListener = function (l, obj) {
        this.gemListener = { callback: l, callbackThis: obj };
    };
    UI_Gem_GemGroup.prototype.removeGemListener = function (l, obj) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            v.removeListener(this.gemListener);
        }
        this.gemListener = null;
    };
    UI_Gem_GemGroup.prototype.setPage = function (index) {
        if (index < 0 || index > this.pageNums - 1) {
            return;
        }
        this.currentPage = index;
        // 设置箭头
        this.setArrowImage(this.currentPage > 0, this.currentPage < this.pageNums - 1);
        //设置显示宝石数据
        this.setshowData(this.getShowDatas());
    };
    UI_Gem_GemGroup.prototype.getShowDatas = function () {
        var datas = [];
        for (var i = this.currentPage * 10; i < this.currentPage * 10 + 10; i++) {
            if (i >= this.gemStoneDatas.length) {
                datas.push(null); //这个地方是要重新处理的
            }
            else {
                datas.push(this.gemStoneDatas[i]);
            }
        }
        return datas;
    };
    UI_Gem_GemGroup.prototype.setArrowImage = function (left, right) {
        this.gemGroupArrowLeft.source = "resource/res/ui/gem/gs_arr_left" + (left ? "_a.png" : "_u.png");
        this.gemGroupArrowRight.source = "resource/res/ui/gem/gs_arr_right" + (right ? "_a.png" : "_u.png");
    };
    UI_Gem_GemGroup.prototype.setshowData = function (datas) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            this.gemGroup.getChildAt(i).setMaterialData(datas[i]);
        }
    };
    UI_Gem_GemGroup.prototype.TipLeftHandler = function (e) {
        this.setPage(this.currentPage - 1);
    };
    UI_Gem_GemGroup.prototype.TipRightHandler = function (e) {
        this.setPage(this.currentPage + 1);
    };
    UI_Gem_GemGroup.prototype.checkSelectGem = function (x, y) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            if (v.checkSelect(x, y)) {
                return v;
            }
        }
        return null;
    };
    UI_Gem_GemGroup.prototype.checkArea = function (x, y) {
        return this.hitTestPoint(x, y, false);
    };
    return UI_Gem_GemGroup;
}(BaseComponent));
__reflect(UI_Gem_GemGroup.prototype, "UI_Gem_GemGroup");
//# sourceMappingURL=UI_Gem_GemGroup.js.map