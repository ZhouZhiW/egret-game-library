class UI_Home_FooterSkillDialog extends CustomDialog {
    public skillIcon: eui.Image;
    public skillName: eui.Label;
    public skillText: eui.Label;
    private data: Data_Skill;
    private btnLabel: string;
    public constructor(data: Data_Skill) {
        super(true);
        if (data != null) {
            this.data = data;
            this.skillIcon.source = UI_SkillInfo.getPlayerSkillIcon(data.index);
            this.skillName.text = UI_SkillInfo.getPlayerSkillName(data.index);
            this.skillText.text = UI_SkillInfo.getPlayerSkillInfo(data.index);
            this.addIconButton("立即释放", data.diomand, 0, true, this.clickBtn,this);
        }
    }

    public onCreate() {
    }

    public onDestroy() {

    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_FooterSkillDialogSkin.exml";
    }

    private clickBtn(d: CustomDialog) {
        if (this.data.diomand > DataManager.inst.asset.diamond) {
            new PayDialog().setTipDiamond(this.data.diomand).show();
        } else {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 1);
        }

        this.close();
    }

    protected get style(): number {
        return 0;
    }
}