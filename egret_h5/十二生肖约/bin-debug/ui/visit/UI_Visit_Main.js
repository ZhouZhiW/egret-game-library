var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Visit_Main = (function (_super) {
    __extends(UI_Visit_Main, _super);
    function UI_Visit_Main(playerID) {
        return _super.call(this) || this;
    }
    UI_Visit_Main.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    UI_Visit_Main.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    return UI_Visit_Main;
}(BaseLayer));
__reflect(UI_Visit_Main.prototype, "UI_Visit_Main");
//# sourceMappingURL=UI_Visit_Main.js.map