class UI_Home_FooterSkillPanel extends BaseComponent {
    private skillsGroup: eui.Group;

    public constructor() {
        super();
    }

    protected get skinPath(): String {
        return "resource/skins/ui/home/UI_Home_FooterSkillPanelSkin.exml";
    }

    protected onCreate() {
        DataManager.inst.playerSkills.addDataListener(this.refreshSkillPanel, this);
    }

    protected onDestroy() {

    }

    private refreshSkillPanel(e: DataEvent) {
        let data: Data_SkillPancel = e.data;
        for (let i = 0; i < this.skillsGroup.numChildren; i++) {
            if (i > data.skills.length - 1) {
                break;
            }
            const d: UI_Home_FooterSkill = <UI_Home_FooterSkill>this.skillsGroup.getChildAt(i);
            d.setData(data.skills[i]);
        }
    }
}