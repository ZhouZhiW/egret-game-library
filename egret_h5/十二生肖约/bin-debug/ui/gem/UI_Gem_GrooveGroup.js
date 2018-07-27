var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_GrooveGroup = (function (_super) {
    __extends(UI_Gem_GrooveGroup, _super);
    function UI_Gem_GrooveGroup() {
        return _super.call(this) || this;
    }
    UI_Gem_GrooveGroup.prototype.onCreate = function () {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            v.setGroupID(i);
            v.setListener(this.grooveListener, this);
        }
    };
    UI_Gem_GrooveGroup.prototype.onDestroy = function () {
        this.removeGrooveListener();
    };
    UI_Gem_GrooveGroup.prototype.setData = function (datas) {
        if (datas === void 0) { datas = []; }
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            this.gemGroup.getChildAt(i).setMaterialData(datas[i]);
        }
    };
    UI_Gem_GrooveGroup.prototype.getNullGroove = function () {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            if (v.getMaterialData() == null || v.getMaterialData().getGemType() == DataType_GemType.Null) {
                return v;
            }
        }
        return null;
    };
    UI_Gem_GrooveGroup.prototype.addGrooveListener = function (l, obj) {
        this.grooveListener = { callback: l, callbackThis: obj };
    };
    UI_Gem_GrooveGroup.prototype.removeGrooveListener = function (l, obj) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            v.removeListener(this.grooveListener);
        }
        this.grooveListener = null;
    };
    UI_Gem_GrooveGroup.prototype.checkSelectGroove = function (x, y) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            if (v.checkSelect(x, y)) {
                return v;
            }
        }
        return null;
    };
    UI_Gem_GrooveGroup.prototype.checkEquipGroove = function (x, y) {
        for (var i = 0; i < this.gemGroup.numChildren; i++) {
            var v = this.gemGroup.getChildAt(i);
            if (v.checkEquip(x, y)) {
                return v;
            }
        }
        return null;
    };
    UI_Gem_GrooveGroup.prototype.checkArea = function (x, y) {
        return this.hitTestPoint(x, y, false);
    };
    return UI_Gem_GrooveGroup;
}(BaseComponent));
__reflect(UI_Gem_GrooveGroup.prototype, "UI_Gem_GrooveGroup");
//# sourceMappingURL=UI_Gem_GrooveGroup.js.map