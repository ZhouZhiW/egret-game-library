var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_FooterSkillDialog = (function (_super) {
    __extends(UI_Home_FooterSkillDialog, _super);
    function UI_Home_FooterSkillDialog(data) {
        var _this = _super.call(this, true) || this;
        if (data != null) {
            _this.data = data;
            _this.skillIcon.source = UI_SkillInfo.getPlayerSkillIcon(data.index);
            _this.skillName.text = UI_SkillInfo.getPlayerSkillName(data.index);
            _this.skillText.text = UI_SkillInfo.getPlayerSkillInfo(data.index);
            _this.addIconButton("立即释放", data.diomand, 0, true, _this.clickBtn, _this);
        }
        return _this;
    }
    UI_Home_FooterSkillDialog.prototype.onCreate = function () {
    };
    UI_Home_FooterSkillDialog.prototype.onDestroy = function () {
    };
    Object.defineProperty(UI_Home_FooterSkillDialog.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_FooterSkillDialogSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_FooterSkillDialog.prototype.clickBtn = function (d) {
        if (this.data.diomand > DataManager.inst.asset.diamond) {
            new PayDialog().setTipDiamond(this.data.diomand).show();
        }
        else {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 1);
        }
        this.close();
    };
    Object.defineProperty(UI_Home_FooterSkillDialog.prototype, "style", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return UI_Home_FooterSkillDialog;
}(CustomDialog));
__reflect(UI_Home_FooterSkillDialog.prototype, "UI_Home_FooterSkillDialog");
//# sourceMappingURL=UI_Home_FooterSkillDialog.js.map