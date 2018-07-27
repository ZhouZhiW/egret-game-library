var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Tre_Gem = (function (_super) {
    __extends(UI_Tre_Gem, _super);
    function UI_Tre_Gem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Tre_Gem.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/treasures/UI_Tre_GemSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Tre_Gem.prototype.onCreate = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    UI_Tre_Gem.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    };
    UI_Tre_Gem.prototype.setGemStatus = function (type, level) {
        if (level === void 0) { level = 0; }
        this.gemIcon.source = UI_Tre_GemConfig.getGemPath(type, level);
    };
    UI_Tre_Gem.prototype.setData = function (data) {
        this.gemData = data;
        if (data == null) {
            this.setGemStatus(DataType_GemType.Null);
            this.gemNum.text = "";
        }
        else {
            this.setGemStatus(data.gemType, data.gemLevel);
            var n = data.gemCounts;
            this.gemNum.text = n > 1 ? "x" + n : "";
        }
    };
    UI_Tre_Gem.prototype.getData = function () {
        return this.gemData;
    };
    UI_Tre_Gem.prototype.setListener = function (listener, self) {
        this.listener = { callback: listener, callbackThis: self };
    };
    UI_Tre_Gem.prototype.removeListener = function (listener) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    };
    UI_Tre_Gem.prototype.clickHandler = function () {
        if (this.gemData == null || this.gemData.gemType == DataType_GemType.Null) {
            return;
        }
        this.listener.callback.call(this.listener.callbackThis, this);
    };
    return UI_Tre_Gem;
}(BaseComponent));
__reflect(UI_Tre_Gem.prototype, "UI_Tre_Gem");
//# sourceMappingURL=UI_Tre_Gem.js.map