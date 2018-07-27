class UI_Home_FooterSkill extends BaseComponent {
    // DataType_SkillType { Auts, Cris, Spes, Cdms, Aoes, Smzms };
    private data: Data_Skill;
    private skillIcon: eui.Image;
    private skillMask: eui.Image;
    private skillTime: eui.Label;
    private skillLock: eui.Image;
    private shape: egret.Shape;
    private isClicked: boolean;
    public constructor() {
        super();
        this.shape = new egret.Shape();
        this.shape.x = 24;
        this.shape.y = 24;
        this.isClicked = false;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_FooterSkillSkin.exml";
    }

    protected onCreate() {
        this.addChild(this.shape);
        this.skillMask.mask = this.shape;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkill, this)
    }

    protected onDestroy() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSkill, this)
    }

    public setData(data: Data_Skill) {
        this.skillIcon.source = this.getIconPath(data.index);
        data.addDataListener(this.refreshSkill, this, Data_Skill.Refresh_SkillStatus);
    }


    private refreshSkill(e: DataEvent) {
        let data: Data_Skill = e.data;
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
        let angle = 0;
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

    }



    private clickSkill() {
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
                const dialog = new UI_Home_FooterSkillDialog(this.data);
                dialog.show();
                break;
            case DataType_SkillStatus.Lock:

                break;
        }
        this.isClicked = false;
    }

    private getIconPath(index: number) {
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
    }


    private changeGraphics(angle: number, anticlockwise: boolean): void {
        const radius = 34;
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xFFFFFF, 1);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(0, -radius);
        this.shape.graphics.drawArc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + angle * Math.PI / 180, anticlockwise);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    }
}