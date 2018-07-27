var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Gem_Groove = (function (_super) {
    __extends(UI_Gem_Groove, _super);
    function UI_Gem_Groove() {
        var _this = _super.call(this) || this;
        _this.GemName_Null = "已解锁";
        _this.GemName_UnLock = "可解锁";
        _this.GemName_Lock = "未解锁";
        return _this;
    }
    UI_Gem_Groove.prototype.onCreate = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    UI_Gem_Groove.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.listener = null;
    };
    UI_Gem_Groove.prototype.setMaterialData = function (data) {
        this.gemData = data;
        if (data == null) {
            this.gem.setMaterialData(null);
            this.setLable(this.GemName_Null);
        }
        else {
            this.gem.setMaterialData(data);
            switch (data.getGemType()) {
                case DataType_GemType.Null:
                    this.setLable(this.GemName_Null);
                    return;
                case DataType_GemType.UnLock:
                    this.setLable(this.GemName_UnLock, 0x029536);
                    return;
                case DataType_GemType.Lock:
                    this.setLable(this.GemName_Lock, 0xFB0C0C);
                    return;
            }
            this.setLable(this.gemData.getName());
        }
    };
    UI_Gem_Groove.prototype.setLable = function (tx, color) {
        if (color === void 0) { color = 0x712F19; }
        this.gemGrooveTx.text = tx;
        this.gemGrooveTx.textColor = color;
    };
    UI_Gem_Groove.prototype.checkSelect = function (x, y) {
        if (this.gemData == null || this.gemData.getType() == DataType_Material.Null
            || this.gemData.getType() == DataType_GemType.UnLock || this.gemData.getType() == DataType_Material.Lock) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    };
    UI_Gem_Groove.prototype.checkEquip = function (x, y) {
        if (this.gemData == null || this.gemData.getType() == DataType_GemType.UnLock || this.gemData.getType() == DataType_Material.Lock) {
            return false;
        }
        return this.hitTestPoint(x, y, false);
    };
    UI_Gem_Groove.prototype.getMaterialData = function () {
        return this.gemData;
    };
    UI_Gem_Groove.prototype.clickHandler = function () {
        if (this.gemData == null || this.gemData.getType() == DataType_Material.Null) {
            return;
        }
        this.listener.callback.call(this.listener.callbackThis, this);
    };
    UI_Gem_Groove.prototype.setListener = function (listener, self) {
        this.listener = { callback: listener, callbackThis: self };
    };
    UI_Gem_Groove.prototype.removeListener = function (listener) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    UI_Gem_Groove.prototype.setGroupID = function (id) {
        this.groupID = id;
    };
    UI_Gem_Groove.prototype.getGroupID = function () {
        return this.groupID;
    };
    UI_Gem_Groove.prototype.getType = function () {
        if (this.gemData == null) {
            return DataType_GemType.Null;
        }
        else {
            return this.gemData.getGemType();
        }
    };
    return UI_Gem_Groove;
}(BaseComponent));
__reflect(UI_Gem_Groove.prototype, "UI_Gem_Groove");
//# sourceMappingURL=UI_Gem_Groove.js.map