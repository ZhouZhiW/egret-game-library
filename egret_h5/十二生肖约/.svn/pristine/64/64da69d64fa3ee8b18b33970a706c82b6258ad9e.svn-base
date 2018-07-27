class Data_SkillPancel extends BaseData {
     
    private _skills: Array<Data_Skill>;
    constructor() {
        super();
        this._skills = [];
        for (let i = 0; i < 7; i++) {
            const skill = new Data_Skill(i);
            this._skills.push(skill);
        }
    }



    public setServiceData(data: any) {
        this.data = data;
        if (this.data == null) {
            console.error("Data_Skills setServiceData is null!")
            return;
        }
        if (this.data.masterSkills == null) {
            console.log("Data_SkillPancel masterSkills is null! ");
            return;
        }
        const n = this.data.masterSkills.length;
        for (let i = 0; i < n; i++) {
            const index = this.data.masterSkills[i].index;
            this.getSkillData(index).setData(this.data.masterSkills[i]);
        }

        // this.callListener(BaseData.DATA_SOURCE_SERVICE);
    }

    private getSkillData(index: number): Data_Skill {
        for (let i = 0; i < this._skills.length; i++) {
            if (this.skills[i].index == index) {
                return this.skills[i];
            }
        }
        return null;
    }

    public get skills(): Array<Data_Skill> {
        return this._skills;
    }
}