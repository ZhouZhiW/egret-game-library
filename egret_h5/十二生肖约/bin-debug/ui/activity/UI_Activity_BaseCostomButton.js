var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Activity_BaseCostomButton = (function (_super) {
    __extends(UI_Activity_BaseCostomButton, _super);
    function UI_Activity_BaseCostomButton() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ui/activity/UI_Activity_BaseCostomButtonSkin.exml";
        return _this;
    }
    UI_Activity_BaseCostomButton.prototype.onCreate = function () {
    };
    UI_Activity_BaseCostomButton.prototype.onDestroy = function () {
    };
    UI_Activity_BaseCostomButton.prototype.setTextSize = function (size) {
        this.btnText.size = size;
    };
    UI_Activity_BaseCostomButton.prototype.setText = function (text) {
        this.btnText.text = text;
    };
    return UI_Activity_BaseCostomButton;
}(eui.Button));
__reflect(UI_Activity_BaseCostomButton.prototype, "UI_Activity_BaseCostomButton");
//# sourceMappingURL=UI_Activity_BaseCostomButton.js.map