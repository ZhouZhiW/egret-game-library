// 技能相关升级信息
class Data_UpgradeRoleSkill {
    private data: any;
    constructor(data: any) {
        this.data = data;
        if (this.data == null) {
             console.error("Data_UpgradeRoleSkill setServiceData is null!")
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


