var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UI_Home_FooterSkill = (function (_super) {
    __extends(UI_Home_FooterSkill, _super);
    function UI_Home_FooterSkill() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.shape.x = 24;
        _this.shape.y = 24;
        _this.isClicked = false;
        return _this;
    }
    Object.defineProperty(UI_Home_FooterSkill.prototype, "skinPath", {
        get: function () {
            return "resource/skins/ui/home/UI_Home_FooterSkillSkin.exml";
        },
        enumerable: true,
        configurable: true
    });
    UI_Home_FooterSkill.prototype.onCreate = function () {
        this.addChild(this.shape);
        this.skillMask.mask = this.shape;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkill, this);
    };
    UI_Home_FooterSkill.prototype.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkill, this);
    };
    UI_Home_FooterSkill.prototype.setData = function (data) {
        this.skillIcon.source = this.getIconPath(data.index);
        data.addDataListener(this.refreshSkill, this, Data_Skill.Refresh_SkillStatus);
    };
    UI_Home_FooterSkill.prototype.refreshSkill = function (e) {
        var data = e.data;
        this.data = data;
        if (data.index == DataType_PlayerSkillType.Aoes && data.gameStatus == DataType_SkillStatus.InUse) {
            return;
        }
        this.isClicked = true;
        switch (data.gameStatus) {
            case DataType_SkillStatus.CanUse:
                this.skillMask.visible = false;
                this.skillTime.visible = false;
                this.skillLock.visible = false;
                break;
            case DataType_SkillStatus.InUse:
                this.skillMask.visible = true;
                this.skillTime.visible = true;
                this.skillTime.textColor = 0x2CA117;
                this.skillLock.visible = false;
                break;
            case DataType_SkillStatus.Cool:
                this.skillMask.visible = true;
                this.skillTime.visible = true;
                this.skillTime.textColor = 0xBC2628;
                this.skillLock.visible = false;
                break;
            case DataType_SkillStatus.Lock:
                this.skillMask.visible = false;
                this.skillTime.visible = false;
                this.skillLock.visible = true;
                break;
        }
        // console.log("UI_Home_FooterSkill: " + data.index + " " + data.gameStatus + " " + data.gameTime + " " + data.gameMaxTime);
        this.skillTime.text = Utils.formatShortTime(data.gameTime / 10);
        var angle = 0;
        switch (data.gameStatus) {
            case DataType_SkillStatus.InUse:
                angle = 360 / data.gameSumTime * (data.gameSumTime - data.gameTime);
                this.changeGraphics(angle, false);
                break;
            case DataType_SkillStatus.Cool:
                angle = 360 / data.gameSumTime * (data.gameSumTime - data.gameTime);
                angle = (angle == 0 ? 1 : angle);
                this.changeGraphics(angle, true);
                break;
        }
    };
    UI_Home_FooterSkill.prototype.clickSkill = function () {
        if (!this.isClicked || this.data == null) {
            return;
        }
        switch (this.data.gameStatus) {
            case DataType_SkillStatus.CanUse:
                NetEventManager.inst.pushReleaseSkill(this.data.index, 1);
                break;
            case DataType_SkillStatus.InUse:
                break;
            case DataType_SkillStatus.Cool:
                var dialog = new UI_Home_FooterSkillDialog(this.data);
                dialog.show();
                break;
            case DataType_SkillStatus.Lock:
                break;
        }
        this.isClicked = false;
    };
    UI_Home_FooterSkill.prototype.getIconPath = function (index) {
        switch (index % 6) {
            case DataType_PlayerSkillType.Auts:
                return "resource/res/ui/skill/player_skill_icon_auts.png";
            case DataType_PlayerSkillType.Cris:
                return "resource/res/ui/skill/player_skill_icon_cris.png";
            case DataType_PlayerSkillType.Spes:
                return "resource/res/ui/skill/player_skill_icon_spes.png";
            case DataType_PlayerSkillType.Cdms:
                return "resource/res/ui/skill/player_skill_icon_cdms.png";
            case DataType_PlayerSkillType.Aoes:
                return "resource/res/ui/skill/player_skill_icon_aoes.png";
            case DataType_PlayerSkillType.Smzms:
                return "resource/res/ui/skill/player_skill_icon_smzms.png";
        }
    };
    UI_Home_FooterSkill.prototype.changeGraphics = function (angle, anticlockwise) {
        var radius = 34;
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xFFFFFF, 1);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(0, -radius);
        this.shape.graphics.drawArc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + angle * Math.PI / 180, anticlockwise);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    };
    return UI_Home_FooterSkill;
}(BaseComponent));
__reflect(UI_Home_FooterSkill.prototype, "UI_Home_FooterSkill");
//# sourceMappingURL=UI_Home_FooterSkill.js.map