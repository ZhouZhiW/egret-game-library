class UI_Up_ItemSkillButton extends BaseComponent {
    private upItemSkillIcon: eui.Image;
    public upItemSkillLock: eui.Group;
    public upItemSkillLockLevel: eui.Label;

    private _skillID: number;

    public constructor() {
        super();
    }

    protected onCreate() {
    }

    protected onDestroy() {
    }

    protected get skinPath(): String {
        return "resource/skins/ui/upgrade/UI_Up_ItemSkillButtonSkin.exml";
    }


    public setData(skillID: number, type: number, status: number, lockLevel: number) {
        this._skillID = skillID;
        if (status == DataType_SkillStatus.Lock) {
            this.upItemSkillLock.visible = true;
            this.upItemSkillLockLevel.text = lockLevel != 0 ? "Lv." + lockLevel : "";
        } else {
            this.upItemSkillLock.visible = false;
        }
        this.upItemSkillIcon.source = UI_SkillInfo.getIconPath(type);
    }

    public get skillID(): number {
        return this._skillID;
    }

    public get iconResource(): string {
        return <string>this.upItemSkillIcon.source;
    }


}