var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_Gem = (function (_super) {
    __extends(UI_Gem_Gem, _super);
    function UI_Gem_Gem() {
        return _super.call(this) || this;
    }
    UI_Gem_Gem.prototype.checkSelect = function (x, y) {
        if (this.getMaterialData() == null || this.getMaterialData().getType() == DataType_Material.Null) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    };
    UI_Gem_Gem.prototype.getGroupID = function () {
        return this.groupID;
    };
    UI_Gem_Gem.prototype.setGroupID = function (id) {
        this.groupID = id;
    };
    UI_Gem_Gem.prototype.getTitleInfo = function () {
        return this.getMaterialData().getName();
    };
    UI_Gem_Gem.prototype.getContentInfo = function () {
        return UI_Tre_GemConfig.getAttributesInfo(this.getMaterialData().getGemType(), this.getMaterialData().gemAttributes);
    };
    UI_Gem_Gem.prototype.clickHandler = function () {
        if (this.getMaterialData() == null || this.getMaterialData().getType() == DataType_Material.Null) {
            return;
        }
        this.listener.callback.call(this.listener.callbackThis, this);
    };
    UI_Gem_Gem.prototype.setListener = function (listener, self) {
        this.listener = { callback: listener, callbackThis: self };
    };
    UI_Gem_Gem.prototype.removeListener = function (listener) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    return UI_Gem_Gem;
}(BaseMaterial));
__reflect(UI_Gem_Gem.prototype, "UI_Gem_Gem");
//# sourceMappingURL=UI_Gem_Gem.js.map