var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_UP_SkillDialog = (function (_super) {
    __extends(UI_UP_SkillDialog, _super);
    function UI_UP_SkillDialog() {
        return _super.call(this) || this;
    }
    UI_UP_SkillDialog.prototype.onCreate = function () {
    };
    UI_UP_SkillDialog.prototype.onDestroy = function () {
    };
    Object.defineProperty(UI_UP_SkillDialog.prototype, "style", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_UP_SkillDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/upgrade/UI_Up_SkillDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_UP_SkillDialog.prototype.setInfo = function (path, type, value) {
        this.sginSkillDialogIcon.source = path;
        this.sginSkillDialogName.text = UI_SkillInfo.getShowSkillName(type);
        this.sginSkillDialogText.text = UI_SkillInfo.getShowSkillInfo(type, value);
    };
    return UI_UP_SkillDialog;
}(CustomDialog));
__reflect(UI_UP_SkillDialog.prototype, "UI_UP_SkillDialog");
//# sourceMappingURL=UI_UP_SkillDialog.js.map