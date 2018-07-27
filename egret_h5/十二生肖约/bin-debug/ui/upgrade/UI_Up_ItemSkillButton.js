var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Up_ItemSkillButton = (function (_super) {
    __extends(UI_Up_ItemSkillButton, _super);
    function UI_Up_ItemSkillButton() {
        return _super.call(this) || this;
    }
    UI_Up_ItemSkillButton.prototype.onCreate = function () {
    };
    UI_Up_ItemSkillButton.prototype.onDestroy = function () {
    };
    Object.defineProperty(UI_Up_ItemSkillButton.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/upgrade/UI_Up_ItemSkillButtonSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Up_ItemSkillButton.prototype.setData = function (skillID, type, status, lockLevel) {
        this._skillID = skillID;
        if (status == DataType_SkillStatus.Lock) {
            this.upItemSkillLock.visible = true;
            this.upItemSkillLockLevel.text = lockLevel != 0 ? "Lv." + lockLevel : "";
        }
        else {
            this.upItemSkillLock.visible = false;
        }
        this.upItemSkillIcon.source = UI_SkillInfo.getIconPath(type);
    };
    Object.defineProperty(UI_Up_ItemSkillButton.prototype, "skillID", {
        get: function () {
            return this._skillID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UI_Up_ItemSkillButton.prototype, "iconResource", {
        get: function () {
            return this.upItemSkillIcon.source;
        },
        enumerable: true,
        configurable: true
    });
    return UI_Up_ItemSkillButton;
}(BaseComponent));
__reflect(UI_Up_ItemSkillButton.prototype, "UI_Up_ItemSkillButton");
//# sourceMappingURL=UI_Up_ItemSkillButton.js.map