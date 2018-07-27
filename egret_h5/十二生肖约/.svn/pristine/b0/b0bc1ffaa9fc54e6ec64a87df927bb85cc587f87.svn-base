class Data_HeroTowerRoleSkills {
    private data: any;
    constructor(data: any) {
        if (this.data == null) {
            return;
        }
    }
    public get type(): number {// 技能类型 Datas_PlayerSkillType
        return this.data.index;
    }

    public get status(): number {// 技能状态 Datas_SkillStatus
        return this.data.open;
    }
    public get value(): number {// 技能数值 
        return this.data.encrease;
    }

    public get lockLevel(): number { //解锁等级
        return this.data.openLevel;
    }
}