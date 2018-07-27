var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Mission_Groove = (function (_super) {
    __extends(UI_Mission_Groove, _super);
    function UI_Mission_Groove() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Mission_Groove.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/mission/UI_Mission_GrooveSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    return UI_Mission_Groove;
}(BaseComponent));
__reflect(UI_Mission_Groove.prototype, "UI_Mission_Groove");
//# sourceMappingURL=UI_Mission_Groove.js.map