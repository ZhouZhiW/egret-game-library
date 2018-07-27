class UI_UP_SkillDialog extends CustomDialog {
    public sginSkillDialogIcon: eui.Image;
    public sginSkillDialogName: eui.Label;
    public sginSkillDialogText: eui.Label;

    public constructor() {
        super();
    }

    public onCreate() {
    }

    public onDestroy() {
    }

    protected get style(): number {
        return 0;
    }

    protected get skinPath(): String {
        return "resource/skins/ui/upgrade/UI_Up_SkillDialogSkin.exml";
    }
    public setInfo(path: string, type: number, value: number) {
        this.sginSkillDialogIcon.source = path;
        this.sginSkillDialogName.text = UI_SkillInfo.getShowSkillName(type);
        this.sginSkillDialogText.text = UI_SkillInfo.getShowSkillInfo(type, value);
    }




}