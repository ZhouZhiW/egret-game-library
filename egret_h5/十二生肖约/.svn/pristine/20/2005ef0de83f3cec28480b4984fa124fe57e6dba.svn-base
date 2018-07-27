var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        if (_this.skinPath != null) {
            _this.skinName = _this.skinPath;
        }
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onCreate, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.onDestroy, _this);
        return _this;
    }
    Object.defineProperty(BaseComponent.prototype, "skinPath", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.onCreate = function () {
    };
    BaseComponent.prototype.onDestroy = function () {
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
//# sourceMappingURL=BaseComponent.js.map