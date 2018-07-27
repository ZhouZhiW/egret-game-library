var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_TouchGem = (function (_super) {
    __extends(UI_Gem_TouchGem, _super);
    function UI_Gem_TouchGem() {
        var _this = _super.call(this) || this;
        _this._dataGem = null;
        _this.visible = false;
        return _this;
    }
    UI_Gem_TouchGem.prototype.destroy = function () {
        this._dataGem = null;
    };
    UI_Gem_TouchGem.prototype.getDataGem = function () {
        return this._dataGem;
    };
    UI_Gem_TouchGem.prototype.setGemStatus = function (type, level) {
        if (level === void 0) { level = 0; }
        this.source = UI_Tre_GemConfig.getGemPath(type, level);
    };
    UI_Gem_TouchGem.prototype.setDataGem = function (data) {
        this._dataGem = data;
        if (this._dataGem == null) {
            this.setGemStatus(DataType_GemType.Null);
            this.visible = false;
        }
        else {
            this.setGemStatus(data.getMaterialData().getGemType(), data.getMaterialData().getGemLevel());
        }
    };
    UI_Gem_TouchGem.prototype.setPoint = function (targetPoint) {
        if (this._dataGem == null) {
            return;
        }
        if (!this.visible) {
            this.visible = true;
        }
        this.x = targetPoint.x - (this.width >> 1);
        this.y = targetPoint.y - (this.height >> 1);
    };
    return UI_Gem_TouchGem;
}(eui.Image));
__reflect(UI_Gem_TouchGem.prototype, "UI_Gem_TouchGem");
//# sourceMappingURL=UI_Gem_TouchGem.js.map