class Data_HeroTowerRole {
    private data: any;
    private skills: Array<Data_HeroTowerRoleSkills>;
    constructor(data: any) {
        this.skills = [];
        this.data = data
        if (this.data == null) {
            console.error("Data_HeroTowerRole setServiceData is null!")
            return;
        }
        for (let i = 0; i < this.data.skills.length; i++) {
            this.skills.push(new Data_HeroTowerRoleSkills(this.data.skills[i]));
        }
    }
    public get isPlayer(): boolean {
        return this.data.type == 0;
    }

    public get type(): number {// 主角类型 Datas_StarType
        return this.data.index;
    }

    public get star(): number {//星座属性
        return this.data.star;
    }

    public get sex(): number {//主角性别
        return this.data.sex;
    }

    public get level(): number {//当前等级
        return this.data.level;
    }
    public get DPS(): number {//DPS
        return this.data.dps;
    }
    public get DPSProportion(): number {//DPS占比
        return this.data.dpsPercent == null ? 0 : this.data.dpsPercent
    }

    public get upgradedType(): number {// 升级类型 Datas_UpgradedType 
        return this.data.skillType;
    }

    public get upgradedMoney(): number {//升级金钱
        return this.data.upCash;
    }

    public get upgradeDiamond(): number {//升级钻石
        return this.data.upDiamond;
    }


    public get skillData(): Array<Data_HeroTowerRoleSkills> {
        return this.skills;
    }
}