var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_FooterSkillPanel = (function (_super) {
    __extends(UI_Home_FooterSkillPanel, _super);
    function UI_Home_FooterSkillPanel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UI_Home_FooterSkillPanel.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_FooterSkillPanelSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_FooterSkillPanel.prototype.onCreate = function () {
        DataManager.inst.playerSkills.addDataListener(this.refreshSkillPanel, this);
    };
    UI_Home_FooterSkillPanel.prototype.onDestroy = function () {
    };
    UI_Home_FooterSkillPanel.prototype.refreshSkillPanel = function (e) {
        var data = e.data;
        for (var i = 0; i < this.skillsGroup.numChildren; i++) {
            if (i > data.skills.length - 1) {
                break;
            }
            var d = this.skillsGroup.getChildAt(i);
            d.setData(data.skills[i]);
        }
    };
    return UI_Home_FooterSkillPanel;
}(BaseComponent));
__reflect(UI_Home_FooterSkillPanel.prototype, "UI_Home_FooterSkillPanel");
//# sourceMappingURL=UI_Home_FooterSkillPanel.js.map