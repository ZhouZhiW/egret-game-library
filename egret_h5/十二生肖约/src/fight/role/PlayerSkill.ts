class PlayerSkill {
    private data: Data_Skill;
    private currentStatus: number;
    private skillTimeCount: number;
    constructor(data: Data_Skill) {
        this.currentStatus = -1;
        this.skillTimeCount = 0;
        data.addDataListener(this.refreshSkill, this, Data_Skill.Refresh_SkillStatus);
    }
    private refreshSkill(e: DataEvent) {
        const newData: Data_Skill = e.data;
        if (this.currentStatus == newData.gameStatus) {
            return;
        }
        this.data = newData;
        this.currentStatus = newData.gameStatus;
        switch (this.currentStatus) {
            case DataType_SkillStatus.InUse:
                this.eventSkill(true);
                break;
            case DataType_SkillStatus.Cool:
                this.eventSkill(false);
                break;
        }
    }

    private eventSkill(isRelease: boolean) { //isRelease 释放和冷却
        FightLayer.inst.roleLayer.onSkill(isRelease, this.data);
        this.skillTimeCount = 0;
    }


    public timeChange() {
        if (this.data == null || this.skillTimeCount < 0) {
            return;
        }
        if (this.data.gameMaxTime > this.skillTimeCount) {
            this.data.setGameTime(this.data.gameMaxTime - this.skillTimeCount);
            this.skillTimeCount++;
        } else if (this.data.gameStatus == DataType_SkillStatus.InUse) {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 2);
            this.skillTimeCount = -1;
        } else if (this.data.gameStatus == DataType_SkillStatus.Cool) {
            NetEventManager.inst.pushReleaseSkill(this.data.index, 3);
            this.skillTimeCount = -1;
        }

    }

}